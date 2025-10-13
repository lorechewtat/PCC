import { Divider, Box, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Typography, useMediaQuery, Theme } from '@mui/material';
import { TextInput, SimpleForm, NumberInput, RadioButtonGroupInput } from 'react-admin';
import { Icon } from '@iconify/react';
import DirectionsBusFilledOutlinedIcon from '@mui/icons-material/DirectionsBusFilledOutlined';

// Reusable Row Component
const VitalSignsRow = ({ rowIndex }: { rowIndex: number }) => {
    return (
        <TableRow >
            <TableCell>
                <TextInput source={`hora_${rowIndex}`} label="" type="time" variant="standard" fullWidth />
            </TableCell>
            <TableCell>
                <NumberInput source={`fr_${rowIndex}`} label="" variant="standard" fullWidth />
            </TableCell>
            <TableCell>
                <NumberInput source={`fc_${rowIndex}`} label="" variant="standard" fullWidth />
            </TableCell>
            <TableCell>
                <NumberInput source={`tas_${rowIndex}`} label="" variant="standard" fullWidth />
            </TableCell>
            <TableCell>
                <NumberInput source={`tad_${rowIndex}`} label="" variant="standard" fullWidth />
            </TableCell>
            <TableCell>
                <NumberInput source={`sao2_${rowIndex}`} label="" variant="standard" fullWidth />
            </TableCell>
            <TableCell>
                <NumberInput source={`temp_${rowIndex}`} label="" variant="standard" fullWidth />
            </TableCell>
            <TableCell>
                <NumberInput source={`gluc_${rowIndex}`} label="" variant="standard" fullWidth />
            </TableCell>
            <TableCell
                sx={{
                    // don't force column on the cell
                    display: 'table-cell',
                    // or: display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}
            >
                <RadioButtonGroupInput
                    source={`neurotest_${rowIndex}`}
                    label=""
                    choices={[
                        { id: 'A', name: 'A' },
                        { id: 'V', name: 'V' },
                        { id: 'D', name: 'D' },
                        { id: 'I', name: 'I' },
                    ]}
                    variant="standard"
                    row
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        '& .MuiTypography-root': {
                            fontSize: '0.75rem', 
                            lineHeight: 1,     
                        },
                        '& .MuiRadio-root': {
                            padding: 0,       
                            transform: 'scale(0.75)',
                        },
                    }}
                />
            </TableCell>
        </TableRow>
    );
};

