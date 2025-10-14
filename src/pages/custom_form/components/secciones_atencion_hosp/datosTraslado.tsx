import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Divider } from '@mui/material';
import { useState } from 'react';
import PlaceIcon from '@mui/icons-material/PlaceOutlined';
import DirectionsBusFilledOutlinedIcon from '@mui/icons-material/DirectionsBusFilledOutlined';

export type DatosLugarControl = {
  lugar: 'Transporte Publico' | 'Escuela' | 'Trabajo' | 'Hogar' | 'Recreación y deporte' | 'Vía publica' | null;
  otroLugar: string;
  numAmbulancia: string;
  operador: string;
  tum: string;
  socorrista: string;
  helicoptero: string;
};

type Props = {
  value: DatosLugarControl;
  onChange: (patch: Partial<DatosLugarControl>) => void;
};

const DatosTraslado = ({ value, onChange }: Props) => {

  const handleLugarControlChange =
    (field: keyof DatosLugarControl) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onChange({ [field]: value } as Partial<DatosLugarControl>);
      }

  return (
    <Box>
      <Divider sx={{ my: 5 }} />

      <Box display="flex" alignItems="center" mb={2}>
        {/* Sección de selección de lugar */}
        <Typography variant="h6" color="primary">
          LUGAR DE OCURRENCIA
        </Typography>
        <PlaceIcon sx={{ mr: 1, color: 'primary.main' }} />
      </Box>


        <Box sx={{ width: '100%', maxWidth: { xs: 310, sm: 500, md: 850 }, px: { xs: 1, sm: 2 } }}>
        <ToggleButtonGroup
          value={value.lugar}
          exclusive
          onChange={(_, val: 'Transporte Publico' | 'Escuela' | 'Trabajo' | 'Hogar' | 'Recreación y deporte' | 'Vía publica' | null) => {
            if (val === null) return;
            onChange({
              lugar: val,
              otroLugar: val ? "" : value.otroLugar // si selecciona un lugar, se borra el campo "OTRO"
            });
          }}
          sx={{
            display: 'grid', gridTemplateColumns: {xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)'},gap: 1, mb: 2, 
            "& .MuiToggleButton-root": {
                borderRadius: 2,      // fuerza esquinas redondeadas
                border: "1px solid #ccc !important", // evita que se fusionen
                padding: '30px 10px'
            }
          }}
        >
          <ToggleButton sx={{
            backgroundColor: "#8E8E8E", color: "#f3f3f3ff", padding: "30px 0",
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
          <ToggleButton sx={{
            backgroundColor: "#8E8E8E", color: "#f3f3f3ff",
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
          <ToggleButton sx={{
            backgroundColor: "#8E8E8E", color: "#f3f3f3ff",
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
          <ToggleButton sx={{
            backgroundColor: "#8E8E8E", color: "#f3f3f3ff", padding: "30px 0",
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
          <ToggleButton sx={{
            backgroundColor: "#8E8E8E", color: "#f3f3f3ff",
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
          <ToggleButton sx={{
            backgroundColor: "#8E8E8E", color: "#f3f3f3ff",
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
            paddingBottom: 1,
            fontWeight: "regular",
            fontSize: 14,
            color: 'primary.main'
          }}
        >ESCRIBE OTRO LUGAR:
        </Typography>
        <TextField
          label="OTRO"
          variant="standard"
          fullWidth
          value={value.otroLugar}
          onChange={(e) => {
            const val = e.target.value;
            onChange({
              otroLugar: val,
              lugar: val ? null : value.lugar, // si el usuario escribe algo, se borra el lugar
            });
          }}
        />
      </Box>

      <Divider sx={{ my: 5 }} />

      <Box display="flex" alignItems="center" mb={2}>
        {/* Sección de datos de traslado */}
        <Typography variant="h6" color="primary">
          CONTROL TRASLADO
        </Typography>
        <DirectionsBusFilledOutlinedIcon sx={{ mr: 1, color: 'primary.main' }} />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        mb={2}
        sx={{ width: '100%', maxWidth: { xs: 310, sm: 500, md: 850 }, border: 2, borderColor: 'primary.main', borderRadius: 2, p: 2 }}
      >
        <TextField
          label="NÚMERO DE AMBULANCIA"
          variant="standard"
          value={value.numAmbulancia}
          fullWidth
          onChange={handleLugarControlChange('numAmbulancia')}
        />
        <TextField
          label="OPERADOR"
          variant="standard"
          value={value.operador}
          fullWidth
          onChange={handleLugarControlChange('operador')}
        />
        <TextField
          label="T.U.M"
          variant="standard"
          value={value.tum}
          fullWidth
          onChange={handleLugarControlChange('tum')}
        />
        <TextField
          label="SOCORRISTA"
          variant="standard"
          value={value.socorrista}
          fullWidth
          onChange={handleLugarControlChange('socorrista')}
        />
        <TextField
          label="MATRICULA DE HELICOPTERO"
          variant="standard"
          value={value.helicoptero}
          fullWidth
          onChange={handleLugarControlChange('helicoptero')}
        />
      </Box>

      <Divider sx={{ my: 5 }} />
    </Box>

  );

};

export default DatosTraslado;