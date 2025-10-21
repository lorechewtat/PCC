// MyLoginPage.tsx
import { useState, useEffect  } from 'react';
import { useLogin, useNotify } from 'react-admin';
import { Card, CardContent, TextField, Button, Box, Typography, IconButton, InputAdornment, useMediaQuery, Theme} 
    from '@mui/material';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from 'react';

import logo from './logo_alcaldia.png'; 
import bg from './bcak.png'; 
import o from './o.png'; 
const MyLoginPage = () => {
    const login = useLogin();
    const notify = useNotify();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login({ username, password });
        } catch (error) {
            notify('Credenciales incorrectas');
        }
    };
    return (
        <Box 
    sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'left',
       
    }}
>
    <Card 
    
        sx={{ 
            elevation: 10,
            width: '900px',
            maxWidth: '90vw',
            height: isSmall ? 'auto' : '500px',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            position: 'relative',
            zIndex: 1, 
        }}
    >
        {/* Lado izquierdo - Formulario */}
        <Box sx={{ flex: 1, padding: 4, backgroundColor: 'white' }}>
            <CardContent>
                <Box 
                    component="img"
                    src={logo}
                    alt="Logo alcaldía"
                    sx={{ 
                        width: 88, 
                        height: 'auto',
                        display: 'block',
                        mx: 'auto',         
                        my: 2     
                    }}
                />
                <Typography variant="h4" align='center' gutterBottom
                    sx={{ fontWeight: "bold" }}>
                    Iniciar sesión
                </Typography>
                
                <Typography variant="h6" align='center' gutterBottom
                    sx={{ color: "gray", fontSize: "15px" }}>
                    Si aún no tienes cuenta pregunta al administrador
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box mb={2}>
                        <TextField
                            label="Email"
                            fullWidth
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                    backgroundColor: "#f9fafc",
                                    "& fieldset": {
                                        borderColor: "#cbd5e1",
                                    },
                                }
                            }}
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="Contraseña"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                    backgroundColor: "#f9fafc",
                                    "& fieldset": {
                                        borderColor: "#cbd5e1",
                                    },
                                }
                            }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            padding: "10px",
                            backgroundColor: '#20315D',
                            borderRadius: "10px",
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#16284a',
                            },
                        }}
                    >
                        INGRESAR
                    </Button>
                </form>
            </CardContent>
        </Box>

        {/* Lado derecho del contenedor */}
        <Box 
            sx={{ 
                margin:1,
                borderRadius: 5,
                flex: 1,
                backgroundImage: `url(${o})`,
                backgroundSize: 'cover', 
                backgroundPosition: 'left center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#20315D',
                minHeight: { xs: '200px', md: '425px' },
                display: { xs: 'none', md: 'block' },
            }}
        />
    </Card>
</Box>
           
    );
};

export default MyLoginPage;
