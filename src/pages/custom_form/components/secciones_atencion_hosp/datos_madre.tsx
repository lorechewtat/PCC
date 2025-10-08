import { useState } from "react";
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
export interface FormsMadreData {
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

interface FormsMadreProps {
  value?: Partial<FormsMadreData>;
  onChange?: (data: Partial<FormsMadreData>) => void;
}

const FormsMadre = ({ value = {}, onChange }: FormsMadreProps) => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  // Estado inicial con valores por defecto
  const [formData, setFormData] = useState<FormsMadreData>({
    semanas_gestacion: "",
    inicio_contracciones: "",
    frecuencia_contracciones: "",
    duracion_contracciones: "",
    hora_nacimiento: "",
    placenta_expulsada: "",
    lugar_nacimiento: "",
    estado_producto: "",
    sexo_producto: "",
    edad_gestacional: "",
    apgar: {
      minuto1: { color: "", fc: "", reflejos: "", tono: "", respiracion: "" },
      minuto5: { color: "", fc: "", reflejos: "", tono: "", respiracion: "" },
      minuto10: { color: "", fc: "", reflejos: "", tono: "", respiracion: "" },
      minuto15: { color: "", fc: "", reflejos: "", tono: "", respiracion: "" },
      minuto20: { color: "", fc: "", reflejos: "", tono: "", respiracion: "" },
    },
    ...value,
  });

  // Actualizar Apgar
  const handleApgarChange = (
    minuto: MinutoKey,
    signo: SignoKey,
    valor: string,
  ) => {
    const newApgar = {
      ...formData.apgar,
      [minuto]: { ...formData.apgar[minuto], [signo]: valor },
    };

    const newData = {
      ...formData,
      apgar: newApgar,
    };

    setFormData(newData);
    onChange?.(newData);
  };

  // Calcular puntaje por minuto
  const calcularPuntaje = (minuto: MinutoKey) => {
    return Object.values(formData.apgar[minuto])
      .map((v) => (v === "" ? 0 : Number(v)))
      .reduce((a, b) => a + b, 0);
  };

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newData = {
      ...formData,
      [name]: value,
    };

    setFormData(newData);
    onChange?.(newData);
  };

  // Manejar cambios en ToggleButtons
  const handleToggleChange = (field: string, value: string) => {
    const newData = {
      ...formData,
      [field]: value,
    };

    setFormData(newData);
    onChange?.(newData);
  };

  // Permitir solo números positivos o vacío
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (value === "" || (!isNaN(Number(value)) && Number(value) >= 0)) {
      const newData = {
        ...formData,
        [name]: value,
      };

      setFormData(newData);
      onChange?.(newData);
    }
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
            value={formData.semanas_gestacion}
            onChange={handleNumberInput}
            fullWidth
            margin="normal"
            required
            variant="standard"
          />

          <TextField
            name="inicio_contracciones"
            label="Inicio de contracciones"
            type="datetime-local"
            value={formData.inicio_contracciones}
            onChange={handleChange}
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
            value={formData.frecuencia_contracciones}
            onChange={handleNumberInput}
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
            value={formData.duracion_contracciones}
            onChange={handleNumberInput}
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
            value={formData.hora_nacimiento}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            variant="standard"
          />

          <TextField
            name="placenta_expulsada"
            label="Hora expulsión placenta"
            type="datetime-local"
            value={formData.placenta_expulsada}
            onChange={handleChange}
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
            value={formData.lugar_nacimiento}
            onChange={handleChange}
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
              value={formData.estado_producto}
              exclusive
              onChange={(e, value) => {
                if (value !== null) {
                  handleToggleChange("estado_producto", value);
                }
              }}
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
              value={formData.sexo_producto}
              exclusive
              onChange={(e, value) => {
                if (value !== null) {
                  handleToggleChange("sexo_producto", value);
                }
              }}
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
            value={formData.edad_gestacional}
            onChange={handleNumberInput}
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
          <Table size="small">
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
                        value={formData.apgar[minuto][signo.key]}
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
        </Box>
      </Box>
    </Box>
  );
};

export default FormsMadre;
