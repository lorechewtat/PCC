import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Divider } from '@mui/material';
import {useState } from 'react';
import PlaceIcon from '@mui/icons-material/PlaceOutlined';
import DirectionsBusFilledOutlinedIcon from '@mui/icons-material/DirectionsBusFilledOutlined';

const DatosTraslado = () => {
    const [form, setForm] = useState({
        lugar: null as string | null,
        otroLugar: "",   
        numAmbulancia: "",       
        operador: "",
        tum: "",
        socorrista: "",
        helicoptero: ""
    });

    // setter genérico
    const setField = <K extends keyof typeof form>(key: K) =>
    (value: typeof form[K]) => setForm(prev => ({ ...prev, [key]: value }));

    return (
    <Box>
        <Divider sx={{ my: 5}}/>

        <Box display="flex" alignItems="center" mb={2}>
            {/* Sección de selección de lugar */}
            <Typography variant="h6" color="primary">
            LUGAR DE OCURRENCIA
            </Typography>
            <PlaceIcon sx={{ mr: 1, color: 'primary.main' }} />
        </Box>
        

        <Box width={"850px"}>
        <ToggleButtonGroup
          value={form.lugar}
          exclusive
          onChange={(_, v) => setForm(prev => ({
            ...prev,
            lugar: v,
            otroLugar: v ? "" : prev.otroLugar, //si selecciona un lugar, se borra el campo "OTRO"
          }))}
          sx={{ display: 'grid', gridTemplateColumns: "repeat(3, 1fr)" ,gap: 1, mb: 2, 
            "& .MuiToggleButton-root": {
                borderRadius: 2,      // fuerza esquinas redondeadas
                border: "1px solid #ccc !important", // evita que se fusionen
            }
          }}
        >
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", padding: "30px 0",
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
          }
          }} value="Transporte Publico">Transporte Publico</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
          }
          }} value="Escuela">Escuela</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
          }
          }} value="Trabajo">Trabajo</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", padding: "30px 0",
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
          }
          }} value="Hogar">Hogar</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
            }
          }} value="Recreación y deporte">Recreación y deporte</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
            }
          }} value="Vía publica">Vía publica</ToggleButton>
        </ToggleButtonGroup>
        <Typography
            variant="h5"
            gutterBottom
            sx={{ 
                paddingBottom:1,
                fontWeight:"regular",
                fontSize : 14,
                color: 'primary.main' }}
              >ESCRIBE OTRO LUGAR:
              </Typography>
        <TextField
          label="OTRO"
          variant="standard"
          fullWidth
          value={form.otroLugar}
          onChange={(e) => {
            const value = e.target.value;
            setForm(prev => ({
              ...prev,
              otroLugar: value,
              lugar: value ? null : prev.lugar, //si el usuario escribe algo, se borra el lugar
            }));
          }}
        />
        </Box>

        <Divider sx={{ my: 5}}/>

        <Box display="flex" alignItems="center" mb={2}>
            {/* Sección de datos de traslado */}
            <Typography variant="h6" color="primary">
                DATOS DE TRASLADO
            </Typography>
            <DirectionsBusFilledOutlinedIcon sx={{ mr: 1, color: 'primary.main' }}/>
        </Box>
        
      <Box
        display="flex"
        flexDirection="column"
        width={"850px"}
        gap={2}
        mb={2}
        sx={{ border: 2, borderColor: 'primary.main', borderRadius: 2, p: 2 }}
      >
        <TextField
          label="NÚMERO DE AMBULANCIA"
          variant="standard"
          value={form.numAmbulancia}
          fullWidth
          onChange={e => setField('numAmbulancia')(e.target.value)}
        />
        <TextField
          label="OPERADOR"
          variant="standard"
          value={form.operador}
          fullWidth
          onChange={e => setField('operador')(e.target.value)}
        />
        <TextField
          label="T.U.M"
          variant="standard"
          value={form.tum}
          fullWidth
          onChange={e => setField('tum')(e.target.value)}
        />
        <TextField
          label="SOCORRISTA"
          variant="standard"
          value={form.socorrista}
          fullWidth
          onChange={e => setField('socorrista')(e.target.value)}
        />
        <TextField
          label="MATRICULA DE HELICOPTERO"
          variant="standard"
          value={form.helicoptero}
          fullWidth
          onChange={e => setField('helicoptero')(e.target.value)}
        />
      </Box>

      <Divider sx={{ my: 5}}/>
    </Box>

  );

};

export default DatosTraslado;