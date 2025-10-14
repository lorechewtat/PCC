import { Box, TextField, Typography, Stack } from "@mui/material";
import logo from '../custom_form/components/secciones_atencion_hosp/logo_alcaldia.png'; // Ajusta la ruta de tu logo
import logoHosp from '../custom_form/components/secciones_atencion_hosp/hosp.png'; // Ajusta la ruta de tu logo
import { useEffect, useState } from "react";

const EmergenciasPage = () => {
  const [form, setForm] = useState({
        fecha: "",
        turno: "",
        nombrePersonal: "",  
        tipoServicio: "",
        detallesUbicacion: "",
        gravedad: "",
        observaciones: "",
        conclusion: "",
        responableConConocimiento: ""
    });


    // setter genérico
    const setField = <K extends keyof typeof form>(key: K) =>
    (value: typeof form[K]) => setForm(prev => ({ ...prev, [key]: value }));
   
  const isMobile = window.innerWidth <= 768;
  const hoy = new Date().toISOString().split('T')[0];


  return (
<Box
    display="flex"
    flexDirection="column"
    alignItems="start"
    justifyContent="space-between"
    sx={{
        margin: isMobile ? 1 : 5
    }}
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
    >
     
        <Typography
            variant="h5"
            gutterBottom
            sx={{
            width:"30vw",
            fontSize : 36,
            color: 'primary.main' }}
        >Emergencias Urbanas
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
        flexDirection={{xs: 'column', sm: 'row'}} gap={2} width="100%" mb={2}>
   
        <TextField
            label="FECHA Y HORA"
            type="datetime-local"
            defaultValue={hoy}
            variant="standard"  
            value={form.fecha}
                onChange={e => setField('fecha')(e.target.value)}
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
        label="TURNO"
        type="number"
        variant="standard"
        value={form.turno}
        onChange={e => setField('turno')(e.target.value)}
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


    <TextField
        color="primary"
        label="NOMBRE DEL PERSONAL"
        variant="standard"
        value={form.nombrePersonal}
        onChange={e => setField('nombrePersonal')(e.target.value)}
        sx={{
            width: "250px",
            marginBottom: 3
        }}
        />


    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={6} sx={{display: 'flex', alignItems: {xs: 'self-start', sm: 'end'}, mb: 3, justifyContent: "space-between"}}>
        <TextField
        color="primary"
        label="TIPO DE SERVICIO"
        variant="standard"
        value={form.tipoServicio}
        onChange={e => setField('tipoServicio')(e.target.value)}
        sx={{
            width: "250px",
        }}
        />


        <TextField
        color="primary"
        label="DETALLES DE UBICACIÓN"
        variant="standard"
        value={form.detallesUbicacion}
        onChange={e => setField('detallesUbicacion')(e.target.value)}
        sx={{
            width: "250px",
        }}
        />


        <TextField
        color="primary"
        label="GRAVEDAD DE LA EMERGENCIA"
        variant="standard"
        value={form.gravedad}
        onChange={e => setField('gravedad')(e.target.value)}
        sx={{
            width: "250px",
        }}
        />


        <TextField
        color="primary"
        label="OBSERVACIONES Y AFECTACIONES"
        variant="standard"
        value={form.observaciones}
        onChange={e => setField('observaciones')(e.target.value)}
        sx={{
            width: "250px",
        }}
        />
    </Stack>


    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={6} sx={{display: 'flex', alignItems: {xs: 'self-start', sm: 'end'}, mb: 3, justifyContent: "space-between"}}>
        <TextField
        color="primary"
        label="CONCLUSION DE LA EMERGENCIA"
        variant="standard"
        value={form.conclusion}
        onChange={e => setField('conclusion')(e.target.value)}
        sx={{
            width: "250px",
        }}
        />


        <TextField
        color="primary"
        label="RESPONSABLE Y PERSONA QUE TOMA CONOCIMIENTO"
        variant="standard"
        value={form.responableConConocimiento}
        onChange={e => setField('responableConConocimiento')(e.target.value)}
        sx={{
            width: "250px",
        }}
        />
    </Stack>
   


</Box>
  );
};


export default EmergenciasPage;