const EvaluacionSecTraslado = () => {
    const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

    return (
        <SimpleForm toolbar={false}>
            <Typography variant="h6" sx={{ mb: 2, mt: 4, ml: 1, color: '#203972' }}>
                EVALUACIÓN SECUNDARIA
                <Icon icon="streamline-ultimate:paper-write" style={{ fontSize: '1.5rem', marginLeft: '8px' }} />
            </Typography>
            <Box sx={{
                border: 2,
                borderColor: "primary.main",
                borderRadius: 2,
                p: 2,
                mb: 3,
                width: isSmall ? "34%" : "850px",
            }}>
                <Box display="flex" mb={2}>
                    <Typography variant="h6" color="primary">
                        SIGNOS VITALES Y MONITOREO
                        <Icon icon="mdi:heart-pulse" style={{ fontSize: '1.5rem', marginLeft: '8px' }} />
                    </Typography>
                </Box>

                <Box>
                    <TableContainer component={Paper}
                            sx={{
                                width: '100%',
                                overflowX: 'auto',           //habilita scroll horizontal en pantallas chicas
                                borderRadius: 2,
                                boxShadow: 'none',
                            }}>
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
                            <TableRow sx={{ color: 'grey' }}>
                                <TableCell>HORA</TableCell>
                                <TableCell>FR</TableCell>
                                <TableCell>FC</TableCell>
                                <TableCell>TAS</TableCell>
                                <TableCell>TAD</TableCell>
                                <TableCell>SaO2</TableCell>
                                <TableCell>TEMP</TableCell>
                                <TableCell>GLUC</TableCell>
                                <TableCell>NEUROTEST</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <VitalSignsRow rowIndex={1} />
                            <VitalSignsRow rowIndex={2} />
                            <VitalSignsRow rowIndex={3} />
                        </TableBody>
                    </Table>

                    </TableContainer>
                </Box>

                <Divider sx={{ my: 4, color: '#203972' }} />

                {/* GLASGOW */}
                <Box>
                    <Typography variant="h6" color="primary">
                        GLASGOW
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    <Box mt={2} sx={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', gap: 2 }}>
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
                                <TableRow sx={{ color: 'grey' }}>
                                    <TableCell>APERTURA OCULAR</TableCell>
                                    <TableCell>RESPUESTA MOTORA</TableCell>
                                    <TableCell>RESPUESTA VERBAL</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="textSecondary">
                                                Espontánea
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                4
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="textSecondary">
                                                A la voz
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                3
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="textSecondary">
                                                Al dolor
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                2
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="textSecondary">
                                                Ninguna
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                1
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="textSecondary">
                                                Espontánea, normal
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                6
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="textSecondary">
                                                Localiza al tacto
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                5
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="textSecondary">
                                                Localiza al dolor
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                4
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="textSecondary">
                                                Decorticación
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                3
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="textSecondary">
                                                Descerebración
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                2
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="textSecondary">
                                                Ninguna
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                1
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="textSecondary">
                                                Orientada
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                5
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="textSecondary">
                                                Confusa
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                4
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="textSecondary">
                                                Palabras inapropiadas
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                3
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="textSecondary">
                                                Sonidos incomprensibles
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                2
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="textSecondary">
                                                Ninguna
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                1
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        </TableContainer>
                        
                        
                    </Box>
                    <NumberInput source="glasgow_total" label="GLASGOW TOTAL" variant="standard" fullWidth sx={{ maxWidth: '150px', alignSelf: 'center' }} />
                </Box>

                {/* CAMPOS ABIERTOS */}
                <Box mt={1} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextInput source="alergias" label="ALERGIAS" variant="standard" fullWidth />
                    <TextInput source="medicamentos" label="MEDICAMENTOS QUE ESTA INGIRIENDO" variant="standard" fullWidth />
                    <TextInput source="padecimientos" label="PADECIMIENTOS-CIRUGIAS" variant="standard" fullWidth />
                    <TextInput source="ultimac" label="LA ÚLTIMA COMIDA" variant="standard" fullWidth />
                    <TextInput source="eventosp" label="EVENTOS PREVIOS" variant="standard" fullWidth />
                </Box>

                {/* CONDICIÓN Y PRIORIDAD */}
                <Box mt={1} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', gap: 2 }}>
                        <Table size="small" >
                            <TableHead>
                                <TableRow sx={{ color: 'grey' }}>
                                    <TableCell>CONDICIÓN DEL PACIENTE</TableCell>
                                    <TableCell>PRIORIDAD</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell >
                                        <RadioButtonGroupInput
                                            source="condicion_paciente1"
                                            label=""
                                            choices={[
                                                { id: 'critico', name: '1 - Crítico' },
                                                { id: 'no_critico', name: '2 - No Crítico' },
                                            ]}
                                            sx={{ display: 'flex', flexDirection: 'column', marginBottom: -2 }}
                                        />
                                        <RadioButtonGroupInput
                                            source="condicion_paciente2"
                                            label=""
                                            choices={[
                                                { id: 'estable', name: '1 - Estable' },
                                                { id: 'inestable', name: '2 - Inestable' },
                                            ]}
                                            sx={{ display: 'flex', flexDirection: 'column' }}
                                        />
                                    </TableCell>
                                    <TableCell >
                                        <RadioButtonGroupInput
                                            source="prioridad"
                                            label=""
                                            choices={[
                                                { id: 'rojo', name: '1 - Rojo' },
                                                { id: 'amarillo', name: '2 - Amarillo' },
                                                { id: 'verde', name: '3 - Verde' },
                                                { id: 'negro', name: '4 - Negro' }
                                            ]}
                                            sx={{ display: 'flex', flexDirection: 'column' }}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
            </Box>

            {/*TRASLADO*/}
            <Box>
                <Box display="flex" alignItems="center">
                    <Typography variant="h6" sx={{ mb: 2, mt: 4, ml: 1, color: '#203972' }}>
                        TRASLADO
                    </Typography>
                    <DirectionsBusFilledOutlinedIcon sx={{ mb: 2, mt: 3, ml: 0.5, color: 'primary.main' }} />
                </Box>
                <Box sx={{
                    border: 2,
                    borderColor: "primary.main",
                    borderRadius: 2,
                    p: 2,
                    mb: 3,
                    width: isSmall ? "56%" : "850px",
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" color="primary">
                            INSTITUCIÓN A LA QUE SE TRASLADA EL PACIENTE
                        </Typography>
                        <TextInput source="hospital" label="HOSPITAL" variant="standard" fullWidth />
                        <TextInput source="doctor" label="DOCTOR" variant="standard" fullWidth />
                        <TextInput source="folio_cru" label="FOLIO CRU" variant="standard" fullWidth />
                    </Box>
                </Box>
            </Box>
        </SimpleForm>
    );
};

export default EvaluacionSecTraslado;