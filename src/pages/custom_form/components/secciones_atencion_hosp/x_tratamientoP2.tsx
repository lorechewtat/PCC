import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Divider, Stack, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper} from '@mui/material';
import {useState } from 'react';
import { useNotify } from "react-admin";

const TratamientoP2 = () => {
    const commonBtnSx = {
        backgroundColor: '#8E8E8E',
        color: '#f3f3f3ff',
        '&.Mui-selected': { backgroundColor: 'primary.main', color: 'white', borderColor: 'primary.main' },
        '&:hover': { backgroundColor: '#8E8E8E', color: 'white', borderColor: '#8E8E8E', cursor: 'pointer' },
    }

    //const notify = useNotify();
    type FormState = {
  hora1: string;
  hora2: string;
  medicamento1: string;
  medicamento2: string;
  dosis1: string;
  dosis2: string;
  via_admin1: string;
  via_admin2: string;
  dr: string;
  controlHemo: string | null;
  viasYSolucion: string | null;
  atencion: string[];
  pertenecias: string;
};

const [form, setForm] = useState<FormState>({
  hora1: "",
  hora2: "",
  medicamento1: "",
  medicamento2: "",
  dosis1: "",
  dosis2: "",
  via_admin1: "",
  via_admin2: "",
  dr: "",
  controlHemo: null,
  viasYSolucion: null,
  atencion: [],
  pertenecias: ""
});

const filas = [
  { id: "fila1", hora: "hora1", medicamento: "medicamento1", dosis: "dosis1", via: "via_admin1" },
  { id: "fila2", hora: "hora2", medicamento: "medicamento2", dosis: "dosis2", via: "via_admin2" },
] as const;

    // setter genérico
    const setField = <K extends keyof FormState>(key: K) =>
  (value: FormState[K]) => setForm(prev => ({ ...prev, [key]: value }));

    return (
    <Box>

      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        mb={2}
        sx={{width: '100%', maxWidth: { xs: 320, sm: 500, md: 850 }, border: 2, borderColor: 'primary.main', borderRadius: 2, p: 2 }}
      >
        <Box sx={{mb: 4}}>
        <TableContainer component={Paper}
            sx={{
                width: '100%',
                overflowX: 'auto',           //habilita scroll horizontal en pantallas chicas
                borderRadius: 2,
                boxShadow: 'none',
            }}
        >
        <Table size="small" stickyHeader sx={{ mb: 2,
            minWidth: 640,            // fuerza “ancho mínimo” para que aparezca scroll si no cabe
            tableLayout: 'fixed',     // columnas más predecibles (evita “bailes”)
            '& th, & td': {
                whiteSpace: 'nowrap',   //evita que brinque a otra línea
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                px: { xs: 1, sm: 1.5 }, //padding más compacto en móvil
                fontSize: { xs: 12, sm: 13 },
            },
        }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">HORA</TableCell>
                <TableCell align="center">MEDICAMENTO</TableCell>
                <TableCell align="center">DOSIS</TableCell>
                <TableCell align="center">VÍA. ADMINISTRACIÓN</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filas.map((fila) => (
            <TableRow key={fila.id}>
                <TableCell align="center">
                    <TextField
                    type="time"
                    size="small"
                    variant="standard"
                    value={form[fila.hora]}
                    onChange={(e) => setField(fila.hora)(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    />
                </TableCell>

                <TableCell align="center">
                    <TextField
                    size="small"
                    variant="standard"
                    value={form[fila.medicamento]}
                    onChange={(e) => setField(fila.medicamento)(e.target.value)}
                    />
                </TableCell>

                <TableCell align="center">
                    <TextField
                    size="small"
                    variant="standard"
                    value={form[fila.dosis]}
                    onChange={(e) => setField(fila.dosis)(e.target.value)}
                    />
                </TableCell>

                <TableCell align="center">
                    <TextField
                    size="small"
                    variant="standard"
                    value={form[fila.via]}
                    onChange={(e) => setField(fila.via)(e.target.value)}
                    />
                </TableCell>
            </TableRow>
  ))}
        </TableBody>
        </Table>
        </TableContainer>
        
        <TextField
          label="DR. TRATANTE"
          variant="standard"
          fullWidth
          required
          value={form.dr}
          onChange={e => setField('dr')(e.target.value)}
        />
    </Box>
        
        <Typography variant="body1" sx={{color: "gray" }}>
            CONTROL DE HEMORRAGIAS
        </Typography>

        <ToggleButtonGroup
          value={form.controlHemo}
          exclusive
          onChange={(_, v) => setField('controlHemo')(v)}
          sx={{ display: 'grid', gridTemplateColumns: "repeat(3, 1fr)" ,gap: 1, mb: 2, 
            "& .MuiToggleButton-root": {
                borderRadius: 2,      // fuerza esquinas redondeadas
                border: "1px solid #ccc !important", // evita que se fusionen
                padding: "30px 0"
            }
          }}
        >
          <ToggleButton sx={commonBtnSx} value="Presion Directa">Presion Directa</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Presion Indirecta">Presion Indirecta</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Gravedad">Gravedad</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Vendaje Compresivo">Vendaje Compresivo</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Crioterapia">Crioterapia</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Mast">Mast</ToggleButton>
          
        </ToggleButtonGroup>

        <Typography variant="body1" sx={{color: "gray" }}>
            VÍAS VENOSAS Y TIPO DE SOLUCIÓN
        </Typography>

        <ToggleButtonGroup
          value={form.viasYSolucion}
          exclusive
          onChange={(_, v) => setField('viasYSolucion')(v)}
          sx={{mb: 1,
            display: 'flex',
            flexWrap: 'wrap',   
            gap: 1,                     
            justifyContent: 'center',   // opcional, para centrar el contenido
            "& .MuiToggleButton-root": {
            
            flex: { xs: '1 1 45%', sm: '1 1 30%', md: '1 1 18%' }, 
            minWidth: 120,            // evita botones demasiado pequeños
            }
           }}
        >
          <ToggleButton sx={commonBtnSx} value="Hartmann">Hartmann</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="NACL 0.9%">NACL 0.9%</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Mixta">Mixta</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Glucosa 5%">Glucosa 5%</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Otra">Otra</ToggleButton>
        </ToggleButtonGroup>

        <Typography variant="body1" sx={{ mb: 1, color: "gray" }}>
            ATENCIÓN BÁSICA
        </Typography>

        <ToggleButtonGroup
          value={form.atencion}
          onChange={(_, v: string[]) => setField('atencion')(v)}
          sx={{ display: 'grid', gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',     // teléfonos
                sm: 'repeat(2, 1fr)',     // tablets
                md: 'repeat(3, 1fr)',     // laptops
                lg: 'repeat(3, 1fr)',     // desktop grande (tu valor actual)
            }, 
            gap: 1, mb: 2, 
            "& .MuiToggleButton-root": {
                borderRadius: 2,      // fuerza esquinas redondeadas
                border: "1px solid #ccc !important", // evita que se fusionen
                padding: "30px 0"
            }
          }}
        >
          <ToggleButton sx={commonBtnSx} value="RCP Básica">RCP Básica</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Curación">Curación</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="inmovilización de extremidades">inmovilización de extremidades</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="RCP Avanzada">RCP Avanzada</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Empaquetamiento">Empaquetamiento</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Vendaje">Vendaje</ToggleButton>
        </ToggleButtonGroup>
        <TextField
                label="PERTENENCIAS"
                variant="standard"
                required
                value={form.pertenecias}
                onChange={e => setField('pertenecias')(e.target.value)}
        />

      </Box>

      <Divider sx={{ my: 5}}/>
    </Box>

  );

};

export default TratamientoP2;