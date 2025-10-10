import { useState } from "react";
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
export interface DatosLegalesData {
  dependencia: string;
  num_unidad: string;
  num_oficiales: string;
  vehiculos: VehiculoData[];
}

interface DatosLegalesProps {
  value?: Partial<DatosLegalesData>;
  onChange?: (data: Partial<DatosLegalesData>) => void;
}

const FormsDatosLegales = ({ value = {}, onChange }: DatosLegalesProps) => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  // Estado inicial con valores por defecto
  // 3 campos para los vehículos por default
  const [formData, setFormData] = useState<DatosLegalesData>({
    dependencia: "",
    num_unidad: "",
    num_oficiales: "",
    vehiculos: [
      { tipo: "", marca: "", placas: "" },
      { tipo: "", marca: "", placas: "" },
      { tipo: "", marca: "", placas: "" },
    ],
    ...value,
  });

  // Estados de error
  const [errors, setErrors] = useState({
    dependencia: false,
    num_unidad: false,
    num_oficiales: false,
  });

  // Manejar cambios en todos los campos de texto principales
  const handleInputChange =
    (field: keyof Omit<DatosLegalesData, "vehiculos">) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const newData = {
        ...formData,
        [field]: value,
      };

      setFormData(newData);

      // Validación
      if (field in errors) {
        setErrors((prev) => ({
          ...prev,
          [field]: !value,
        }));
      }

      onChange?.(newData);
    };

  // Manejar cambios en los vehículos
  const handleVehiculoChange = (
    index: number,
    field: keyof VehiculoData,
    value: string,
  ) => {
    const newVehiculos = [...formData.vehiculos];
    newVehiculos[index] = {
      ...newVehiculos[index],
      [field]: value,
    };

    const newData = {
      ...formData,
      vehiculos: newVehiculos,
    };

    setFormData(newData);
    onChange?.(newData);
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
      {/* Sección para las autoridades que tomaron conocimiento */}
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h6" color="primary">
          AUTORIDADES QUE TOMARON CONOCIMIENTO:
        </Typography>
      </Box>

      <Box>
        <TextField
          label="DEPENDENCIA *"
          variant="standard"
          fullWidth
          value={formData.dependencia}
          onChange={handleInputChange("dependencia")}
          error={errors.dependencia}
          helperText={errors.dependencia ? "Este campo es requerido" : ""}
          sx={{ mb: 2 }}
        />

        <TextField
          label="NÚMERO DE UNIDAD *"
          variant="standard"
          fullWidth
          value={formData.num_unidad}
          onChange={handleInputChange("num_unidad")}
          error={errors.num_unidad}
          helperText={errors.num_unidad ? "Este campo es requerido" : ""}
          sx={{ mb: 2 }}
        />

        <TextField
          label="NÚMERO DE LOS OFICIALES *"
          variant="standard"
          fullWidth
          value={formData.num_oficiales}
          onChange={handleInputChange("num_oficiales")}
          error={errors.num_oficiales}
          helperText={errors.num_oficiales ? "Este campo es requerido" : ""}
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
            {formData.vehiculos.map((vehiculo, index) => (
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
        {formData.vehiculos.length === 1 &&
          !formData.vehiculos[0].tipo &&
          !formData.vehiculos[0].marca &&
          !formData.vehiculos[0].placas && (
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
  );
};

export default FormsDatosLegales;
