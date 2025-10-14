import React, { useRef } from 'react';
import logoHosp from './body.jpg';

interface Mark {
  x: number;
  y: number;
  radius: number;
  color: string;
  label: string;
}

export type CuerpoDibujo = {
  marks: Mark[];
  history: Mark[];
  historyIndex: number;
  selectedLabel: string;
};

type Props = {
  value: CuerpoDibujo;
  onChange: (patch: Partial<CuerpoDibujo>) => void;
  width?: number;
  height?: number;
};

const labelsInfo = [
  "DEFORMIDADES",
  "CONTUSIONES", 
  "ABRASIONES",
  "PENETRACIONES",
  "MOVIMIENTO PARADÓJICO",
  "CREPITACIONES",
  "HERIDAS",
  "FRACTURAS",
  "ENFISEMA SUBCUTANEO",
  "QUEMADURAS",
  "LACERACIONES",
  "EDEMA",
  "ALTERACIÓN DE SENSIBILIDAD",
  "ALTERACIÓN DE MOVILIDAD",
  "DOLOR"
];

const HeatmapBody = ({ value, onChange, width = 600, height = 800 }: Props) => {

  const isMobile = window.innerWidth <= 768;
  const containerRef = useRef<HTMLDivElement>(null);

  // Agrega una marca en la posición del mouse
  const addMarkAt = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const newMark: Mark = { 
      x, 
      y, 
      radius: 20, 
      color: 'rgba(255,0,0,0.5)', 
      label: value.selectedLabel 
    };
    const newMarks: Mark[] = value.marks.slice(0, value.historyIndex + 1).concat(newMark);
    
    onChange({
      marks: newMarks,
      history: newMarks,
      historyIndex: value.historyIndex + 1
    });
  };

  // Mouse/touch events
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    addMarkAt(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only add marks on click, not drag for better UX
    // If you want drag functionality, you'd need to track isDrawing state
  };

  // Deshacer
  const undo = () => {
    if (value.historyIndex >= 0) {
      onChange({
        historyIndex: value.historyIndex - 1,
        marks: value.history.slice(0, value.historyIndex)
      });
    }
  };

  // Rehacer
  const redo = () => {
    if (value.historyIndex < value.history.length - 1) {
      onChange({
        historyIndex: value.historyIndex + 1,
        marks: value.history.slice(0, value.historyIndex + 2)
      });
    }
  };

  // Limpiar todas las marcas
  const clearAll = () => {
    onChange({
      marks: [],
      history: [],
      historyIndex: -1
    });
  };

  // Handle label selection
  const handleLabelSelect = (label: string) => {
    onChange({ selectedLabel: label });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '90vw', overflow: 'auto', display: 'flex', flexDirection: isMobile ? 'column':'row', gap: isMobile ? '20px':0}}>
      {/* Botones de selección y descripción al costado izquierdo */}
      <div style={{
        minWidth: '260px',
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, minmax(150px, 1fr))' : 'repeat(1, minmax(150px, 1fr))',
        gap: '10px',
        justifyItems: 'start',
      }}>
        {labelsInfo.map((info, i) => (
          <div key={i + 1} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              onClick={() => handleLabelSelect(String(i + 1))}
              style={{
                padding: '8px 12px',
                backgroundColor: value.selectedLabel === String(i + 1) ? '#007bff' : '#eee',
                color: value.selectedLabel === String(i + 1) ? 'white' : '#333',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: value.selectedLabel === String(i + 1) ? 'bold' : 'normal',
                minWidth: '36px'
              }}
            >
              {i + 1}
            </button>
            <span style={{ 
              fontSize: isMobile ? '10px':'15px', 
              color: '#203972', 
              fontWeight: value.selectedLabel === String(i + 1) ? 'bold' : 'normal', 
              textAlign: isMobile ? 'left':'right' 
            }}>
              {info}
            </span>
          </div>
        ))}
      </div>

      {/* Imagen y marcas */}
      <div style={{ flex: 1 }}>
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          style={{
            position: 'relative',
            width: isMobile ? `80vw` : `50vw`,
       
            aspectRatio: isMobile ? '16 / 16' :'16 / 13', 
            backgroundImage: `url(${logoHosp})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            border: '2px solid #ddd',
            borderRadius: '8px',
            cursor: 'crosshair',
            userSelect: 'none',
            margin: '0 auto',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Dibujar los círculos y el número en el centro */}
          {value.marks.map((mark, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${mark.x - mark.radius}px`,
                top: `${mark.y - mark.radius}px`,
                width: `${mark.radius * 2}px`,
                height: `${mark.radius * 2}px`,
                borderRadius: '50%',
                backgroundColor: mark.color,
                pointerEvents: 'none',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '18px',
                color: '#fff',
                textShadow: '0 1px 2px #203972'
              }}
            >
              {mark.label}
            </div>
          ))}
        </div>

        {/* Botones de deshacer/rehacer/limpiar y leyenda */}
        <div style={{ 
          marginTop: '20px', 
          display: 'flex', 
          gap: '10px', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={undo} 
            disabled={value.historyIndex < 0}
            style={{
              padding: '10px 20px',
              backgroundColor: value.historyIndex < 0 ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: value.historyIndex < 0 ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            ◀ Antes (Deshacer)
          </button>
          
          <button 
            onClick={redo} 
            disabled={value.historyIndex >= value.history.length - 1}
            style={{
              padding: '10px 20px',
              backgroundColor: value.historyIndex >= value.history.length - 1 ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: value.historyIndex >= value.history.length - 1 ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            Después (Rehacer) ▶
          </button>
          
          <button 
            onClick={clearAll}
            disabled={value.marks.length === 0}
            style={{
              padding: '10px 20px',
              backgroundColor: value.marks.length === 0 ? '#ccc' : '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: value.marks.length === 0 ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            🗑️ Limpiar Todo
          </button>
        </div>

        <div style={{ 
          marginTop: '15px', 
          textAlign: 'center', 
          color: '#666',
          fontSize: '14px'
        }}>
          <p>Haz clic en la imagen para marcar áreas. Usa los botones para deshacer/rehacer.</p>
          <p>Marcas realizadas: {value.marks.length}</p>
        </div>
      </div>
    </div>
  );
};

export default HeatmapBody;