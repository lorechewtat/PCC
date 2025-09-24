import { Box, Button, TextField, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import {useState } from 'react';

const DatosTraslado = () => {
    const [lugar, setLugar] = useState<string | null>(null);

    return (
    <Box>
        {/* Sección de selección de lugar */}
        <Typography variant="subtitle1" gutterBottom>
          Lugar de ocurrencia:
        </Typography>
        <ToggleButtonGroup
          value={lugar}
          exclusive
          onChange={(_, value) => setLugar(value)}
          sx={{ display: 'grid', gridTemplateColumns: "repeat(3, 1fr)" ,gap: 1, mb: 2 }}
        >
          <ToggleButton sx={{border: "1px solid #a1a1a1ff", borderRadius: 2}} value="Transporte Publico">Transporte Publico</ToggleButton>
          <ToggleButton sx={{border: "1px solid #a1a1a1ff", borderRadius: 2}} value="Escuela">Escuela</ToggleButton>
          <ToggleButton sx={{border: "1px solid #a1a1a1ff", borderRadius: 2}} value="Trabajo">Trabajo</ToggleButton>
          <ToggleButton sx={{border: "1px solid #a1a1a1ff", borderRadius: 2}} value="Hogar">Hogar</ToggleButton>
          <ToggleButton sx={{border: "1px solid #a1a1a1ff", borderRadius: 2}} value="Recreación y deporte">Recreación y deporte</ToggleButton>
          <ToggleButton sx={{border: "1px solid #a1a1a1ff", borderRadius: 2}} value="Vía publica">Vía publica</ToggleButton>
        </ToggleButtonGroup>


        {/* Sección de datos de traslado */}
        <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
          Datos de traslado:
        </Typography>


      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)" // 2 columnas
        gap={2}
        mb={2}
        sx={{border: "1px solid #a1a1a1ff", borderRadius: 2, p: 2}}
      >
        <TextField
          label="Numero de la Ambulancia"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Operador"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="T.U.M"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Socorrista"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Matricula de Helicoptero"
          variant="outlined"
          fullWidth
        />
      </Box>
    </Box>

  );

};

export default DatosTraslado;