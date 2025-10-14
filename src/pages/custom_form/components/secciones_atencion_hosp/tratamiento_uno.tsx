import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Divider, Table, 
    TableBody, TableCell, TableContainer, TableRow, Paper, Checkbox} from '@mui/material';
import HealingIcon from '@mui/icons-material/HealingOutlined';

export interface TratamientoUno {
  viaAerea: string[]; 
  controlCervical: string;
  asVentilatoria: string[];
  ltsXMin: string;
}

type Props = {
  value: TratamientoUno;
  onChange: (patch: Partial<TratamientoUno>) => void;
};

const toggleStyle = {
    backgroundColor: '#8E8E8E',
    color: '#f3f3f3',
    width: "180px",
    height: "50px",
    maxWidth: "200px",
    '&.Mui-selected': {
        backgroundColor: 'primary.main',
        color: 'white',
    },
    '&:hover': {
        backgroundColor: '#8E8E8E',
        color: 'white',
    },
};

const TratamientoUnoSection = ({ value, onChange }: Props) => {
    const isMobile = window.innerWidth <= 768;

    const handleViaAereaChange = (newValues: string[]) => {
        onChange({ viaAerea: newValues });
    };

    const handleControlCervicalChange = (newValue: string) => {
        onChange({ controlCervical: newValue });
    };

    const handleAsVentilatoriaChange = (option: string) => {
        const current = value.asVentilatoria;
        const exists = current.includes(option);
        const newValues = exists 
            ? current.filter((v) => v !== option) 
            : [...current, option];
        onChange({ asVentilatoria: newValues });
    };

    const handleLtsXMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ltsXMin: e.target.value });
    };

    return(
        <Box>
            <Divider sx={{ my: 5 }} />
            {/* TITULO SECCION*/}
            <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="h6" color="primary">
                    TRATAMIENTO
                </Typography>
                <HealingIcon sx={{ ml: 1, color: 'primary.main' }} />
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
                    <Typography  color="primary" fontWeight={"bold"} fontSize={16} mb={1} mt ={1}>
                        VÍA AÉREA
                    </Typography>

                    {/* Botones */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: 'wrap',                       
                            justifyContent: 'center',   // opcional, para centrar el contenido
                            gap: 1.5,
                            mb: 2,
                            alignItems: "center",
                        }}
                    >

                        <ToggleButtonGroup
                            value={value.viaAerea}
                            onChange={(e, newValues) => handleViaAereaChange(newValues)}
                            orientation="vertical"
                            sx={{
                                display: "flex",
                                flexDirection: "column", 
                                alignItems: "center",
                                gap: 1.3,
                            }}
                        >
                            <ToggleButton 
                            sx={toggleStyle} value="ASPIRACION">ASPIRACIÓN</ToggleButton>
                            <ToggleButton 
                            sx={toggleStyle} value="CANULA_O">CÁNULA OROFARÍNGEA</ToggleButton>
                        </ToggleButtonGroup>

                        <ToggleButtonGroup
                            value={value.viaAerea}
                            onChange={(e, newValues) => handleViaAereaChange(newValues)}
                            orientation="vertical"
                            sx={{
                                display: "flex",
                                flexDirection: "column", 
                                alignItems: "center",
                                gap:1.3
                            }}
                        >
                            <ToggleButton 
                            sx={toggleStyle} value="CANULA_N">CÁNULA NASOFARÍNGEA</ToggleButton>
                            <ToggleButton 
                            sx={toggleStyle} value="INTUBACION_O">INTUBACIÓN OROTRAQUEAL</ToggleButton>
                        </ToggleButtonGroup>

                        <ToggleButtonGroup
                            value={value.viaAerea}
                            onChange={(e, newValues) => handleViaAereaChange(newValues)}
                            orientation="vertical"
                            sx={{
                                display: "flex",
                                flexDirection: "column", 
                                alignItems: "center",
                                gap:1.3
                            }}
                        >
                            <ToggleButton 
                            sx={toggleStyle} value="COMBITUBO">COMBITUBO</ToggleButton>
                            <ToggleButton 
                            sx={toggleStyle} value="INTUBACION_N">INTUBACIÓN NASOTRAQUEAL</ToggleButton>
                        </ToggleButtonGroup>

                        <ToggleButtonGroup
                            value={value.viaAerea}
                            onChange={(e, newValues) => handleViaAereaChange(newValues)}
                            orientation="vertical"
                            sx={{
                                display: "flex",
                                flexDirection: "column", 
                                alignItems: "center",
                                gap:1.3
                            }}
                        >
                            <ToggleButton 
                            sx={toggleStyle} value="MASCARILLA">MASCARILLA LARINGEA</ToggleButton>
                            <ToggleButton 
                            sx={toggleStyle} value="CRICOTIROIDOTOMIA">CRICOTIROIDOTOMÍA POR PUNCIÓN</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Box>
            
            <Divider sx={{ my: 3 }} />

            {/* CONTROL CERVICAL */}
                <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    mb: 2,
                    alignItems: "center",
                }}
                > 
                <Typography  color="primary" fontWeight={"bold"} fontSize={16} >
                    CONTROL CERVICAL
                </Typography>

                {/* Botones */}
                <ToggleButtonGroup
                    value={value.controlCervical}
                    exclusive
                    onChange={(e, val) => {
                        if (val !== null) handleControlCervicalChange(val);
                    }}
                
                    sx={{
                            display: "flex",
                            flexDirection: "row", 
                            justifyContent: "center",
                            gap: 2,
                            width: "100%"
                        }}
                >
                    <ToggleButton 
                        sx={toggleStyle} value="MANUAL">MANUAL</ToggleButton>
                    <ToggleButton 
                        sx={toggleStyle} value="COLLARIN_R">COLLARÍN RÍGIDO</ToggleButton>
                    <ToggleButton 
                        sx={toggleStyle} value="COLLARIN_B">COLLARÍN BLANDO</ToggleButton>
                </ToggleButtonGroup>

                </Box> 

            <Divider sx={{ my: 3, mt: 5 }} />

                {/* ASISTENCIA VENTILATORIA */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        mb: 3,
                        alignItems: "center",
                    }}
                    >
                    <Typography color="primary" fontWeight="bold" fontSize={16}>
                        ASISTENCIA VENTILATORIA
                    </Typography>

                    <TableContainer
                        component={Paper}
                        sx={{
                        width: isMobile ? "100%" : "600px",
                        border: "2px solid",
                        borderColor: "primary.main",
                        borderRadius: 2,
                        }}
                    >
                        <Table size="medium">
                        <TableBody>
                            {[
                            { left: "BALÓN VÁLVULA MASCARILLA", right: "HEMITORAX DERECHO" },
                            { left: "VÁLVULA DE DEMANDA", right: "HEMITORAX IZQUIERDO" },
                            { left: "HIPERVENTILACIÓN", right: "DECOMPRESIÓN PLEURAL CON AGUA" },
                            { left: "PUNTAS NASALES", right: "MASCARILLA CON RESERVORIO" },
                            { left: "MASCARILLA SIMPLE", right: "MASCARILLA VENTURI" },
                            { left: "VENTILADOR AUTOMÁTICO", right: <TextField
                                                                    placeholder="LTS/MIN"
                                                                    value={value.ltsXMin}
                                                                    onChange={handleLtsXMinChange}
                                                                    variant="standard"
                                                                    size="small"
                                                                    type="number"
                                                                    sx={{ width: '100px' }}
                                                                /> },
                            ].map((row, index) => (
                            <TableRow key={index}>
                                {/* Columna 1: Checkbox izquierdo */}
                                <TableCell align="center" sx={{ width: "10%" }}>
                                <Checkbox
                                    size="small"
                                    color="primary"
                                    checked={value.asVentilatoria.includes(row.left)}
                                    onChange={() => handleAsVentilatoriaChange(row.left)}
                                />
                                </TableCell>

                                {/* Columna 2: Texto izquierdo */}
                                <TableCell sx={{ width: "40%" }}>
                                <Typography fontSize={14}>{row.left}</Typography>
                                </TableCell>

                                {/* Columna 3: Checkbox derecho */}
                                <TableCell align="center" sx={{ width: "10%" }}>
                                <Checkbox
                                    size="small"
                                    color="primary"
                                    checked={value.asVentilatoria.includes(typeof row.right === 'string' ? row.right : 'LTS_MIN')}
                                    onChange={() => handleAsVentilatoriaChange(typeof row.right === 'string' ? row.right : 'LTS_MIN')}
                                />
                                </TableCell>

                                {/* Columna 4: Texto derecho */}
                                <TableCell sx={{ width: "40%" }}>
                                {typeof row.right === 'string' ? (
                                    <Typography fontSize={14}>{row.right}</Typography>
                                ) : (
                                    row.right
                                )}
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    );
};

export default TratamientoUnoSection;