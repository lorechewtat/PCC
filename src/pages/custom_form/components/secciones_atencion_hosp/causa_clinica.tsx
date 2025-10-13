import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  useMediaQuery,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

// Información que recopila el formulario
export interface CausaClinicaData {
  origen: string;
  especificacion: string;
  primeravez: string;
  subsecuente: string;
}

interface CausaClinicaProps {
  value?: Partial<CausaClinicaData>;
  onChange?: (data: Partial<CausaClinicaData>) => void;
}

const FormsCausaClinica = ({ value = {}, onChange }: CausaClinicaProps) => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  // Estado inicial con valores por defecto
  const [formData, setFormData] = useState<CausaClinicaData>({
    origen: "",
    especificacion: "",
    primeravez: "",
    subsecuente: "",
    ...value,
  });

  // Estado local para el ToggleButtonGroup
  // FIX THIS
  const [origen, setOrigen] = useState<string | null>(null);

  // Estados de error
  const [errors, setErrors] = useState({
    origen: false,
    especificacion: false,
  });

  // Manejar cambios en ToggleButtons
  const handleToggleChange = (value: string | null) => {
    setOrigen(value);
    setErrors((prev) => ({ ...prev, origen: !value }));

    const newData = {
      ...formData,
      origen: value || "",
    };

    setFormData(newData);
    onChange?.(newData);
  };

  // Manejar cambios en todos los campos de texto
  const handleInputChange =
    (field: keyof CausaClinicaData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const newData = {
        ...formData,
        [field]: value,
      };

      setFormData(newData);

      // Especificación es obligatorio
      if (field === "especificacion") {
        setErrors((prev) => ({ ...prev, especificacion: !value }));
      }

      onChange?.(newData);
    };

  const toggleButtonStyle = {
    backgroundColor: "#8E8E8E",
    color: "#f3f3f3",
    padding: "8px 12px",
    "&.Mui-selected": {
      backgroundColor: "primary.main",
      color: "white",
      borderColor: "primary.main",
    },
    "&:hover": {
      backgroundColor: "#8E8E8E",
      color: "white",
      borderColor: "#8E8E8E",
      cursor: "pointer",
    },
  };

  return (
    <Box
      sx={{
        border: 2,
        borderColor: "primary.main",
        borderRadius: 2,
        p: 2,
        mb: 3,
        width: isSmall ? "34%" : "850px",
      }}
    >
      {/* Sección para el origen probable */}

      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h6" color="primary">
          ORIGEN PROBABLE
        </Typography>
      </Box>

      <Box sx={{ width: "100%" }}>
        <ToggleButtonGroup
          value={origen}
          exclusive
          onChange={(_, value) => handleToggleChange(value)}
          sx={{
            display: "grid",
            gridTemplateColumns: isSmall ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: 1,
            mb: 2,
            "& .MuiToggleButton-root": {
              borderRadius: 2,
              border: "1px solid #ccc !important",
              padding: "6px 8px",
              fontSize: "0.8rem",
            },
          }}
        >
          <ToggleButton sx={toggleButtonStyle} value="Neurologica">
            Neurológica
          </ToggleButton>
          <ToggleButton sx={toggleButtonStyle} value="Infecciosa">
            Infecciosa
          </ToggleButton>
          <ToggleButton sx={toggleButtonStyle} value="Músculo esquelético">
            Músculo esquelético
          </ToggleButton>
          <ToggleButton sx={toggleButtonStyle} value="Urogenital">
            Urogenital
          </ToggleButton>
          <ToggleButton sx={toggleButtonStyle} value="Digestiva">
            Digestiva
          </ToggleButton>
          <ToggleButton sx={toggleButtonStyle} value="Cardiovascular">
            Cardiovascular
          </ToggleButton>
          <ToggleButton sx={toggleButtonStyle} value="Oncológico">
            Oncológico
          </ToggleButton>
          <ToggleButton sx={toggleButtonStyle} value="Metabólico">
            Metabólico
          </ToggleButton>
          <ToggleButton sx={toggleButtonStyle} value="Ginecoobtetrica">
            Ginecoobtetrica
          </ToggleButton>
          <ToggleButton sx={toggleButtonStyle} value="Respiratorio">
            Respiratorio
          </ToggleButton>
          <ToggleButton sx={toggleButtonStyle} value="Otro">
            Otro
          </ToggleButton>
          <ToggleButton sx={toggleButtonStyle} value="Cognitivo emocional">
            Cognitivo emocional
          </ToggleButton>
        </ToggleButtonGroup>

        <TextField
          label="ESPECIFÍQUE"
          variant="standard"
          fullWidth
          required
          value={formData.especificacion}
          onChange={handleInputChange("especificacion")}
          error={errors.especificacion}
          sx={{ mb: 2 }}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1,
            mb: 2,
          }}
        >
          <TextField
            label="PRIMERA VEZ"
            variant="standard"
            fullWidth
            value={formData.primeravez}
            onChange={handleInputChange("primeravez")}
            sx={{ mb: 2 }}
          />

          <TextField
            label="SUBSECUENTE"
            variant="standard"
            fullWidth
            value={formData.subsecuente}
            onChange={handleInputChange("subsecuente")}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FormsCausaClinica;
