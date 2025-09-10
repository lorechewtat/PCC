// MyCustomFormPage.tsx
import { useNotify, useRedirect, useInput, Title } from 'react-admin';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useGetIdentity } from 'react-admin';

const MyEdadFormPage = () => {
  const { data, isPending, error } = useGetIdentity()
  if (isPending) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar el usuario</p>;
  if (!data) return null;

  /*
  const edadInput = (props) => {
    const { field, fieldState } = useInput(props);
    // aquí deberías retornar un <TextField /> si lo vas a usar
  };
  */

  const { id, fullName, avatar } = data;

  const [inputValue, setInputValue] = useState('');
  const notify = useNotify();
  const redirect = useRedirect();
  const name = fullName;

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      // Aquí haces tu lógica para guardar el formulario
      // Puede ser una llamada a tu dataProvider o a tu propia API
      console.log('Formulario enviado:', inputValue);

      notify('Formulario enviado con éxito', { type: 'success' });
      redirect('/'); // Redirige donde quieras
    } catch (error) {
      notify('Error al enviar el formulario', { type: 'error' });
    }
  };

  return (
    <Box p={3}>
      <Title title="Formulario Personalizado " />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={3}
      >
        {/* Texto a la izquierda */}
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: 'primary.main' }}
        >
          Atención Prehospitalaria {name} s
        </Typography>

        {/* Imagen a la derecha */}
        <Box
          component="img"
          src="/ruta/a/tu/imagen.png" // Cambia esto por tu imagen real
          alt="Logo"
          sx={{ height: 50 }} // Ajusta el tamaño como quieras
        />
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Edad"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>
    </Box>
  );
};

export default MyEdadFormPage;
