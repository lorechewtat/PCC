import {
  Box,
  TextField,
  Typography,
  useMediaQuery,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

export type CausaClinica = {
  origen: string;
  especificacion: string;
  primeravez: string;
  subsecuente: string;
};

type Props = {
  value: CausaClinica;
  onChange: (patch: Partial<CausaClinica>) => void;
};

const FormsCausaClinica = ({ value, onChange }: Props) => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const handleFieldChange = (field: keyof CausaClinica) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ [field]: e.target.value } as Partial<CausaClinica>);
    };

  const handleOrigenChange = (newValue: string | null) => {
    if (newValue !== null) {
      onChange({ origen: newValue } as Partial<CausaClinica>);
    }
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
        width: isSmall ? "100%" : "850px",
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h6" color="primary">
          ORIGEN PROBABLE
        </Typography>
      </Box>

      <Box sx={{ width: "100%" }}>
        <ToggleButtonGroup
          value={value.origen}
          exclusive
          onChange={(_, v) => handleOrigenChange(v)}
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
          value={value.especificacion}
          onChange={handleFieldChange('especificacion')}
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
            value={value.primeravez}
            onChange={handleFieldChange('primeravez')}
            sx={{ mb: 2 }}
          />

          <TextField
            label="SUBSECUENTE"
            variant="standard"
            fullWidth
            value={value.subsecuente}
            onChange={handleFieldChange('subsecuente')}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FormsCausaClinica;