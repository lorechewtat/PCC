// MyCustomFormPage.tsx
import { useNotify, useRedirect, Title } from 'react-admin';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useGetIdentity, useLogout } from 'react-admin';


const MyCustomFormPage = () => {
//USO DE GETIDENTITY() DARIO
 const { data, isPending, error } = useGetIdentity();

 const logout = useLogout();

    if (isPending) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar el usuario</p>;
    if (!data) return null;
 
  const [inputValue, setInputValue] = useState('');
    const { id, fullName, avatar } = data;
    useEffect(() => {
    if (fullName && inputValue === '') {
        setInputValue(fullName);
    }
}, [fullName, inputValue]);
//USO DE GETIDENTITY() DARIO


  const notify = useNotify();
  const redirect = useRedirect();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
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
    Atención Prehospitalaria
  </Typography>

  {/* Imagen a la derecha */}
  <Box component="img"
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
        <Box>
        <Button
          color="primary"
          onClick={() => logout()}
          sx={{border: "20px", display: "flex",justifyContent: "flex-end", alignItems: "flex-end",}}
        >
          Cerrar sesión
        </Button>
        </Box>
      </form>
    </Box>



  );


};


export default MyCustomFormPage;
