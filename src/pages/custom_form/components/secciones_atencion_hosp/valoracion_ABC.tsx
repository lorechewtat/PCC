import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Divider, useMediaQuery, Theme } from '@mui/material';
import PersonIcon from '@mui/icons-material/EmojiPeopleOutlined';

export type EvaluacionInicial = {
    consciencia: string;
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
};

type Props = {
    value: EvaluacionInicial;
    onChange: (patch: Partial<EvaluacionInicial>) => void;
};

const EvaluacionInicial = ({ value, onChange }: Props) => {
    const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    const handleFieldChange = (field: keyof EvaluacionInicial) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange({ [field]: e.target.value } as Partial<EvaluacionInicial>);
        };

    const handleSingleSelectChange = (field: keyof EvaluacionInicial) =>
        (newValue: string | null) => {
            if (newValue !== null) {
                onChange({ [field]: newValue } as Partial<EvaluacionInicial>);
            }
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

    return (
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
                    <Typography variant="body1" sx={{ color: "primary.main", mt: 1, fontWeight: "bold", fontSize: 16 }}>
                        NIVEL DE CONSCIENCIA
                    </Typography> 

                <ToggleButtonGroup
                    value={value.consciencia}
                    exclusive
                    onChange={(_, v) => handleSingleSelectChange('consciencia')(v)}
                    sx={{mb: 1 , 
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
                        <Typography variant="body1" sx={{ color: "primary.main", mt: 1, fontWeight: "bold", fontSize: 16 }}>
                            DEGLUCIÓN
                        </Typography> 

                        <ToggleButtonGroup
                            value={value.deglucion}
                            exclusive
                            onChange={(_, v) => handleSingleSelectChange('deglucion')(v)}
                        >
                            <ToggleButton sx={toggleStyle} value="AUSENTE">AUSENTE</ToggleButton>
                            <ToggleButton sx={toggleStyle} value="PRESENTE">PRESENTE</ToggleButton>
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
                        <Typography variant="body1" sx={{ color: "primary.main", mt: 1, fontWeight: "bold", fontSize: 16 }}>
                            VIA AÉREA
                        </Typography> 

                        <ToggleButtonGroup
                            value={value.viaAerea}
                            exclusive
                            onChange={(_, v) => handleSingleSelectChange('viaAerea')(v)}
                        >
                            <ToggleButton sx={toggleStyle} value="PERMEABLE">PERMEABLE</ToggleButton>
                            <ToggleButton sx={toggleStyle} value="COMPROMETIDA">COMPROMETIDA</ToggleButton>
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
                        value={value.ventilacion}
                            exclusive
                            onChange={(_, v) => handleSingleSelectChange('ventilacion')(v)}
                            sx={{mb: 1 , 
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
                        <Typography variant="body1" sx={{ color: "primary.main", fontWeight: "bold", fontSize: 16 }}>
                            AUSCULTACIÓN
                        </Typography> 

                    <ToggleButtonGroup
                        value={value.auscultacion}
                        exclusive
                        onChange={(_, v) => handleSingleSelectChange('auscultacion')(v)}
                        sx={{mb: 1 , 
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
                            flexWrap: 'wrap', 
                            gap: 1,
                            mb: 1,
                            ml: isMobile ? 1 : 8,
                            alignItems: "center",
                        }}
                        >
                            <Typography variant="body1" sx={{ color: "gray" }}>
                                HEMITÓRAX
                            </Typography> 

                            <ToggleButtonGroup
                                value={value.hemitorax}
                                exclusive
                                onChange={(_, v) => handleSingleSelectChange('hemitorax')(v)}
                                sx={{mb: 1 , 
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
                                <ToggleButton sx={toggleStyle} value="DERECHO">DERECHO</ToggleButton>
                                <ToggleButton sx={toggleStyle} value="IZQUIERDO">IZQUIERDO</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>

                        <Box 
                        sx={{
                            display: "flex",
                            flexWrap: 'wrap', 
                            flexDirection: "row",
                            gap: 1,
                            mb: 1,
                            ml: isMobile ? 1 : 8,
                            alignItems: "center",
                        }}
                        >
                            <Typography variant="body1" sx={{ color: "gray"}}>
                                SITIO
                            </Typography> 

                            <ToggleButtonGroup
                                value={value.sitio}
                                exclusive
                                onChange={(_, v) => handleSingleSelectChange('sitio')(v)}
                                sx={{mb: 1 , 
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
                                <ToggleButton sx={toggleStyle} value="APICAL">APICAL</ToggleButton>
                                <ToggleButton sx={toggleStyle} value="BASE">BASE</ToggleButton>
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
                                value={value.presenciaPulsos}
                                exclusive
                                onChange={(_, v) => handleSingleSelectChange('presenciaPulsos')(v)}
                                sx={{mb: 1 , 
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
                                <ToggleButton sx={toggleStyle} value="CAROTIDEO">CAROTIDEO</ToggleButton>
                                <ToggleButton sx={toggleStyle} value="RADIAL">RADIAL</ToggleButton>
                                <ToggleButton sx={toggleStyle} value="PARO CARDIORESPIRATORIO">PARO CARDIORESPIRATORIO</ToggleButton>
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
                                value={value.calidad}
                                exclusive
                                onChange={(_, v) => handleSingleSelectChange('calidad')(v)}
                                sx={{mb: 1 , 
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
                    <Typography variant="body1" sx={{ color: "primary.main", fontWeight: "bold", fontSize: 16}}>
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
                        {/*Seccion coloración*/}
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
                                value={value.piel}
                                exclusive
                                onChange={(_, v) => handleSingleSelectChange('piel')(v)}
                            >
                                <ToggleButton sx={toggleStyle} value="NORMAL">NORMAL</ToggleButton>
                                <ToggleButton sx={toggleStyle} value="PÁLIDA">PÁLIDA</ToggleButton>
                                <ToggleButton sx={toggleStyle} value="CIANÓTICA">CIANÓTICA</ToggleButton>
                            </ToggleButtonGroup>
                        </Box> 

                        {/*Seccion características*/}
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
                                value={value.caracteristicas}
                                exclusive
                                onChange={(_, v) => handleSingleSelectChange('caracteristicas')(v)}
                                sx={{mb: 1 , 
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
                        color: 'primary.main' 
                    }}
                >
                    OBSERVACIONES ADICIONALES
                </Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    maxRows={6}
                    placeholder="Escribe aquí tus observaciones..."
                    value={value.observaciones}
                    onChange={handleFieldChange('observaciones')}
                />
            </Box>
        </Box>
    );
};

export default EvaluacionInicial;