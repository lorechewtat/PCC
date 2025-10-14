import {
  Box,
  TextField,
  Typography,
  useMediaQuery,
  Theme,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Divider,
} from "@mui/material";

// Información que recopila el formulario por vehículo
export interface VehiculoData {
  tipo: string;
  marca: string;
  placas: string;
}

// Información que recopila el formulario en general
export interface DatosLegales {
  dependencia: string;
  num_unidad: string;
  num_oficiales: string;
  vehiculos: VehiculoData[];
}

type Props = {
  value: DatosLegales;
  onChange: (patch: Partial<DatosLegales>) => void;
};

const DatosLegalesSection = ({ value, onChange }: Props) => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  // Manejar cambios en todos los campos de texto principales
  const handleInputChange =
    (field: keyof Omit<DatosLegales, "vehiculos">) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      onChange({ [field]: inputValue });
    };

  // Manejar cambios en los vehículos
  const handleVehiculoChange = (
    index: number,
    field: keyof VehiculoData,
    inputValue: string,
  ) => {
    const newVehiculos = [...value.vehiculos];
    newVehiculos[index] = {
      ...newVehiculos[index],
      [field]: inputValue,
    };

    onChange({ vehiculos: newVehiculos });
  };

  return (
    <Box sx={{ fontFamily: 'Inter', mb: 4 }}>
      <Divider sx={{ my: 5 }} />
      
      <Typography variant="h6" sx={{ mb: 1, mt: 4, ml: 1, color: '#203972' }}>
        DATOS LEGALES
      </Typography>

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
        {/* Sección para las autoridades que tomaron conocimiento */}
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h6" color="primary">
            AUTORIDADES QUE TOMARON CONOCIMIENTO:
          </Typography>
        </Box>

        <Box>
          <TextField
            label="DEPENDENCIA"
            variant="standard"
            fullWidth
            value={value.dependencia}
            onChange={handleInputChange("dependencia")}
            sx={{ mb: 2 }}
          />

          <TextField
            label="NÚMERO DE UNIDAD"
            variant="standard"
            fullWidth
            value={value.num_unidad}
            onChange={handleInputChange("num_unidad")}
            sx={{ mb: 2 }}
          />

          <TextField
            label="NÚMERO DE LOS OFICIALES"
            variant="standard"
            fullWidth
            value={value.num_oficiales}
            onChange={handleInputChange("num_oficiales")}
            sx={{ mb: 2 }}
          />
        </Box>

        {/* Sección para vehículos involucrados */}
        <Box
          display="flex"
          alignItems="center"
          mb={2}
          justifyContent="space-between"
        >
          <Typography variant="h6" color="primary">
            VEHÍCULOS INVOLUCRADOS
          </Typography>
        </Box>

        <Box>
          <Table size="small" sx={{ border: 1, borderColor: "divider" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    border: 1,
                    borderColor: "divider",
                    fontWeight: "bold",
                    width: "50px",
                  }}
                >
                  #
                </TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell
                  sx={{ border: 1, borderColor: "divider", fontWeight: "bold" }}
                >
                  Marca
                </TableCell>
                <TableCell
                  sx={{ border: 1, borderColor: "divider", fontWeight: "bold" }}
                >
                  Placas
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {value.vehiculos.map((vehiculo, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{ border: 1, borderColor: "divider", fontWeight: "bold" }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ border: 1, borderColor: "divider" }}>
                    <TextField
                      size="small"
                      value={vehiculo.tipo}
                      onChange={(e) =>
                        handleVehiculoChange(index, "tipo", e.target.value)
                      }
                      fullWidth
                      variant="standard"
                      sx={{ "& .MuiInputBase-root": { border: "none" } }}
                    />
                  </TableCell>
                  <TableCell sx={{ border: 1, borderColor: "divider" }}>
                    <TextField
                      size="small"
                      value={vehiculo.marca}
                      onChange={(e) =>
                        handleVehiculoChange(index, "marca", e.target.value)
                      }
                      fullWidth
                      variant="standard"
                      sx={{ "& .MuiInputBase-root": { border: "none" } }}
                    />
                  </TableCell>
                  <TableCell sx={{ border: 1, borderColor: "divider" }}>
                    <TextField
                      size="small"
                      value={vehiculo.placas}
                      onChange={(e) =>
                        handleVehiculoChange(index, "placas", e.target.value)
                      }
                      fullWidth
                      variant="standard"
                      sx={{ "& .MuiInputBase-root": { border: "none" } }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Mensaje cuando no hay datos */}
          {value.vehiculos.length === 3 &&
            value.vehiculos.every(vehiculo => 
              !vehiculo.tipo && !vehiculo.marca && !vehiculo.placas
            ) && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, textAlign: "center" }}
              >
                No hay vehículos registrados. Agrega al menos uno.
              </Typography>
            )}
        </Box>
      </Box>
    </Box>
  );
};

export default DatosLegalesSection;