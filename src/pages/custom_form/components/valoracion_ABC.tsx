import { useState } from 'react';
import { Box,  TextField, Typography, ToggleButton, ToggleButtonGroup, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/EmojiPeopleOutlined';

interface EvaluacionInicialState {
    consciencia : string;
    deglucion: string;
    viaAerea: string;
    ventilacion: string;
    auscultacion: string;
    hemitorax: string;
    sitio: string;
    presenciaPulsos: string;
    calidad: string;
    piel: string;
    caracteristicas: string;
    observaciones: string;  
}

const initialState: EvaluacionInicialState = {
    consciencia : '',
    deglucion: '',
    viaAerea: '',
    ventilacion: '',
    auscultacion: '',
    hemitorax: '',
    sitio: '',
    presenciaPulsos: '',
    calidad: '',
    piel: '',
    caracteristicas: '',
    observaciones: '',
};

const EvaluacionInicial = () => {
    const [evaluacion , setEvaluacion] = useState<EvaluacionInicialState>(initialState);

    const setEvaluacionField = (key : keyof EvaluacionInicialState, value: string) => {
        if (value === null) return; // Evita actualizar si algun botón esta null

        setEvaluacion((prev) => ({...prev, [key]: value,}));
    };
    const isMobile = window.innerWidth <= 768;

    const toggleStyle = {
        px: 2,
        backgroundColor: '#8E8E8E',
        color: '#f3f3f3',
        '&.Mui-selected': {
        backgroundColor: 'primary.main',
        color: 'white',
        },
        '&:hover': {
        backgroundColor: '#8E8E8E',
        color: 'white',
        },
    };

    return(

    <Box>

        <Divider sx={{ my: 5 }} />
        {/* Sección para rellenar los datos de la madre */}
        <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h6" color="primary">
            EVALUACIÓN INICIAL
            </Typography>
            <PersonIcon sx={{ ml: 1, color: 'primary.main' }} />
        </Box>
        
        {/* Contenedor principal de la sección */}
        <Box
            sx={{
            border: 2,
            borderColor: "primary.main",
            borderRadius: 2,
            p: 2,
            mb: 3,
            width: isMobile ? "100%" : "850px",
            }}
        >

             <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                mb: 2,
                alignItems: "center",
            }}
            > 
                <Typography variant="body1" sx={{ color: "primary.main", mt: 1 , fontWeight: "bold", fontSize: 16 }}>
                    NIVEL DE CONSCIENCIA
                </Typography> 

                <ToggleButtonGroup
                    value={evaluacion.consciencia}
                    exclusive
                    onChange={(e, val) => {
                    if (val !== null)
                        setEvaluacion({ ...evaluacion, consciencia: val });
                    }}
                >
                    <ToggleButton 
                        sx={toggleStyle} value="ALERTA">ALERTA</ToggleButton>
                    <ToggleButton 
                        sx={toggleStyle} value="VERBAL">VERBAL</ToggleButton>
                    <ToggleButton 
                        sx={toggleStyle} value="DOLOR">DOLOR</ToggleButton>
                    <ToggleButton 
                        sx={toggleStyle} value="INCONSCIENTE">INCONSCIENTE</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            {/* Caja 1 de la sección */}
            <Box
            sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                width: "100%",
                justifyContent: "center",
                gap: 2,
                mb: 2,
            }}
            >

                    <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        mb: 2,
                        alignItems: "center",
                    }}
                    > 
                    <Typography variant="body1" sx={{ color: "primary.main", mt: 1 , fontWeight: "bold", fontSize: 16 }}>
                        DEGLUCIÓN
                    </Typography> 

                    <ToggleButtonGroup
                        value={evaluacion.deglucion}
                        exclusive
                        onChange={(e, val) => {
                        if (val !== null)
                            setEvaluacion({ ...evaluacion, deglucion: val });
                        }}
                    >
                        <ToggleButton 
                            sx={toggleStyle} value="AUSENTE">AUSENTE</ToggleButton>
                        <ToggleButton 
                            sx={toggleStyle} value="PRESENTE">PRESENTE</ToggleButton>
                    </ToggleButtonGroup>
                    </Box>

                    <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        mb: 2,
                        alignItems: "center",
                    }}
                    > 
                    <Typography variant="body1" sx={{ color: "primary.main", mt: 1 , fontWeight: "bold", fontSize: 16 }}>
                        VIA AÉREA
                    </Typography> 

                    <ToggleButtonGroup
                        value={evaluacion.viaAerea}
                        exclusive
                        onChange={(e, val) => {
                        if (val !== null)
                            setEvaluacion({ ...evaluacion, viaAerea: val });
                        }}
                    >
                        <ToggleButton 
                            sx={toggleStyle} value="PERMEABLE">PERMEABLE</ToggleButton>
                        <ToggleButton 
                            sx={toggleStyle} value="COMPROMETIDA">COMPROMETIDA</ToggleButton>
                    </ToggleButtonGroup>
                    </Box>
                </Box>  
                        <Divider sx={{ my: 3 }} />
                <Box>   
                  <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        mb: 2,
                        alignItems: "center",
                    }}
                    > 
                    <Typography variant="body1" sx={{ color: "primary.main", fontWeight: "bold", fontSize: 16 }}>
                        VENTILACIÓN
                    </Typography> 

                    <ToggleButtonGroup
                        value={evaluacion.ventilacion}
                        exclusive
                        onChange={(e, val) => {
                        if (val !== null)
                            setEvaluacion({ ...evaluacion, ventilacion: val });
                        }}
                    >
                        <ToggleButton 
                            sx={toggleStyle} value="AUTOMATISMO REGULAR">AUTOMATISMO REGULAR</ToggleButton>
                        <ToggleButton 
                            sx={toggleStyle} value="AUTOMATISMO IRREGULAR">AUTOMATISMO IRREGULAR</ToggleButton>
                        <ToggleButton 
                            sx={toggleStyle} value="AUTOMATISMO RÁPIDO">AUTOMATISMO RÁPIDO</ToggleButton>
                        <ToggleButton 
                            sx={toggleStyle} value="AUTOMATISMO SUPERFICIAL">AUTOMATISMO SUPERFICIAL</ToggleButton>
                        <ToggleButton 
                            sx={toggleStyle} value="APNEA">APNEA</ToggleButton>
                    </ToggleButtonGroup>
                    </Box> 
                </Box> 
                 <Divider sx={{ my: 3 }} />
                <Box>   
                  <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        mb: 2,
                        alignItems: "center",
                    }}
                    > 
                    <Typography variant="body1" sx={{ color: "primary.main",  fontWeight: "bold", fontSize: 16 }}>
                        AUSCULTACIÓN
                    </Typography> 

                    <ToggleButtonGroup
                        value={evaluacion.auscultacion}
                        exclusive
                        onChange={(e, val) => {
                        if (val !== null)
                            setEvaluacion({ ...evaluacion, auscultacion: val });
                        }}
                    >
                        <ToggleButton 
                            sx={toggleStyle} value="NORMALES">RUIDOS RESPIRATORIOS NORMALES</ToggleButton>
                        <ToggleButton 
                            sx={toggleStyle} value="DISMINUIDOS">RUIDOS RESPIRATORIOS DISMINUIDOS</ToggleButton>
                        <ToggleButton 
                            sx={toggleStyle} value="AUSENTES">RUIDOS RESPIRATORIOS AUSENTES</ToggleButton>
                    </ToggleButtonGroup>
                    </Box> 
                    
                    <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        mb: 2,
                        alignItems: "center",
                    }}
                    > 

                        <Box 
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 1,
                            mb: 1,
                            ml: 8,
                            alignItems: "center",
                        }}
                        >
                            <Typography variant="body1" sx={{ color: "gray" }}>
                                HEMITÓRAX
                            </Typography> 

                            <ToggleButtonGroup
                                value={evaluacion.hemitorax}
                                exclusive
                                onChange={(e, val) => {
                                if (val !== null)
                                    setEvaluacion({ ...evaluacion, hemitorax: val });
                                }}
                            >
                                <ToggleButton 
                                    sx={toggleStyle} value="DERECHO">DERECHO</ToggleButton>
                                <ToggleButton 
                                    sx={toggleStyle} value="IZQUIERDO">IZQUIERDO</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>

                        <Box 
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 1,
                            mb: 1,
                            ml: 8,
                            alignItems: "center",
                        }}
                        >
                            <Typography variant="body1" sx={{ color: "gray"}}>
                                SITIO
                            </Typography> 

                            <ToggleButtonGroup
                                value={evaluacion.sitio}
                                exclusive
                                onChange={(e, val) => {
                                if (val !== null)
                                    setEvaluacion({ ...evaluacion, sitio: val });
                                }}
                            >
                                <ToggleButton 
                                    sx={toggleStyle} value="APICAL">APICAL</ToggleButton>
                                <ToggleButton 
                                    sx={toggleStyle} value="BASE">BASE</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                    </Box> 

                </Box> 
                <Divider sx={{ my: 3 }} />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        mb: 1,
                        alignItems: "center",
                    }}
                    > 
                    <Typography variant="body1" sx={{ color: "primary.main", fontWeight: "bold", fontSize: 16 }}>
                        PULSOS
                    </Typography> 

                     <Box
                        sx={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        gap: 2,
                        width: "100%",
                        }}
                    >
                        {/*Seccion presencia de pulsos*/}
                        <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            mb: 1,
                            alignItems: "center",
                        }}
                        > 
                            <Typography variant="body1" sx={{ color: "gray"}}>
                                PRESENCIA
                            </Typography> 

                            <ToggleButtonGroup
                                value={evaluacion.presenciaPulsos}
                                exclusive
                                onChange={(e, val) => {
                                if (val !== null)
                                    setEvaluacion({ ...evaluacion, presenciaPulsos: val });
                                }}
                            >
                                <ToggleButton 
                                    sx={toggleStyle} value="CAROTIDEO">CAROTIDEO</ToggleButton>
                                <ToggleButton 
                                    sx={toggleStyle} value="RADIAL">RADIAL</ToggleButton>
                                <ToggleButton 
                                    sx={toggleStyle} value="PARO CARDIORESPIRATORIO">PARO CARDIORESPIRATORIO</ToggleButton>
                            </ToggleButtonGroup>

                        </Box> 
                        {/*Seccion calidad de pulsos*/}

                        <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            mb: 1,
                            alignItems: "center",
                        }}
                        > 
                            <Typography variant="body1" sx={{ color: "gray" }}>
                                CALIDAD
                            </Typography> 

                            <ToggleButtonGroup
                                value={evaluacion.calidad}
                                onChange={(e, val) => {
                                if (val !== null)
                                    setEvaluacion({ ...evaluacion, calidad: val });
                                }}
                            >
                            <ToggleButton 
                                sx={toggleStyle} value="RÁPIDO">RÁPIDO</ToggleButton>
                            <ToggleButton 
                                sx={toggleStyle} value="LENTO">LENTO</ToggleButton>
                            <ToggleButton 
                                sx={toggleStyle} value="RÍTMICO">RÍTMICO</ToggleButton>
                            <ToggleButton 
                                sx={toggleStyle} value="ARRÍTMICO">ARRÍTMICO</ToggleButton>
                        </ToggleButtonGroup>
                    </Box> 
                </Box>
            </Box>
            <Divider sx={{ my: 3 }} />     
            <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        alignItems: "center",
                    }}
                    > 
                    <Typography variant="body1" sx={{ color: "primary.main",  fontWeight: "bold", fontSize: 16}}>
                        ESTADO DE LA PIEL
                    </Typography> 

                     <Box
                        sx={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        gap: 6,
                        width: "100%",
                        }}
                    >
                        {/*Seccion presencia de pulsos*/}
                        <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            mb: 2,
                            alignItems: "center",
                        }}
                        > 
                            <Typography variant="body1" sx={{ color: "gray"}}>
                                COLORACIÓN
                            </Typography> 

                            <ToggleButtonGroup
                                value={evaluacion.piel}
                                exclusive
                                onChange={(e, val) => {
                                if (val !== null)
                                    setEvaluacion({ ...evaluacion, piel: val });
                                }}
                            >
                                <ToggleButton 
                                    sx={toggleStyle} value="NORMAL">NORMAL</ToggleButton>
                                <ToggleButton 
                                    sx={toggleStyle} value="PÁLIDA">PÁLIDA</ToggleButton>
                                <ToggleButton 
                                    sx={toggleStyle} value="CIANÓTICA">CIANÓTICA</ToggleButton>
                            </ToggleButtonGroup>

                        </Box> 
                        {/*Seccion calidad de pulsos*/}

                        <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            mb: 2,
                            alignItems: "center",
                        }}
                        > 
                            <Typography variant="body1" sx={{ color: "gray"}}>
                                CARACTERÍSTICAS
                            </Typography> 

                            <ToggleButtonGroup
                                value={evaluacion.piel}
                                onChange={(e, val) => {
                                if (val !== null)
                                    setEvaluacion({ ...evaluacion, piel: val });
                                }}
                            >
                            <ToggleButton 
                                sx={toggleStyle} value="CALIENTE">CALIENTE</ToggleButton>
                            <ToggleButton 
                                sx={toggleStyle} value="FRÍA">FRÍA</ToggleButton>
                            <ToggleButton 
                                sx={toggleStyle} value="DIAFORESIS">DIAFORESIS</ToggleButton>
                            <ToggleButton 
                                sx={toggleStyle} value="NORMOTÉRMICO">NORMOTÉRMICO</ToggleButton>
                            </ToggleButtonGroup>
                    </Box> 
                </Box>
            </Box>
                    

                {/* Caja 3 de la sección */}
                <Divider sx={{ my: 3 }} />
                <Typography
                    variant="h5"
                    paddingTop={2}
                    gutterBottom
                    sx={{ 
                        fontWeight:"bold",
                        fontSize : 16,
                        color: 'primary.main' }}
                    >OBSERVACIONES ADICIONALES
                </Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    maxRows={6}
                    placeholder="Escribe aquí tus observaciones..."
                    value={evaluacion.observaciones}
                    onChange={(e, val) => {
                        if (val !== null)
                            setEvaluacion({ ...evaluacion, observaciones: val });
                    }}
                />
        </Box>
    </Box>
    
  );
};

export default EvaluacionInicial; 