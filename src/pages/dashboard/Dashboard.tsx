// src/pages/dashboard/Dashboard.tsx
import { Box, Typography, Card, CardContent } from "@mui/material";

export const Dashboard = () => {
  const userRole = localStorage.getItem("role") || "";

  const getWelcomeMessage = () => {
    switch (userRole) {
      case "admin":
        return "Panel de Administración - Acceso a administración al sistema";
      case "jefe_turno":
        return "Bienvenido Jefe de Turno - Visualizar reportes";
      case "paramedico":
        return "Bienvenido Paramédico - Sistema FRAP Médico";
      case "emergencias_urbanas":
        return "Bienvenido - Sistema de Emergencias Urbanas";
      default:
        return "Bienvenido al Sistema";
    }
  };

  const getAllowedResources = () => {
    switch (userRole) {
      case "admin":
        return ["Gestión de Usuarios", "Reportes y Gráficas"];
      case "jefe_turno":
        return ["Reportes"];
      case "paramedico":
        return ["FRAP"];
      case "emergencias_urbanas":
        return ["Emergencias Urbanas"];
      default:
        return ["Sin acceso"];
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        {getWelcomeMessage()}
      </Typography>

      <Card sx={{ maxWidth: 600, mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recursos disponibles para tu rol:
          </Typography>
          <ul>
            {getAllowedResources().map((resource, index) => (
              <li key={index}>
                <Typography>{resource}</Typography>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
};
