import { Menu } from "react-admin";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";

export const MyMenu = () => (
  <Menu>
    {/* Mantienes todos los recursos que ya tenías */}
    <Menu.DashboardItem />
    <Menu.Item
      to="/emergencias"
      primaryText="Emergencias Urbanas"
      leftIcon={<LocalPoliceIcon />}
    />
    <Menu.ResourceItem name="posts" />
    <Menu.ResourceItem name="users" />
    <Menu.ResourceItem name="todos" />
    <Menu.ResourceItem name="comments" />
    <Menu.ResourceItem name="albums" />
    <Menu.ResourceItem name="photos" />
  </Menu>
);
