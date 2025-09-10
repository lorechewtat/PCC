import { useNotify, useRedirect, useInput, Title, SimpleForm } from "react-admin";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useGetIdentity } from "react-admin";

// Componente input personalizado con useInput
const EdadInput = (props) => {
  const { field, fieldState } = useInput(props);

  return (
    <TextField
      {...field}
      type="number"
      label={props.label}
      fullWidth
      margin="normal"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      inputProps={{ min: 0, max: 100 }}
    />
  );
};

const MyCustomEdadFormPage = () => {
  const { data, isPending, error } = useGetIdentity();
  const notify = useNotify();
  const redirect = useRedirect();

  if (isPending) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar el usuario</p>;
  if (!data) return null;

  const { fullName } = data;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("Formulario enviado");
      notify("Formulario enviado con éxito", { type: "success" });
      redirect("/");
    } catch (error) {
      notify("Error al enviar el formulario", { type: "error" });
    }
  };

  return (
    <Box p={3}>
      <Title title="Formulario Personalizado" />
      <Box display="flex" alignItems="center" justifyContent="space-between" p={3}>
        <Typography variant="h5" gutterBottom sx={{ color: "primary.main" }}>
          Atención Prehospitalaria {fullName}
        </Typography>
        <Box
          component="img"
          src="/ruta/a/tu/imagen.png"
          alt="Logo"
          sx={{ height: 50 }}
        />
      </Box>

 
      <SimpleForm onSubmit={handleSubmit}>
        <EdadInput
          source="edad"
          label="Edad"
          validate={[
            (value) => {
              if (value === undefined || value === null || value === "") {
                return "La edad es requerida";
              }
              if (value < 0 || value > 100) {
                return "La edad debe estar entre 0 y 100";
              }
              return undefined;
            },
          ]}
        /> 

        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </SimpleForm>
    </Box>
  );
};

export default MyCustomEdadFormPage;
