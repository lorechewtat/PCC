// App.tsx
import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";

// Tu formulario personalizado

// Otros imports
import PostIcon from "@mui/icons-material/Book";

import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";

import { authProvider } from "./authprovider";
import { i18nProvider } from "./consts/translates/i18nProvider";
import MyLoginPage from "./pages/login/login_screen";
import myTheme from "./consts/theme";
import MyCustomFormPage from "./pages/custom_form/custom_form";

import { PersonAdd, Search } from "@mui/icons-material"; // Ícono para "nuevo usuario"
import PaginaNuevosUsuarios from "./pages/new_users/nuevo_ususairo";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import EmergenciasPage from "./pages/emergencias_urbanas/emergencias";
import BuscarReportes from "./pages/buscar_frap/buscar_frap";
import { Dashboard } from "./pages/dashboard/Dashboard";
import LogsView from "./pages/albums/logs/logs";

export const App = () => (
  <Admin
    loginPage={MyLoginPage}
    theme={myTheme}
    authProvider={authProvider}
    layout={Layout}
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
    dashboard={Dashboard}
  >
    <Resource
      name="Frap_medico"
      list={MyCustomFormPage}
      show={MyCustomFormPage}
      edit={MyCustomFormPage}
      create={MyCustomFormPage}
      icon={PostIcon}
    />

    <Resource
      name="Emergencias_urbanas"
      list={EmergenciasPage}
      show={EmergenciasPage}
      edit={EmergenciasPage}
      create={EmergenciasPage}
      icon={LocalPoliceIcon}
    />

    <Resource
      name="nuevo_usuario"
      list={PaginaNuevosUsuarios}
      show={PaginaNuevosUsuarios}
      create={PaginaNuevosUsuarios}
      icon={PersonAdd}
      options={{ label: "Nuevo Usuario" }}
    />
  <Resource
      name="historial_cambios"
      list={LogsView}
      show={LogsView}
      create={LogsView}
      icon={LogsView}
      options={{ label: "Historial de cambios" }}
    />
    <Resource
      name="Buscar_reportes"
      list={BuscarReportes}
      show={BuscarReportes}
      create={BuscarReportes}
      icon={Search}
      options={{ label: "Gráficas y reportes" }}
    />
    {/* ✅ Ruta personalizada */}
    <CustomRoutes>
      <Route path="/custom-form" element={<MyCustomFormPage />} />
    </CustomRoutes>
  </Admin>
);
//   <Route path="/ejemplo-edad" element={<MyCustomEdadFormPage />} />
