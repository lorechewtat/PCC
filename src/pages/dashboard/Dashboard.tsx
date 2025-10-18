import { Box, Typography, Card, CardContent } from "@mui/material";
import logo from "../custom_form/components/secciones_atencion_hosp/logo_alcaldia.png";

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
        return ["Gestión de Usuarios", "Gráficas y reportes"];
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
      <Box
        component="img"
        src={logo}
        alt="Logo"
        sx={{
          width: "100",
          height: "auto",
          maxWidth: "30vw",
          paddingBottom: 5,
        }}
      />
      <Typography variant="h4" color="primary">
        {getWelcomeMessage()}
      </Typography>

      <Card sx={{ maxWidth: 600, mt: 3 }}>
        <CardContent>
          <Typography variant="h6">
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
