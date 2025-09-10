import * as React from "react";
import { AppBar, TitlePortal } from "react-admin";
import { Toolbar, Typography } from "@mui/material";
import { MyUserMenu } from "../menu/menu";

export const MyAppBar = (props: any) => (
  <AppBar
    {...props}
    userMenu={<MyUserMenu />}    
    elevation={0}
    sx={{
      background: "#0B57D0",   
      color: "#fff",
    }}
  >
    <Toolbar sx={{ minHeight: 64, px: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        <TitlePortal />
      </Typography>
    </Toolbar>
  </AppBar>
);