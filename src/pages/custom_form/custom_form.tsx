// MyCustomFormPage.tsx
import { useNotify, useRedirect, Title } from "react-admin";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetIdentity, useLogout } from "react-admin";
import * as SeccionesAtencionHosp from "./components/secciones_atencion_hosp";
import { DatosPaciente } from "./components/secciones_atencion_hosp/datos_paciente";
import { Cronometria } from "./components/secciones_atencion_hosp/hea_form";
import { DatosMotivoAtencion } from "./components/secciones_atencion_hosp/motivo_form";
import { DatosLugarControl } from "./components/secciones_atencion_hosp/datosTraslado";
import { DatosMadre } from "./components/secciones_atencion_hosp/datos_madre";
import { CausaTraumatica } from "./components/secciones_atencion_hosp/causa_traumatica";
import { CausaClinica } from "./components/secciones_atencion_hosp/causa_clinica";
import { EvaluacionInicial } from "./components/secciones_atencion_hosp/valoracion_ABC";
import { CuerpoDibujo } from "./components/secciones_atencion_hosp/cuerpo_dibujo";
import { TratamientoUno } from "./components/secciones_atencion_hosp/tratamiento_uno";
import { TratamientoP2 } from "./components/secciones_atencion_hosp/x_tratamientoP2";
// import { EvaluacionSecundaria } from "./components/secciones_atencion_hosp/evalucionsec_traslado";
import { DatosLegales } from "./components/secciones_atencion_hosp/datos_legales";
import React from "react";



