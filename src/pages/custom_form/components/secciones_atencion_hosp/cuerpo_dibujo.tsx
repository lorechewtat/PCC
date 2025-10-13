import React, { useState, useRef } from 'react';
import logoHosp from './body.jpg'; // Ajusta la ruta si es necesario
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Divider, Stack } from '@mui/material';

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

const HeatmapBody = ({ width = 600, height = 800 }) => {
  interface Mark {
    x: number;
    y: number;
    radius: number;
    color: string;
    label: string;
  }

  const [marks, setMarks] = useState<Mark[]>([]);
  const [history, setHistory] = useState<Mark[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>('1');

  const containerRef = useRef<HTMLDivElement>(null);

  // Agrega una marca en la posición del mouse
  const addMarkAt = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const newMark: Mark = { x, y, radius: 20, color: 'rgba(255,0,0,0.5)', label: selectedLabel };
    const newMarks: Mark[] = marks.slice(0, historyIndex + 1).concat(newMark);
    setMarks(newMarks);
    setHistory(newMarks);
    setHistoryIndex(historyIndex + 1);
  };

  // Mouse/touch events
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDrawing(true);
    addMarkAt(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing) return;
    addMarkAt(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // Deshacer
  const undo = () => {
    if (historyIndex >= 0) {
      setHistoryIndex(historyIndex - 1);
      setMarks(history.slice(0, historyIndex));
    }
  };

  // Rehacer
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setMarks(history.slice(0, historyIndex + 2));
    }
  };

  // Limpiar todas las marcas
  const clearAll = () => {
    setMarks([]);
    setHistory([]);
    setHistoryIndex(-1);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '100%', overflow: 'auto', display: 'flex', flexDirection: 'row' }}>
      {/* Botones de selección y descripción al costado izquierdo */}
      <div style={{
        minWidth: '260px',
        marginRight: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'flex-end'
      }}>
        {labelsInfo.map((info, i) => (
          <div key={i + 1} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              onClick={() => setSelectedLabel(String(i + 1))}
              style={{
                padding: '8px 12px',
                backgroundColor: selectedLabel === String(i + 1) ? '#007bff' : '#eee',
                color: selectedLabel === String(i + 1) ? 'white' : '#333',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: selectedLabel === String(i + 1) ? 'bold' : 'normal',
                minWidth: '36px'
              }}
            >
              {i + 1}
            </button>
            <span style={{ fontSize: '15px', color: '#203972', fontWeight: selectedLabel === String(i + 1) ? 'bold' : 'normal', textAlign: 'right' }}>
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
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            position: 'relative',
            width: `${width}px`,
            height: `${height}px`,
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
          {marks.map((mark, i) => (
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
            disabled={historyIndex < 0}
            style={{
              padding: '10px 20px',
              backgroundColor: historyIndex < 0 ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: historyIndex < 0 ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            ◀ Antes (Deshacer)
          </button>
          
          <button 
            onClick={redo} 
            disabled={historyIndex >= history.length - 1}
            style={{
              padding: '10px 20px',
              backgroundColor: historyIndex >= history.length - 1 ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: historyIndex >= history.length - 1 ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            Después (Rehacer) ▶
          </button>
          
          <button 
            onClick={clearAll}
            disabled={marks.length === 0}
            style={{
              padding: '10px 20px',
              backgroundColor: marks.length === 0 ? '#ccc' : '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: marks.length === 0 ? 'not-allowed' : 'pointer',
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
          <p>Haz clic o arrastra en la imagen para marcar áreas. Usa los botones para deshacer/rehacer.</p>
          <p>Marcas realizadas: {marks.length}</p>
        </div>
      </div>
    </div>
  );
};

export default HeatmapBody;