import React from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';
import logo from './logo_alcaldia.png'; // Ajusta la ruta de tu logo
import logoHosp from './hosp.png'; // Ajusta la ruta de tu logo
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const HeaderAtencionPrehospitalaria = () => {
  const isMobile = window.innerWidth <= 768;
  const hoy = new Date().toISOString().split('T')[0];
  return (
    <Box
    
      display="flex"
      flexDirection="column"
      alignItems="start"
      justifyContent="space-between"
    >
          <Box
        component="img"
        src={logo} 
        alt="Logo"
       sx={{
         width: '100',  
         height: 'auto',   
         maxWidth: '30vw', 
         paddingBottom: 5
         }}
      />
<Box
  display="flex"
  width="100%"
  flexDirection="row"
  alignItems="center"
  justifyContent="space-between" 
  sx={{
    maxWidth: { xs: 320, sm: 1100}
  }}
>
     
      <Typography
      
        variant="h5"
        gutterBottom
        sx={{ 
          width:"30vw",
          fontSize : { xs: 33, sm: 36},
          color: 'primary.main' }}
      >Atención Prehospitalaria
      </Typography>

      {/* Imagen a la derecha */}
      <Box
        component="img"
        src={logoHosp} // o usa una URL local o externa
        alt="Logo"
        sx={{ width: '70px',  
         height: 'auto',   
          }}
      />
    </Box>
     
     <Box 
      width="100%"
     display="flex"
      flexDirection="column"
      alignItems="flex-start" 
      justifyContent="space-between">

           <Typography

        variant="h5"
        gutterBottom
        sx={{ 
          
          paddingBottom:3,
         fontWeight:"regular",
          fontSize : 14,
          color: 'primary.main' }}
      >Rellena tu información con cuidado
      </Typography>
     </Box>
        <Box display="flex" 
        justifyContent={isMobile ? "space-between" : "flex-start"} 
        flexDirection="row" gap={2} width="100%">
   
     <TextField
        label="FECHA"
        type="date"
        
        defaultValue={hoy}
        variant="standard"  
                 
        sx={
          {
            paddingRight:"20px",
            color: 'primary.main' 
          }
        }
        InputLabelProps={{ shrink: true }}
      />

    <TextField
  color="primary"
  label="FOLIO ####"
  type="number"
  variant="standard"
  placeholder="N° DE FOLIO"
  sx={{
    width: "130px",
    // Texto dentro del input
    '& .MuiInput-input': {
      color: 'primary.main',
    },
    // Label
    '& .MuiInput-label': {
      color: 'primary.main',
    },
    // Línea inferior
    '& .MuiInput-underline:before': {
      borderBottomColor: 'primary.main',
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: 'primary.main',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'primary.main',
    },
    // Placeholder
    '& input::placeholder': {
      color: 'primary.main',
      opacity: 1,
    },
    // Quitar flechas de número
    '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
    '& input[type=number]': {
      MozAppearance: 'textfield',
    },
  }}
/>
    </Box>
 <Box>

      <Box display="flex" alignItems="center" mb={2} paddingTop={2}>
       
        <Typography variant="h6" color="primary">
          CRONOMETRÍA
        </Typography>
         <AccessTimeIcon sx={{ mr: 1, color: 'primary.main' }} />
      </Box >

      {/* CAMPOS DE HORA FUERA DEL CONTAINER */}
      <Box sx={{ border: 2, borderColor: 'primary.main', borderRadius: 2, p: 2, width:{xs: "20rem", sm: "40rem"} }}>
  <Grid container spacing={2} mb={4} wrap="nowrap" sx={{
    gridTemplateColumns: {
      xs: 'repeat(1, 1fr)',
      sm: 'repeat(2, 1fr)',
    },
    display: 'grid',
  }}>
  {/* Columna 1 */}
  <Grid  sx={{ flex: 1, minWidth: 150 }}>
    <TextField
      label="HORA DE LLAMADA"
      type="time"
      variant="standard"
      InputLabelProps={{ shrink: true }}
      inputProps={{ step: 300 }}
      fullWidth
      sx={{ mb: 2 }}
    />
    <TextField
      label="HORA DE SALIDA"
      type="time"
      variant="standard"
      InputLabelProps={{ shrink: true }}
      inputProps={{ step: 300 }}
      fullWidth
      sx={{ mb: 2 }}
    />
    <TextField
      label="HORA DE LLEGADA"
      type="time"
      variant="standard"
      InputLabelProps={{ shrink: true }}
      inputProps={{ step: 300 }}
      fullWidth
      sx={{ mb: 2 }}
    />
    <TextField
      label="HORA DE TRASLADO"
      type="time"
      variant="standard"
      InputLabelProps={{ shrink: true }}
      inputProps={{ step: 300 }}
      fullWidth
    />
  </Grid>

  {/* Columna 2 */}
  <Grid  sx={{ flex: 1, minWidth: 150 }}>
    <TextField
      label="HORA HOSPITAL"
      type="time"
      variant="standard"
      InputLabelProps={{ shrink: true }}
      inputProps={{ step: 300 }}
      fullWidth
      sx={{ mb: 2 }}
    />
    <TextField
      label="SALIDA HOSPITAL"
      type="time"
      variant="standard"
      InputLabelProps={{ shrink: true }}
      inputProps={{ step: 300 }}
      fullWidth
      sx={{ mb: 2 }}
    />
    <TextField
      label="HORA BASE"
      type="time"
      variant="standard"
      InputLabelProps={{ shrink: true }}
      inputProps={{ step: 300 }}
      fullWidth
    />
  </Grid>
</Grid>
</Box>


     
    </Box>
    </Box>


  );
};

export default HeaderAtencionPrehospitalaria;


