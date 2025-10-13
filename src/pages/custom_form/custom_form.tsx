// MyCustomFormPage.tsx
import { useNotify, useRedirect, Title } from "react-admin";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetIdentity, useLogout } from "react-admin";
import * as SeccionesAtencionHosp from "./components/secciones_atencion_hosp";
import { DatosPaciente } from "./components/secciones_atencion_hosp/datos_paciente";


const MyCustomFormPage = () => {
  //USO DE GETIDENTITY() DARIO
  const { data, isPending, error } = useGetIdentity();

  const logout = useLogout();

  if (isPending) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar el usuario</p>;
  if (!data) return null;

  const [inputValue, setInputValue] = useState("");
  const { id, fullName, avatar } = data;
  useEffect(() => {
    if (fullName && inputValue === "") {
      setInputValue(fullName);
    }
  }, [fullName, inputValue]);
  //USO DE GETIDENTITY() DARIO

  const notify = useNotify();
  const redirect = useRedirect();
  // Estado local del contenedor para la sección

  //TODO: VALE MODIFICAR ESTO, PARA QUE SE QUEDE EN EL ARCHIVO AL QUE CORRESPONDE Y ESTE QUEDE LIMPIO
  const [datosPaciente, setDatosPaciente] = useState<DatosPaciente>({
    nombre: "",
    sexo: "",
    edadAnios: "",
    edadMeses: "",
    domicilio: "",
    colonia: "",
    alcaldia: "",
    derechohabiente: "",
    telefono: "",
    ocupacion: "",
  });
//TODO: VALE MODIFICAR ESTO, PARA QUE SE QUEDE EN EL ARCHIVO AL QUE CORRESPONDE Y ESTE QUEDE LIMPIO
  const handlePacientePatch = (patch: Partial<DatosPaciente>) =>
    setDatosPaciente((prev) => ({ ...prev, ...patch }));

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      // Aquí haces tu lógica para guardar el formulario
      // Puede ser una llamada a tu dataProvider o a tu propia API
      console.log("Formulario enviado:", inputValue);

      notify("Formulario enviado con éxito", { type: "success" });
      redirect("/"); // Redirige donde quieras
    } catch (error) {
      notify("Error al enviar el formulario", { type: "error" });
    }
  };

  return (
    <Box p={3}>
      <Title title="Formulario Personalizado " />
      <SeccionesAtencionHosp.HeaderAtencionPrehospitalaria />
      <SeccionesAtencionHosp.MotivoAtencionPrehospitalaria />
      <SeccionesAtencionHosp.DatosTraslado />
      <SeccionesAtencionHosp.DatosPacienteSection
        value={datosPaciente}
        onChange={handlePacientePatch} />
      <SeccionesAtencionHosp.FormsMadre />
      <SeccionesAtencionHosp.OpcionesAccidente />
      <SeccionesAtencionHosp.FormsCausaClinica />
      <SeccionesAtencionHosp.EvaluacionInicial />
      <SeccionesAtencionHosp.HeatmapBody />
      <SeccionesAtencionHosp.EvaluacionSecTraslado />
      <SeccionesAtencionHosp.TratamientoUno />
      <SeccionesAtencionHosp.TratamientoP2 />
     
      <SeccionesAtencionHosp.FormsDatosLegales />
             
    </Box>
  );
};

export default MyCustomFormPage;



