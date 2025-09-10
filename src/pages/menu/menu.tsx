import * as React from "react";
import { UserMenu, Logout } from "react-admin";
import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import ExitIcon from "@mui/icons-material/PowerSettingsNew";

export const MyUserMenu = () => (
  <UserMenu>
    <MenuItem>
      <ListItemIcon><ExitIcon fontSize="small" /></ListItemIcon>
      <ListItemText>
        <Logout /> 
      </ListItemText>
    </MenuItem>
  </UserMenu>
);