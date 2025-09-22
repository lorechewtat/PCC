// MyLoginPage.tsx
import { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import { Card, CardContent, TextField, Button, Box, Typography, IconButton, InputAdornment, useMediaQuery, Theme} 
    from '@mui/material';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from 'react';

import logo from './logo_alcaldia.png'; // ruta relativa

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
        <Box display="flex" height="100vh" justifyContent="center" alignItems="center" flexDirection="column"  
         sx={{
      background: 'linear-gradient(to bottom, #FEFFF9 10%, #20315D 100%)'
                }}>
            <Box
        sx={{
          position: "absolute",
          top: 64,
          display: { xs: "none", sm: "block" },
          width: "100%",
          textAlign: "center",
        }}
      >       
      </Box>
      TituloAtencionPrehospitalaria
        <Box component="img"
        margin={2}
        src={logo}
        alt="Logo alcaldía"
        sx={{ width: 88, height: 'auto' }}
/>
            <Card sx={{ width: 300, height: 425 ,borderRadius: "15px" , display: 'flex', justifyContent: "center", alignItems: "center"}}>
                <CardContent>
                    <Typography variant="h4" align='center' gutterBottom
                    sx={{ fontWeight: "bold" }}>
                        Iniciar sesión
                    </Typography>
                     
                     <Typography variant="h6" align='center' gutterBottom
                     sx={{ color: "gray" , fontSize: "15px" }}>
                        Si aún no tienes cuenta pregunta al administrador
                     </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box mb={2}>
                            <TextField
                                label="Email"
                                fullWidth
                                sx={{
                                    border: "10px",
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
                                color: '#fff', // blanco para el texto
                                '&:hover': {
                              backgroundColor: '#16284a', // un poco más oscuro al hacer hover
                            },
                          }}
                        >
                          INGRESAR
                        </Button>
                    </form>
                </CardContent>  
            </Card>
        </Box>
    );
};

export default MyLoginPage;
