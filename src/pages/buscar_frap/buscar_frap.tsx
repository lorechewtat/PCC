


import { Box, TextField, Typography, Card, CardContent, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const initialReports = [
  {
    "_id": "68eaf1d4ea8c2bf38e599d17",
    "id": "0",
    "numAmbulancia": "AMB-001",
    "edadAnios": 32,
    "edadMeses": 4,
    "datosCronometria": {
      "fecha": "2024-03-15",
      "id": "CRON-001",
      "horaLlamada": "08:30:00",
      "horaSalida": "08:35:00",
      "horaLlegada": "08:45:00",
      "horaTraslado": "09:00:00",
      "horaHospital": "09:15:00",
      "horaSalidaHospital": "10:00:00",
      "horaBase": "10:20:00"
    },
    "datosMotivoAtencion": {
      "calle": "Av. Reforma",
      "entreCalle1": "Insurgentes",
      "entreCalle2": "Chapultepec",
      "colonia": "Cuauhtémoc",
      "alcaldia": "Cuauhtémoc"
    },
    "datosLugarControl": {
      "lugar": "Hospital General",
      "otroLugar": "",
      "numAmbulancia": "AMB-001",
      "operador": "Juan Pérez",
      "tum": "MAR-123",
      "socorrista": "María García",
      "helicoptero": ""
    },
    "datosPaciente": {
      "nombre": "Ana López Martínez",
      "sexo": "Femenino",
      "edadAnios": "32",
      "edadMeses": "4",
      "domicilio": "Calle Juárez 123",
      "colonia": "Centro",
      "alcaldia": "Benito Juárez",
      "derechohabiente": "IMSS",
      "telefono": "5551234567",
      "ocupacion": "Arquitecta"
    },
    "datosMadre": {
      "semanas_gestacion": "",
      "inicio_contracciones": "",
      "frecuencia_contracciones": "",
      "duracion_contracciones": "",
      "hora_nacimiento": "",
      "placenta_expulsada": "",
      "lugar_nacimiento": "",
      "estado_producto": "",
      "sexo_producto": "",
      "edad_gestacional": ""
    },
    "apgar": {},
    "datosCausaTraumatica": {
      "causa": "Accidente automovilístico",
      "objetosChoque": [],
      "impactos": [],
      "especifique": "Colisión frontal",
      "cms": "Si",
      "parabrisas": "No",
      "volante": "Si",
      "bolsa": "Si",
      "cinturon": "No",
      "dentro": "Si",
      "atropellado": "No"
    },
    "datosCausaClinica": {
      "origen": "Cardíaco",
      "especificacion": "Dolor torácico",
      "primeravez": "No",
      "subsecuente": "Si"
    },
    "datosEvaluacionInicial": {
      "consciencia": "Alerta",
      "deglucion": "Normal",
      "viaAerea": "Permeable",
      "ventilacion": "Normal",
      "auscultacion": "Buena",
      "hemitorax": "Simétrico",
      "sitio": "Tórax anterior",
      "presenciaPulsos": "Presentes",
      "calidad": "Fuertes",
      "piel": "Caliente",
      "caracteristicas": "Húmeda",
      "observaciones": "Paciente estable"
    },
    "datosCuerpoDibujo": {
      "marks": [],
      "history": [],
      "historyIndex": 0,
      "selectedLabel": "1",
      "usuario": "Soobin",
      "timestamp": "2025-10-12T00:09:56.720Z"
    }
  },
  {
    "_id": "68eaf1d4ea8c2bf38e599d18",
    "id": "1",
    "numAmbulancia": "AMB-002",
    "edadAnios": 45,
    "edadMeses": 0,
    "datosCronometria": {
      "fecha": "2024-03-16",
      "id": "CRON-002",
      "horaLlamada": "14:20:00",
      "horaSalida": "14:25:00",
      "horaLlegada": "14:40:00",
      "horaTraslado": "14:55:00",
      "horaHospital": "15:10:00",
      "horaSalidaHospital": "16:00:00",
      "horaBase": "16:15:00"
    },
    "datosMotivoAtencion": {
      "calle": "Av. Revolución",
      "entreCalle1": "Patriotismo",
      "entreCalle2": "Barranca del Muerto",
      "colonia": "San Ángel",
      "alcaldia": "Álvaro Obregón"
    },
    "datosLugarControl": {
      "lugar": "Vía pública",
      "otroLugar": "",
      "numAmbulancia": "AMB-002",
      "operador": "Carlos Rodríguez",
      "tum": "MAR-456",
      "socorrista": "Laura Hernández",
      "helicoptero": ""
    },
    "datosPaciente": {
      "nombre": "Roberto Sánchez Jiménez",
      "sexo": "Masculino",
      "edadAnios": "45",
      "edadMeses": "0",
      "domicilio": "Av. México 456",
      "colonia": "Del Valle",
      "alcaldia": "Benito Juárez",
      "derechohabiente": "ISSSTE",
      "telefono": "5557654321",
      "ocupacion": "Ingeniero"
    },
    "datosMadre": {
      "semanas_gestacion": "",
      "inicio_contracciones": "",
      "frecuencia_contracciones": "",
      "duracion_contracciones": "",
      "hora_nacimiento": "",
      "placenta_expulsada": "",
      "lugar_nacimiento": "",
      "estado_producto": "",
      "sexo_producto": "",
      "edad_gestacional": ""
    },
    "apgar": {},
    "datosCausaTraumatica": {
      "causa": "Caída",
      "objetosChoque": [],
      "impactos": [],
      "especifique": "Caída de altura",
      "cms": "No",
      "parabrisas": "No",
      "volante": "No",
      "bolsa": "No",
      "cinturon": "No",
      "dentro": "No",
      "atropellado": "No"
    },
    "datosCausaClinica": {
      "origen": "Respiratorio",
      "especificacion": "Disnea",
      "primeravez": "Si",
      "subsecuente": "No"
    },
    "datosEvaluacionInicial": {
      "consciencia": "Confuso",
      "deglucion": "Dificultosa",
      "viaAerea": "Obstruida parcial",
      "ventilacion": "Disminuida",
      "auscultacion": "Roncos",
      "hemitorax": "Asimétrico",
      "sitio": "Tórax derecho",
      "presenciaPulsos": "Presentes",
      "calidad": "Débiles",
      "piel": "Pálida",
      "caracteristicas": "Fría",
      "observaciones": "Paciente con dificultad respiratoria"
    },
    "datosCuerpoDibujo": {
      "marks": [],
      "history": [],
      "historyIndex": 0,
      "selectedLabel": "1",
      "usuario": "Soobin",
      "timestamp": "2025-10-12T01:15:30.450Z"
    }
  },
  {
    "_id": "68eaf1d4ea8c2bf38e599d19",
    "id": "2",
    "numAmbulancia": "AMB-003",
    "edadAnios": 28,
    "edadMeses": 6,
    "datosCronometria": {
      "fecha": "2024-03-17",
      "id": "CRON-003",
      "horaLlamada": "10:15:00",
      "horaSalida": "10:20:00",
      "horaLlegada": "10:35:00",
      "horaTraslado": "11:00:00",
      "horaHospital": "11:20:00",
      "horaSalidaHospital": "12:30:00",
      "horaBase": "12:45:00"
    },
    "datosMotivoAtencion": {
      "calle": "Eje Central",
      "entreCalle1": "Mosqueta",
      "entreCalle2": "Ricardo Flores Magón",
      "colonia": "Guerrero",
      "alcaldia": "Cuauhtémoc"
    },
    "datosLugarControl": {
      "lugar": "Domicilio particular",
      "otroLugar": "",
      "numAmbulancia": "AMB-003",
      "operador": "Miguel Torres",
      "tum": "MAR-789",
      "socorrista": "Sofia Castro",
      "helicoptero": ""
    },
    "datosPaciente": {
      "nombre": "Elena Ramírez Ortega",
      "sexo": "Femenino",
      "edadAnios": "28",
      "edadMeses": "6",
      "domicilio": "Calle López 789",
      "colonia": "Roma Norte",
      "alcaldia": "Cuauhtémoc",
      "derechohabiente": "Privado",
      "telefono": "5559876543",
      "ocupacion": "Diseñadora"
    },
    "datosMadre": {
      "semanas_gestacion": "38",
      "inicio_contracciones": "09:30:00",
      "frecuencia_contracciones": "3 minutos",
      "duracion_contracciones": "45 segundos",
      "hora_nacimiento": "11:05:00",
      "placenta_expulsada": "Si",
      "lugar_nacimiento": "Ambulancia",
      "estado_producto": "Vivo",
      "sexo_producto": "Femenino",
      "edad_gestacional": "Término"
    },
    "apgar": {
      "minuto1": "8",
      "minuto5": "9"
    },
    "datosCausaTraumatica": {
      "causa": "",
      "objetosChoque": [],
      "impactos": [],
      "especifique": "",
      "cms": "",
      "parabrisas": "",
      "volante": "",
      "bolsa": "",
      "cinturon": "",
      "dentro": "",
      "atropellado": ""
    },
    "datosCausaClinica": {
      "origen": "Obstétrico",
      "especificacion": "Trabajo de parto",
      "primeravez": "Si",
      "subsecuente": "No"
    },
    "datosEvaluacionInicial": {
      "consciencia": "Alerta",
      "deglucion": "Normal",
      "viaAerea": "Permeable",
      "ventilacion": "Normal",
      "auscultacion": "Buena",
      "hemitorax": "Simétrico",
      "sitio": "Abdomen",
      "presenciaPulsos": "Presentes",
      "calidad": "Fuertes",
      "piel": "Caliente",
      "caracteristicas": "Húmeda",
      "observaciones": "Paciente en trabajo de parto activo"
    },
    "datosCuerpoDibujo": {
      "marks": [],
      "history": [],
      "historyIndex": 0,
      "selectedLabel": "1",
      "usuario": "Soobin",
      "timestamp": "2025-10-12T02:20:15.890Z"
    }
  }
];


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const BuscarReportes = () => {
  const [reports] = useState(initialReports);
  const [search, setSearch] = useState({ paciente: "", socorrista: "", fecha: "" });

  const filteredReports = reports.filter((r) => {
    const matchPaciente = r.datosPaciente.nombre.toLowerCase().includes(search.paciente.toLowerCase());
    const matchSocorrista = r.datosLugarControl.socorrista.toLowerCase().includes(search.socorrista.toLowerCase());
    const matchFecha = search.fecha ? r.datosCronometria.fecha === search.fecha : true;
    return matchPaciente && matchSocorrista && matchFecha;
  });

  // Estadísticas
  const ageDistribution = filteredReports.map(r => ({ name: r.datosPaciente.nombre, edad: Number(r.datosPaciente.edadAnios) }));
  
  const causeStats = filteredReports.reduce(
    (acc, r) => {
      if (r.datosCausaTraumatica.causa) acc.traumatica += 1;
      if (r.datosCausaClinica.origen) acc.clinica += 1;
      return acc;
    }, { traumatica: 0, clinica: 0 }
  );

  const causeData = [
    { name: "Traumática", value: causeStats.traumatica },
    { name: "Clínica", value: causeStats.clinica }
  ];

  const reportsByDate: Record<string, number> = {};
  filteredReports.forEach(r => {
    reportsByDate[r.datosCronometria.fecha] = (reportsByDate[r.datosCronometria.fecha] || 0) + 1;
  });
  const dateData = Object.entries(reportsByDate).map(([fecha, count]) => ({ fecha, count }));


  return (
    <Box p={3} maxWidth="100vw" mx="auto">
      <Typography variant="h5" gutterBottom>
        Buscar Reportes Médicos
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Nombre del Paciente"
              value={search.paciente}
              onChange={(e) => setSearch({ ...search, paciente: e.target.value })}
              fullWidth
            />
            <TextField
              label="Nombre del Socorrista"
              value={search.socorrista}
              onChange={(e) => setSearch({ ...search, socorrista: e.target.value })}
              fullWidth
            />
            <TextField
              label="Fecha"
              type="date"
              value={search.fecha}
              onChange={(e) => setSearch({ ...search, fecha: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Resultados ({filteredReports.length})
          </Typography>
          {filteredReports.length === 0 ? (
            <Typography color="textSecondary">No se encontraron reportes.</Typography>
          ) : (
            <List>
              {filteredReports.map((r) => (
                <ListItem key={r._id} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
                  <ListItemText
                    primary={`Paciente: ${r.datosPaciente.nombre} | Socorrista: ${r.datosLugarControl.socorrista}`}
                    secondary={`Fecha: ${r.datosCronometria.fecha} | Ambulancia: ${r.numAmbulancia}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      {/* Distribución de Edades */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Distribución de Edades
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="edad" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Causas de Atención */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Causas de Atención
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={causeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                label
              >
                {causeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Reportes por Fecha */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Reportes por Fecha
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BuscarReportes;