const MyCustomFormPage = () => {
  //USO DE GETIDENTITY() DARIO
  const { data, isPending, error } = useGetIdentity();
  const isMobile = window.innerWidth <= 768;

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


  // Uso de los estados para los datos del formulario
  // Cronometria
  const [datosCronometria, setDatosCronometria] = useState<Cronometria>({
    fecha: "",
    id: "",
    horaLlamada: "",
    horaSalida: "",
    horaLlegada: "",
    horaTraslado: "",
    horaHospital: "",
    horaSalidaHospital: "",
    horaBase: "",
  });
  // Motivo Atencion
  const [datosMotivoAtencion, setDatosMotivoAtencion] = useState<DatosMotivoAtencion>({
    calle: "",
    entreCalle1: "",
    entreCalle2: "",
    colonia: "",
    alcaldia: "",
  });
  // Datos Lugar y Control
  const [datosLugarControl, setDatosLugarControl] = useState<DatosLugarControl>({
    lugar: null,
    otroLugar: "",
    numAmbulancia: "",
    operador: "",
    tum: "",
    socorrista: "",
    helicoptero: "",
  });
  // Datos Paciente
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
  // Datos Madre
  const [datosMadre, setDatosMadre] = useState<DatosMadre>({
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
  });
  // Causa Traumatica
  const [datosCausaTraumatica, setDatosCausaTraumatica] = useState<CausaTraumatica>({
    causa: "",
    objetosChoque: [],
    impactos: [],
    especifique: "",
    cms: "",
    parabrisas: "",
    volante: "",
    bolsa: "",
    cinturon: "",
    dentro: "",
    atropellado: "",
  });
  // Causa Clinica
  const [datosCausaClinica, setDatosCausaClinica] = useState<CausaClinica>({
    origen: "",
    especificacion: "",
    primeravez: "",
    subsecuente: "",
  });
  // Evaluación Inicial
  const [datosEvaluacionInicial, setDatosEvaluacionInicial] = useState<EvaluacionInicial>({
    consciencia: "",
    deglucion: "",
    viaAerea: "",
    ventilacion: "",
    auscultacion: "",
    hemitorax: "",
    sitio: "",
    presenciaPulsos: "",
    calidad: "",
    piel: "",
    caracteristicas: "",
    observaciones: "",
  });
  // Diagrama Cuerpo
  const [datosCuerpoDibujo, setDatosCuerpoDibujo] = useState<CuerpoDibujo>({
    marks: [],
    history: [],
    historyIndex: -1,
    selectedLabel: '1'
  });
  // // Evaluación Secundaria y Traslado
  // const [datosEvaluacionSecundaria, setDatosEvaluacionSecundaria] = useState<EvaluacionSecundaria>({
  //   signosVitales: {
  //     medicion1: {
  //       hora: "",
  //       fr: "",
  //       fc: "",
  //       tas: "",
  //       tad: "",
  //       sao2: "",
  //       temp: "",
  //       gluc: "",
  //       neurotest: "",
  //     },
  //     medicion2: {
  //       hora: "",
  //       fr: "",
  //       fc: "",
  //       tas: "",
  //       tad: "",
  //       sao2: "",
  //       temp: "",
  //       gluc: "",
  //       neurotest: "",
  //     },
  //     medicion3: {
  //       hora: "",
  //       fr: "",
  //       fc: "",
  //       tas: "",
  //       tad: "",
  //       sao2: "",
  //       temp: "",
  //       gluc: "",
  //       neurotest: "",
  //     },
  //   },
  //   glasgow_total: "",
  //   alergias: "",
  //   medicamentos: "",
  //   padecimientos: "",
  //   ultimac: "",
  //   eventosp: "",
  //   condicion_paciente1: "",
  //   condicion_paciente2: "",
  //   prioridad: "",
  //   hospital: "",
  //   doctor: "",
  //   folio_cru: "",
  // });
  // Tratamiento
  const [datosTratamientoUno, setDatosTratamientoUno] = useState<TratamientoUno>({
    viaAerea: [],
    controlCervical: "",
    asVentilatoria: [],
    ltsXMin: "",
  });
  // Tratamiento P2
  const [datosTratamientoP2, setDatosTratamientoP2] = useState<TratamientoP2>({
    hora1: "",
    hora2: "",
    medicamento1: "",
    medicamento2: "",
    dosis1: "",
    dosis2: "",
    via_admin1: "",
    via_admin2: "",
    dr: "",
    controlHemo: "",
    viasYSolucion: "",
    atencion: [],
    pertenencias: "",
  });
  // Datos legales
  const [datosLegales, setDatosLegales] = useState<DatosLegales>({
    dependencia: "",
    num_unidad: "",
    num_oficiales: "",
    vehiculos: [
      { tipo: "", marca: "", placas: "" },
      { tipo: "", marca: "", placas: "" },
      { tipo: "", marca: "", placas: "" },
    ],
  });




  // Handlers para actualizar los datos
  const handlePacientePatch = (patch: Partial<DatosPaciente>) => setDatosPaciente((prev) => ({ ...prev, ...patch }));
  const handleMotivoAtencionPatch = (patch: Partial<DatosMotivoAtencion>) => setDatosMotivoAtencion((prev) => ({ ...prev, ...patch }));
  const handleLugarControlPatch = (patch: Partial<DatosLugarControl>) => setDatosLugarControl((prev) => ({ ...prev, ...patch }));
  const handleCronometriaPatch = (patch: Partial<Cronometria>) => setDatosCronometria((prev) => ({ ...prev, ...patch }));
  const handleMadrePatch = (patch: Partial<DatosMadre>) => setDatosMadre((prev) => ({ ...prev, ...patch }));
  const handleCausaTraumaticaPatch = (patch: Partial<CausaTraumatica>) => setDatosCausaTraumatica((prev) => ({ ...prev, ...patch }));
  const handleCausaClinicaPatch = (patch: Partial<CausaClinica>) => setDatosCausaClinica((prev) => ({ ...prev, ...patch }));
  const handleEvaluacionInicialPatch = (patch: Partial<EvaluacionInicial>) => setDatosEvaluacionInicial((prev) => ({ ...prev, ...patch }));
  const handleCuerpoDibujoPatch = (patch: Partial<CuerpoDibujo>) => setDatosCuerpoDibujo((prev) => ({ ...prev, ...patch }));
  // const handleEvaluacionSecundariaPatch = (patch: Partial<EvaluacionSecundaria>) => setDatosEvaluacionSecundaria((prev) => ({ ...prev, ...patch }));
  const handleTratamientoUnoPatch = (patch: Partial<TratamientoUno>) => setDatosTratamientoUno((prev) => ({ ...prev, ...patch }));
  const handleTratamientoP2Patch = (patch: Partial<TratamientoP2>) => setDatosTratamientoP2((prev) => ({ ...prev, ...patch }));
  const handleDatosLegalesPatch = (patch: Partial<DatosLegales>) => setDatosLegales((prev) => ({ ...prev, ...patch }));

  // Función para enviar datos al backend
  const handleSendData = async () => {
    console.log("🔍 Current datosPaciente:", datosPaciente); // Debug log

    const dataToSend = {

      id: Number(datosCronometria.id) || 0, //Ensure id is a number
      numAmbulancia: Number(datosLugarControl.numAmbulancia) || 0,
      edadAnios: Number(datosPaciente.edadAnios) || 0,
      edadMeses: Number(datosPaciente.edadMeses) || 0,

      datosCronometria: { ...datosCronometria },
      datosMotivoAtencion: { ...datosMotivoAtencion },
      datosLugarControl: { ...datosLugarControl },
      datosPaciente: { ...datosPaciente },
      datosMadre: { ...datosMadre },
      datosCausaTraumatica: { ...datosCausaTraumatica },
      datosCausaClinica: { ...datosCausaClinica },
      datosEvaluacionInicial: { ...datosEvaluacionInicial },
      datosCuerpoDibujo: { ...datosCuerpoDibujo },
      // datosEvaluacionSecundariaTraslado: { ...datosEvaluacionSecundaria },
      datosTratamientoUno: { ...datosTratamientoUno },
      datosTratamientoP2: { ...datosTratamientoP2 },
      datosLegales: { ...datosLegales },  

      usuario: fullName, // Add user info
      timestamp: new Date().toISOString(), // Add timestamp
    };

    console.log("📤 Data being sent:", dataToSend); // Debug log

    try {
      const response = await fetch("http://localhost:3000/reportes", { // Use localhost instead of IP
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: { "Content-Type": "application/json" }
      });

      console.log("📡 Response status:", response.status); // Debug log

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Server response:", result); // Debug log
        notify("Formulario enviado con éxito", { type: "success" });
      } else {
        const errorText = await response.text();
        console.error("❌ Server error:", response.status, errorText); // Debug log
        throw new Error(`Server error: ${response.status}`);
      }
    } catch (error) {
      console.error("🚨 Network error:", error); // Debug log
      notify("Error al enviar el formulario", { type: "error" });
    }
  };


  return (
    <Box p={3} maxWidth={isMobile ? '100vw' : '100%'}>
      <Title title="Formulario Personalizado " />
      <SeccionesAtencionHosp.HeaderAtencionPrehospitalaria value={datosCronometria} onChange={handleCronometriaPatch} />
      <SeccionesAtencionHosp.MotivoAtencionPrehospitalaria value={datosMotivoAtencion} onChange={handleMotivoAtencionPatch} />
      <SeccionesAtencionHosp.DatosTraslado value={datosLugarControl} onChange={handleLugarControlPatch} />
      <SeccionesAtencionHosp.DatosPacienteSection value={datosPaciente} onChange={handlePacientePatch} />
      <SeccionesAtencionHosp.FormsMadre value={datosMadre} onChange={handleMadrePatch} />
      <SeccionesAtencionHosp.OpcionesAccidente value={datosCausaTraumatica} onChange={handleCausaTraumaticaPatch} />
      <SeccionesAtencionHosp.FormsCausaClinica value={datosCausaClinica} onChange={handleCausaClinicaPatch} />
      <SeccionesAtencionHosp.EvaluacionInicial value={datosEvaluacionInicial} onChange={handleEvaluacionInicialPatch} />
      <SeccionesAtencionHosp.HeatmapBody value={datosCuerpoDibujo} onChange={handleCuerpoDibujoPatch} />
      {/* <SeccionesAtencionHosp.EvaluacionSecTraslado value={datosEvaluacionSecundaria} onChange={handleEvaluacionSecundariaPatch} /> */}
      <SeccionesAtencionHosp.TratamientoUno value={datosTratamientoUno} onChange={handleTratamientoUnoPatch} />
      <SeccionesAtencionHosp.TratamientoP2 value={datosTratamientoP2} onChange={handleTratamientoP2Patch} />
      <SeccionesAtencionHosp.FormsDatosLegales value={datosLegales} onChange={handleDatosLegalesPatch} />

      {/* Mandar info */}
      <Button variant="contained" color="primary" onClick={handleSendData} sx={{ mt: 3 }}>
        Enviar Datos
      </Button>

    </Box>
  );
};

export default MyCustomFormPage;



