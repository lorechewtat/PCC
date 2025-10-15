import { Box, TextField, Typography, Stack, ToggleButton, ToggleButtonGroup, Divider } from "@mui/material";
import logo from '../custom_form/components/secciones_atencion_hosp/logo_alcaldia.png'; // Ajusta la ruta de tu logo
import logoHosp from '../custom_form/components/secciones_atencion_hosp/hosp.png'; // Ajusta la ruta de tu logo
import Addlocation from '@mui/icons-material/AddLocation';
import Gravedad from '@mui/icons-material/GppMaybe';
import Datos from '@mui/icons-material/TextSnippet';
import Atencion from '@mui/icons-material/PriorityHighSharp';
import {useState } from "react";

export type EmergenciasUrbanas = {
        fecha: string,
        turno: string,
        nombrePersonal: string,  
        modoActivacion: string,
        tipoServicio: string,
        detallesUbicacion: string,
        responsableEmergencia: string,
        gravedad: string,
        afectaciones: string,
        conclusion: string,
        fechaAtencion: string,
        tiempoTraslado: string,
        Km: string,
        trabajos: string,
        autoridades: string,
        observaciones: string,
    };

type Props = {
  value: EmergenciasUrbanas;
  onChange: (patch: Partial<EmergenciasUrbanas>) => void;
};

// value, onChange }: Props

