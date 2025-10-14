import {
  Box,
  TextField,
  Typography,
  Divider,
  useMediaQuery,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper
} from "@mui/material";
import PregnantWomanIcon from "@mui/icons-material/PregnantWoman";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";

// Definiciones de tipos
interface ApgarMinuto {
  color: string;
  fc: string;
  reflejos: string;
  tono: string;
  respiracion: string;
}

interface ApgarState {
  minuto1: ApgarMinuto;
  minuto5: ApgarMinuto;
  minuto10: ApgarMinuto;
  minuto15: ApgarMinuto;
  minuto20: ApgarMinuto;
}

// Información que recopila el formulario
export interface DatosMadre {
  semanas_gestacion: string;
  inicio_contracciones: string;
  frecuencia_contracciones: string;
  duracion_contracciones: string;
  hora_nacimiento: string;
  placenta_expulsada: string;
  lugar_nacimiento: string;
  estado_producto: string;
  sexo_producto: string;
  edad_gestacional: string;
  apgar: ApgarState;
}

type MinutoKey = keyof ApgarState;
type SignoKey = keyof ApgarMinuto;

interface Props {
  value: DatosMadre;
  onChange: (patch: Partial<DatosMadre>) => void;
}

const FormsMadre = ({ value, onChange }: Props) => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  // Handler para cambios en campos simples
  const handleMadreChange = 
    (field: keyof DatosMadre) => 
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldValue = e.target.value;
        onChange({ [field]: fieldValue } as Partial<DatosMadre>);
      };

  // Handler para campos numéricos
  const handleNumberInput = (field: keyof DatosMadre) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fieldValue = e.target.value;
      if (fieldValue === "" || (!isNaN(Number(fieldValue)) && Number(fieldValue) >= 0)) {
        onChange({ [field]: fieldValue } as Partial<DatosMadre>);
      }
    };

  // Handler para ToggleButtons
  const handleToggleChange = (field: keyof DatosMadre) => 
    (e: React.MouseEvent<HTMLElement>, newValue: string | null) => {
      if (newValue !== null) {
        onChange({ [field]: newValue } as Partial<DatosMadre>);
      }
    };

  // Actualizar Apgar
  const handleApgarChange = (
    minuto: MinutoKey,
    signo: SignoKey,
    valor: string,
  ) => {
    const newApgar = {
      ...value.apgar,
      [minuto]: { ...value.apgar[minuto], [signo]: valor },
    };

    onChange({ apgar: newApgar });
  };

  // Calcular puntaje por minuto
  const calcularPuntaje = (minuto: MinutoKey) => {
    return Object.values(value.apgar[minuto])
      .map((v) => (v === "" ? 0 : Number(v)))
      .reduce((a, b) => a + b, 0);
  };

  // Arrays tipados para el mapeo
  const minutos: MinutoKey[] = [
    "minuto1",
    "minuto5",
    "minuto10",
    "minuto15",
    "minuto20",
  ];

  const signosApgar: {
    key: SignoKey;
    label: string;
    descripciones: string[];
  }[] = [
    {
      key: "color",
      label: "Color",
      descripciones: [
        "0 = Azul/pálido",
        "1 = Acrocianosis",
        "2 = Rosado completamente",
      ],
    },
    {
      key: "fc",
      label: "Frecuencia cardiaca",
      descripciones: ["0 = Ausente", "1 = <100 lpm", "2 = ≥100 lpm"],
    },
    {
      key: "reflejos",
      label: "Reflejos",
      descripciones: ["0 = Sin respuesta", "1 = Muecas", "2 = Llora/retira"],
    },
    {
      key: "tono",
      label: "Tono muscular",
      descripciones: [
        "0 = Flácido",
        "1 = Alguna flexión",
        "2 = Movimientos activos",
      ],
    },
    {
      key: "respiracion",
      label: "Respiración",
      descripciones: ["0 = Ausente", "1 = Lenta/irregular", "2 = Buena/Llora"],
    },
  ];

  return (
    <Box>
      {/* Sección para rellenar los datos de la madre */}
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h6" color="primary">
          DATOS DE LA MADRE
        </Typography>
        <PregnantWomanIcon sx={{ mr: 1, color: "primary.main" }} />
      </Box>

      <Box
        sx={{
          border: 2,
          borderColor: "primary.main",
          borderRadius: 2,
          p: 2,
          mb: 3,
          width: isSmall ? "100%" : "850px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isSmall ? "column" : "row",
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            name="semanas_gestacion"
            label="Semanas de gestación"
            type="number"
            value={value.semanas_gestacion}
            onChange={handleNumberInput('semanas_gestacion')}
            fullWidth
            margin="normal"
            required
            variant="standard"
          />

          <TextField
            name="inicio_contracciones"
            label="Inicio de contracciones"
            type="datetime-local"
            value={value.inicio_contracciones}
            onChange={handleMadreChange('inicio_contracciones')}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            variant="standard"
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: isSmall ? "column" : "row",
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            name="frecuencia_contracciones"
            label="Frecuencia contracciones (min)"
            type="number"
            value={value.frecuencia_contracciones}
            onChange={handleNumberInput('frecuencia_contracciones')}
            fullWidth
            margin="normal"
            inputProps={{ min: "0", step: "0.5" }}
            helperText="Minutos entre contracciones"
            variant="standard"
          />

          <TextField
            name="duracion_contracciones"
            label="Duración contracciones (seg)"
            type="number"
            value={value.duracion_contracciones}
            onChange={handleNumberInput('duracion_contracciones')}
            fullWidth
            margin="normal"
            inputProps={{ min: "0", max: "120" }}
            helperText="Segundos de duración"
            variant="standard"
          />
        </Box>

        <Divider sx={{ my: 5 }} />
        {/* Sección para rellenar los datos post-parto y recién nacido */}

        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h6" color="primary">
            DATOS POST-PARTO Y RECIÉN NACIDO
          </Typography>
          <BabyChangingStationIcon sx={{ mr: 1, color: "primary.main" }} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: isSmall ? "column" : "row",
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            name="hora_nacimiento"
            label="Hora de nacimiento"
            type="datetime-local"
            value={value.hora_nacimiento}
            onChange={handleMadreChange('hora_nacimiento')}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            variant="standard"
          />

          <TextField
            name="placenta_expulsada"
            label="Hora expulsión placenta"
            type="datetime-local"
            value={value.placenta_expulsada}
            onChange={handleMadreChange('placenta_expulsada')}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            variant="standard"
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            name="lugar_nacimiento"
            label="Lugar de nacimiento"
            value={value.lugar_nacimiento}
            onChange={handleMadreChange('lugar_nacimiento')}
            fullWidth
            margin="normal"
            variant="standard"
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: isSmall ? "column" : "row",
            gap: 3,
            mb: 2,
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Producto:
            </Typography>
            <ToggleButtonGroup
              value={value.estado_producto}
              exclusive
              onChange={handleToggleChange('estado_producto')}
            >
              <ToggleButton
                value="0"
                sx={{
                  px: 3,
                  backgroundColor: "#8E8E8E",
                  color: "#f3f3f3",
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                  "&:hover": {
                    backgroundColor: "#8E8E8E",
                    color: "white",
                  },
                }}
              >
                VIVO
              </ToggleButton>
              <ToggleButton
                value="1"
                sx={{
                  px: 3,
                  backgroundColor: "#8E8E8E",
                  color: "#f3f3f3",
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                  "&:hover": {
                    backgroundColor: "#8E8E8E",
                    color: "white",
                  },
                }}
              >
                MUERTO
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Sexo:
            </Typography>
            <ToggleButtonGroup
              value={value.sexo_producto}
              exclusive
              onChange={handleToggleChange('sexo_producto')}
            >
              <ToggleButton
                value="0"
                sx={{
                  px: 3,
                  backgroundColor: "#8E8E8E",
                  color: "#f3f3f3",
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                  "&:hover": {
                    backgroundColor: "#8E8E8E",
                    color: "white",
                  },
                }}
              >
                Masculino
              </ToggleButton>
              <ToggleButton
                value="1"
                sx={{
                  px: 3,
                  backgroundColor: "#8E8E8E",
                  color: "#f3f3f3",
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                  "&:hover": {
                    backgroundColor: "#8E8E8E",
                    color: "white",
                  },
                }}
              >
                Femenino
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <TextField
            name="edad_gestacional"
            label="Edad gestacional"
            type="number"
            value={value.edad_gestacional}
            onChange={handleNumberInput('edad_gestacional')}
            margin="normal"
            variant="standard"
            sx={{ minWidth: 150 }}
          />
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Sección Puntaje de Apgar */}
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h6" color="primary">
            PUNTAJE DE APGAR
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
            minWidth: 500,            // fuerza “ancho mínimo” para que aparezca scroll si no cabe
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
              <TableRow>
                <TableCell>Signo</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell align="center">1 min</TableCell>
                <TableCell align="center">5 min</TableCell>
                <TableCell align="center">10 min</TableCell>
                <TableCell align="center">15 min</TableCell>
                <TableCell align="center">20 min</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {signosApgar.map((signo) => (
                <TableRow key={signo.key}>
                  <TableCell>{signo.label}</TableCell>
                  <TableCell>
                    {signo.descripciones.map((d, i) => (
                      <Typography key={i} variant="body2">
                        {d}
                      </Typography>
                    ))}
                  </TableCell>
                  {minutos.map((minuto) => (
                    <TableCell key={minuto} align="center">
                      <TextField
                        select
                        size="small"
                        value={value.apgar[minuto][signo.key]}
                        onChange={(e) =>
                          handleApgarChange(minuto, signo.key, e.target.value)
                        }
                        SelectProps={{ native: true }}
                        variant="standard"
                      >
                        <option value="">-</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </TextField>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
                  Total
                </TableCell>
                {minutos.map((minuto) => (
                  <TableCell
                    key={minuto}
                    align="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    {calcularPuntaje(minuto)}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
          </TableContainer>
          
        </Box>
      </Box>
    </Box>
  );
};

export default FormsMadre;