// MyCustomFormPage.tsx
import { useNotify, useRedirect, Title } from 'react-admin';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useGetIdentity, useLogout } from 'react-admin';


import HeaderAtencionPrehospitalaria from './components/hea_form';
import DatosPacienteSection, { DatosPaciente } from './components/custom_form_vale.tsx';

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
   // Estado local del contenedor para la sección
  const [datosPaciente, setDatosPaciente] = useState<DatosPaciente>({
    nombre: '',
    sexo: '',
    edadAnios: '',
    edadMeses: '',
    domicilio: '',
    colonia: '',
    alcaldia: '',
    derechohabiente: '',
    telefono: '',
    ocupacion: '',
  });

  const handlePacientePatch = (patch: Partial<DatosPaciente>) =>
    setDatosPaciente(prev => ({ ...prev, ...patch }));

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

        <HeaderAtencionPrehospitalaria />
        <DatosPacienteSection value={datosPaciente} onChange={handlePacientePatch} />

    </Box>



  );


};


export default MyCustomFormPage;