const EmergenciasPage = () => {
  const isMobile = window.innerWidth <= 768;
  const hoy = new Date().toISOString().split('T')[0];

  const commonBtnSx = {
        backgroundColor: '#8E8E8E',
        color: '#f3f3f3ff',
        '&.Mui-selected': { backgroundColor: 'primary.main', color: 'white', borderColor: 'primary.main' },
        '&:hover': { backgroundColor: '#8E8E8E', color: 'white', borderColor: '#8E8E8E', cursor: 'pointer' },
    };

    const [form, setForm] = useState({
        fecha: "",
        turno: "",
        nombrePersonal: "",  
        modoActivacion: "",
        tipoServicio: "",
        detallesUbicacion: "",
        responsableEmergencia: "",
        gravedad: "",
        afectaciones: "",
        conclusion: "",
        fechaAtencion: "",
        tiempoTraslado: "",
        Km: "",
        trabajos: "",
        autoridades: "",
        observaciones: "",
    });

    // setter genérico
    const setField = <K extends keyof typeof form>(key: K) =>
    (value: typeof form[K]) => setForm(prev => ({ ...prev, [key]: value }));

//     const EMPTY: EmergenciasUrbanas = {
//   fecha: "", turno: "", nombrePersonal: "", modoActivacion: "", tipoServicio: "",
//   detallesUbicacion: "", responsableEmergencia: "", gravedad: "", afectaciones: "",
//   conclusion: "", fechaAtencion: "", tiempoTraslado: "", Km: "", trabajos: "",
//   autoridades: "", observaciones: "",
// };

// const v = value ?? EMPTY;
//   const safeOnChange = onChange ?? (() => {});

//     const handleFieldChange = (field: keyof EmergenciasUrbanas) =>
//             (e: React.ChangeEvent<HTMLInputElement>) => {
//                 safeOnChange ({ [field]: e.target.value } as Partial<EmergenciasUrbanas>);
//             };
    
//     const handleSingleSelectChange = (field: keyof EmergenciasUrbanas) =>
//         (newValue: string | null) => {
//             if (newValue !== null) {
//                 safeOnChange ({ [field]: newValue } as Partial<EmergenciasUrbanas>);
//             }
//         };


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

    <Box display="flex" alignItems="center" mb={2} gap={1}>
            <Typography variant="h6" color="primary">
                DATOS GENERALES
            </Typography>
            <Datos sx={{ mr: 1, color: 'primary.main' }}/>
    </Box>

    <Box display="flex" flexDirection="column" width={isMobile ? '100%':'68%'} gap={2} mb={2}
        sx={{ border: 2, borderColor: 'primary.main', borderRadius: 2, p: 2 }}>
        
        <Stack justifyContent={isMobile ? "space-between" : "flex-start"}
        flexDirection={{xs: 'column', sm: 'row'}} gap={2} width="100%" mb={2}>
            <TextField
            label="FECHA Y HORA"
            type="datetime-local"
            name='fecha'
            defaultValue={hoy}
            variant="standard"  
            value={form.fecha}
            onChange={e => setField('fecha')(e.target.value)}
            // value={v.fecha}
            // onChange={handleFieldChange('fecha')}
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
            // value={v.turno}
            // onChange={handleFieldChange('turno')}
            sx={{
                width: "130px"
            }}
            />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={6} sx={{display: 'flex', alignItems: {xs: 'self-start', sm: 'center'}, mb: 3, justifyContent: "space-between"}}>
            <TextField
            color="primary"
            label="NOMBRE DEL PERSONAL"
            variant="standard"
            value={form.nombrePersonal}
            onChange={e => setField('nombrePersonal')(e.target.value)}
            // value={v.nombrePersonal}
            // onChange={handleFieldChange('nombrePersonal')}
            fullWidth
            />

            <Stack direction="column">
            <Typography variant="body1" sx={{ mb: 1, color: "gray" }}>
                MODO DE ACTIVACIÓN
            </Typography>
            <ToggleButtonGroup
            // value={v.modoActivacion}
            color="primary"
            exclusive
            value={form.modoActivacion}
            onChange={(_, v) => setField('modoActivacion')(v)}
            // onChange={(_, v) => handleSingleSelectChange('modoActivacion')(v)}  
            >
                
            <ToggleButton sx={commonBtnSx} value="llamada_de_emergencia">llamada de emergencia</ToggleButton>
            <ToggleButton sx={commonBtnSx} value="seguimiento_de_oficio">seguimiento de oficio</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Stack>
        
        <TextField
        color="primary"
        label="TIPO DE SERVICIO"
        variant="standard"
        // value={v.tipoServicio}
        // onChange={handleFieldChange('tipoServicio')}
        value={form.tipoServicio}
        onChange={e => setField('tipoServicio')(e.target.value)}
        fullWidth
        sx={{
            marginBottom: '10px'
        }}
        />
    </Box>

    <Divider sx={{ my: 5, width: '100%'}}/>

    <Box display="flex" alignItems="center" mb={2} gap={1}>
            <Typography variant="h6" color="primary">
                UBICACIÓN DEL EVENTO
            </Typography>
            <Addlocation sx={{ mr: 1, color: 'primary.main' }}/>
    </Box>

    <Box display="flex" flexDirection="column" width={isMobile ? '100%':'68%'} gap={2} mb={2}
        sx={{ border: 2, borderColor: 'primary.main', borderRadius: 2, p: 2 }}>
        
        <TextField
        color="primary"
        label="DETALLES DE UBICACIÓN"
        variant="standard"
        // value={v.detallesUbicacion}
        //onChange={handleFieldChange('detallesUbicacion')}
        value={form.detallesUbicacion}
        onChange={e => setField('detallesUbicacion')(e.target.value)}
        fullWidth
        />

        <TextField
        color="primary"
        label="RESPONSABLE DE LA EMERGENCIA (INMUEBLE O ZONA)"
        variant="standard"
        value={form.responsableEmergencia}
        onChange={e => setField('responsableEmergencia')(e.target.value)}
        // value={v.responsableEmergencia}
        //onChange={handleFieldChange('responsableEmergencia')}
        sx={{
            marginBottom: '10px'
        }}
        />
    </Box>

    <Divider sx={{ my: 5, width: '100%'}}/>

    <Box display="flex" alignItems="center" mb={2} gap={1}>
            <Typography variant="h6" color="primary">
                DESCRIPCIÓN DE EMERGENCIA
            </Typography>
            <Gravedad sx={{ mr: 1, color: 'primary.main' }}/>
    </Box>
   
    <Box display="flex" flexDirection="column" width={isMobile ? '100%':'68%'} gap={2} mb={2}
        sx={{ border: 2, borderColor: 'primary.main', borderRadius: 2, p: 2 }}>
        <TextField
        color="primary"
        label="GRAVEDAD DE LA EMERGENCIA"
        variant="standard"
        // value={v.gravedad}
        //onChange={handleFieldChange('gravedad')}
        value={form.gravedad}
        onChange={e => setField('gravedad')(e.target.value)}
        fullWidth
        />

        <TextField
        color="primary"
        label="AFECTACIONES (INFRAESTRUCTURA O NATURALES)"
        variant="standard"
        // value={v.afectaciones}
        //onChange={handleFieldChange('afectaciones')}
        value={form.afectaciones}
        onChange={e => setField('afectaciones')(e.target.value)}
        fullWidth
        />

        <TextField
        color="primary"
        label="CONCLUSION DE LA EMERGENCIA"
        variant="standard"
        value={form.conclusion}
        onChange={e => setField('conclusion')(e.target.value)}
        // value={v.conclusion}
        //onChange={handleFieldChange('conclusion')}
        sx={{
            marginBottom: '10px'
        }}
        />
    </Box>

    <Divider sx={{ my: 5 , width: '100%'}}/>

    <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h6" color="primary">
                ATENCIÓN Y RESPUESTA
            </Typography>
            <Atencion sx={{ mr: 1, color: 'primary.main' }}/>
    </Box>

    <Box display="flex" flexDirection="column" width={isMobile ? '100%':'68%'} gap={2} mb={2}
        sx={{ border: 2, borderColor: 'primary.main', borderRadius: 2, p: 2 }}>
        
        <Stack justifyContent={isMobile ? "space-between" : "flex-start"}
        flexDirection={{xs: 'column', sm: 'row'}} gap={2} width="100%">
            <TextField
            label="FECHA Y HORA DE ATENCION"
            type="datetime-local"
            name='fecha'
            defaultValue={hoy}
            variant="standard"  
            value={form.fechaAtencion}
            onChange={e => setField('fechaAtencion')(e.target.value)}
            // value={v.fecha}
            // onChange={handleFieldChange('fecha')}
            sx={
            {
                color: 'primary.main'
            }
            }
            InputLabelProps={{ shrink: true }}
            />


            <TextField
            color="primary"
            label="TIEMPO DE TRASLADO"
            variant="standard"
            value={form.turno}
            onChange={e => setField('turno')(e.target.value)}
            // value={v.turno}
            // onChange={handleFieldChange('turno')}
            sx={{
                width: isMobile ? '100%':'35%'
            }}
            />

            <TextField
            color="primary"
            label="KILOMETROS RECORRIDOS"
            type="number"
            variant="standard"
            value={form.Km}
            onChange={e => setField('Km')(e.target.value)}
            // value={v.turno}
            // onChange={handleFieldChange('turno')}
            sx={{
                width: isMobile ? '100%':'35%'
            }}
            />
        </Stack>

        <TextField
        color="primary"
        label="TRABAJOS REALIZADOS"
        variant="standard"
        value={form.trabajos}
        onChange={e => setField('trabajos')(e.target.value)}
        // value={v.conclusion}
        //onChange={handleFieldChange('conclusion')}
        />

        <TextField
        color="primary"
        label="OBSERVACIONES"
        variant="standard"
        // value={v.observaciones}
        //onChange={handleFieldChange('observaciones')}
        value={form.observaciones}
        onChange={e => setField('observaciones')(e.target.value)}
        fullWidth
        />

        <TextField
        color="primary"
        label="AUTORIDADES Y DEPENDENCIAS PARTICIPANTES"
        variant="standard"
        // value={v.observaciones}
        //onChange={handleFieldChange('observaciones')}
        value={form.observaciones}
        onChange={e => setField('observaciones')(e.target.value)}
        fullWidth
        sx={{
            marginBottom: '10px'
        }}
        />
    </Box>

</Box>
  );
};


export default EmergenciasPage;
