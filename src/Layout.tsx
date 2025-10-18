// Layout.tsx
import type { ReactNode } from "react";
import React from "react";
import {
  Layout as RALayout,
  Menu,
  CheckForApplicationUpdate,
} from "react-admin";

// Íconos
import PostIcon from "@mui/icons-material/Book";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import { PersonAdd, Search } from "@mui/icons-material";

// Layout.tsx - Actualizar los roles del FRAP Médico
export const Layout = ({ children }: { children: ReactNode }) => {
  const userRole = localStorage.getItem("role") || "";

  const CustomMenu = () => {
    const menuConfig = [
      {
        name: "Frap_medico",
        label: "FRAP Médico",
        icon: PostIcon,
        roles: ["paramedico"],
      },
      {
        name: "Emergencias_urbanas",
        label: "Emergencias Urbanas",
        icon: LocalPoliceIcon,
        roles: ["emergencias_urbanas"],
      },
      {
        name: "nuevo_usuario",
        label: "Nuevo Usuario",
        icon: PersonAdd,
        roles: ["admin"],
      },
      {
        name: "Buscar_reportes",
        label: "Gráficas y Reportes",
        icon: Search,
        roles: ["admin", "jefe_turno"],
      },
    ];

    const allowedItems = menuConfig.filter((item) =>
      item.roles.includes(userRole),
    );

    return (
      <Menu>
        {allowedItems.map((item) => (
          <Menu.Item
            key={item.name}
            to={`/${item.name}`}
            primaryText={item.label}
            leftIcon={React.createElement(item.icon)}
          />
        ))}
      </Menu>
    );
  };

  return (
    <RALayout menu={CustomMenu}>
      {children}
      <CheckForApplicationUpdate />
    </RALayout>
  );
};
