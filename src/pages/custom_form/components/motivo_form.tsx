import React from 'react';
import { Box, Grid, TextField, Typography, Button } from '@mui/material';
import logo from './logo_alcaldia.png'; // Ajusta la ruta de tu logo
import logoHosp from './hosp.png'; // Ajusta la ruta de tu logo
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationIcon from '@mui/icons-material/LocationOnOutlined';
import ChildIcon from '@mui/icons-material/ChildCareOutlined';
import SickIcon from '@mui/icons-material/SickOutlined';
import TraumaIcon from '@mui/icons-material/LocalHospitalOutlined';

const MotivoAtencionPrehospitalaria = () => {
  const isMobile = window.innerWidth <= 768;
  const [selected, setSelected] = React.useState(""); // Estado para el botón seleccionado
  const azulOscuro = "#203972";
  const grisClaro = "#8E8E8E";
  return (
    <Box
    
      display="flex"
      flexDirection="column"
      alignItems="start"
      justifyContent="space-between"
    >
    
    <Box
        display="flex"
        width="100%"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between" 
        margin = "20px 0px 5px 5px"
    >
     
      <Typography
        variant="h6"
        sx={{ 
          width:"100%",
          fontSize : 24,
          color: 'primary.main' }}
      > Motivo de la atención
      </Typography>
    </Box>
     
     <Box 
      width="100%"
     display="flex"
      flexDirection="column"
      alignItems="flex-start" 
      justifyContent="space-between"
      margin = "0px 0px 0px 5px">

        <Typography

            variant="h5"
            gutterBottom
            sx={{ 
          
          paddingBottom:3,
         fontWeight:"regular",
          fontSize : 14,
          color: 'primary.main' }}
      >Presiona el motivo para desplegar los demás campos
      </Typography>
     </Box>

{/* SECCIÓN DE BOTONES */}
<Box display ="flex" 
  flexDirection = "row"
  width = {isMobile ? "100%" : "68%"}
  gap= {1}
  justifyContent={isMobile ? "space-between" : "center"}
  alignItems="flex-start">

        <Button 
        onClick = {() => setSelected("enfermedad")}
        variant = "contained" 
        sx={{ width: "29%", border: 2, borderColor:selected === "enfermedad" ? azulOscuro : grisClaro, 
              borderRadius: 1.5, p: 2, 
              backgroundColor: selected === "enfermedad" ? azulOscuro : grisClaro}}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography

            variant="h5"
            gutterBottom
            align="center"
            sx={{ 
          
          fontSize : 12,
          fontWeight: "bold",
          color: 'primary.contrastText' }}
      >ENFERMEDAD
      </Typography>

        <SickIcon sx={{ color: 'primary.contrastText'}} />

        </Box>
        </Button>

       <Button 
        onClick = {() => setSelected("gineco")}
        variant = "contained" 
        sx={{ width: "35%", border: 2, borderColor: selected === "gineco" ? azulOscuro : grisClaro, 
              borderRadius: 1.5, p: 2, 
              backgroundColor: selected === "gineco" ? azulOscuro : grisClaro}}>
        
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography

            variant="h5"
            gutterBottom
            align="center"
            sx={{ 
          
          fontSize : 12,
          fontWeight: "bold",
          color: 'primary.contrastText' }}
      >GINECOOBSTETRICIO
      </Typography>
      <ChildIcon sx={{ color: 'primary.contrastText' }} />
      </Box>
        
      </Button>

        <Button 
        onClick = {() => setSelected("trauma")}
        variant = "contained" 
        sx={{ width: "29%", border: 2, borderColor: selected === "trauma" ? azulOscuro : grisClaro, 
              borderRadius: 1.5, p: 2, 
              backgroundColor: selected === "trauma" ? azulOscuro : grisClaro}}>

        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography

            variant="h5"
            gutterBottom
            align="center"
            sx={{ 
      
          fontSize : 12,
          fontWeight: "bold",
          color: 'primary.contrastText' }}
        >TRAUMATISMO
        </Typography>
        <TraumaIcon sx={{ color: 'primary.contrastText' }} />
        </Box>
        

        </Button>
    </Box>
 
 <Box>


  {/* SECCIÓN DE UBICACIÓN DEL SERVICIO */}
      <Box display="flex" alignItems="center" mb={1} paddingTop={4} marginLeft = {1}>
       
        <Typography variant="h6" color="primary">
          UBICACIÓN DEL SERVICIO
        </Typography>
         <LocationIcon sx={{ mr: 1, color: 'primary.main', marginLeft: 1}} />
      </Box >

      {/* CAMPOS*/}
      <Box width = {isMobile ? "100%" : "68%"}
            sx={{ border: 2, borderColor: 'primary.main', borderRadius: 2, p: 2 }}>


    <TextField
      type="text"
      variant="standard"
      placeholder= "CALLE"
      fullWidth
      sx={{ mb: 1 }}
    />

    <Box display = "flex" flexDirection="row" alignItems="flex-start">
      <Typography variant="subtitle1" color="primary.main" sx={{ mb: 1, mt: 1 }}>
      ENTRE
      </Typography>
      
      <TextField
        type="text"
        variant="standard"
        fullWidth
        sx={{ mb: 1, ml: 1, mr: 1 }}
      />
      <Typography variant="subtitle1" color="primary" sx={{ mb: 1, mt: 1 }}>
      Y
      </Typography>

      <TextField
        type="text"
        variant="standard"
        fullWidth
        sx={{ mb: 1, ml: 1 }}
      />
    </Box>
    
    
    <TextField
      type="text"
      variant="standard"
      placeholder= "COLONIA O COMUNIDAD"
      fullWidth
      sx={{ mb: 2 }}
    />
    <TextField
      type="text"
      variant="standard"
      placeholder= "ALCALDIA O MUNICIPIO"
      fullWidth
    />

</Box> 
    </Box>
    </Box>


  );
};

export default MotivoAtencionPrehospitalaria;


