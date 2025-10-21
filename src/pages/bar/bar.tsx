
import { AppBar, TitlePortal, useGetIdentity } from 'react-admin';
import { Box, Typography, Avatar } from '@mui/material';
import logo from './logo_alcaldia.png'; // Ajusta la ruta

export const MyAppBar = () => {
    useGetIdentity();

    return (
        <AppBar
            sx={{
                backgroundColor: '#20315D',
                '& .RaAppBar-toolbar': {
                    paddingX: 2,
                },
            }}
        >
            {/* Logo */}
        

            {/* Título dinámico */}
            <TitlePortal />

            {/* Espaciador */}
            <Box sx={{ flex: 1 }} />

            {/* Usuario */}
         
            
        </AppBar>
    );
};