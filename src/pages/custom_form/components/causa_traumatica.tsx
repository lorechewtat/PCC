import { Box, Button, TextField, Typography, ToggleButton, ToggleButtonGroup, colors, Divider, Stack } from '@mui/material';
import {useState } from 'react';
import { useNotify } from "react-admin";
import PlaceIcon from '@mui/icons-material/PlaceOutlined';
import DirectionsBusFilledOutlinedIcon from '@mui/icons-material/DirectionsBusFilledOutlined';

const OpcionesAccidente = () => {
    const notify = useNotify();
    const [form, setForm] = useState({
        causa: null as string | null,
        objetosChoque: [] as string[],   // multi
        impactos: [] as string[],         // multi
        especifique: "",
        cms: "",
        parabrisas: null as string | null,
        volante: null as string | null,
        bolsa: null as string | null,
        cinturon: null as string | null,
        dentro: null as string | null,
        atropellado: null as string | null
    });

    // setter genérico
    const setField = <K extends keyof typeof form>(key: K) =>
    (value: typeof form[K]) => setForm(prev => ({ ...prev, [key]: value }));

    return (
    <Box>
        <Divider sx={{ my: 5}}/>

        <Box display="flex" alignItems="center" mb={2}>
            {/* Sección de selección de lugar */}
            <Typography variant="h6" color="primary">
            AGENTE CAUSAL
            </Typography>
            <PlaceIcon sx={{ mr: 1, color: 'primary.main' }} />
        </Box>
        

        <Box width={"850px"}>
        <ToggleButtonGroup
          value={form.causa}
          exclusive
          onChange={(_, v) => setField('causa')(v)}
          sx={{ display: 'grid', gridTemplateColumns: "repeat(5, 1fr)" ,gap: 1, mb: 2, 
            "& .MuiToggleButton-root": {
                borderRadius: 2,      // fuerza esquinas redondeadas
                border: "1px solid #ccc !important", // evita que se fusionen
            }
          }}
        >
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", padding: "30px 0",
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
          }
          }} value="Anima">Anima</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
          }
          }} value="Juguete">Juguete</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
          }
          }} value="Explosion">Explosión</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", padding: "30px 0",
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
          }
          }} value="Fuego">Fuego</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
            }
          }} value="Animal">Animal</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
            }
          }} value="Bicicleta">Bicicleta</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", padding: "30px 0",
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
            }
          }} value="Automotor">Automotor</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
            }
          }} value="Maquinaria">Maquinaria</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
            }
          }} value="Herramienta">Herramienta</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
            }
          }} value="Electricidad">Electricidad</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
            }
          }} value="sustancia caliente">sustancia caliente</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", padding: "30px 0",
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
            }
          }} value="sustancia toxica">sustancia toxica</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
            }
          }} value="Producto Biologico">Producto Biologico</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
            }
          }} value="g humano">g humano</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
            }
          }} value="otro">Otro</ToggleButton>
        </ToggleButtonGroup>
        <TextField
          label="ESPECIFIQUE"
          variant="standard"
          fullWidth
          required
          value={form.especifique}
          onChange={e => setField('especifique')(e.target.value)}
        />
        </Box>

        <Divider sx={{ my: 5}}/>

        <Box display="flex" alignItems="center" mb={2}>
            {/* Sección de datos de traslado */}
            <Typography variant="h6" color="primary">
                ACCIDENTE AUTOMOVILISTCICO
            </Typography>
            <DirectionsBusFilledOutlinedIcon sx={{ mr: 1, color: 'primary.main' }}/>
        </Box>
        
      <Box
        display="flex"
        flexDirection="column"
        width={"850px"}
        gap={2}
        mb={2}
        sx={{ border: 2, borderColor: 'primary.main', borderRadius: 2, p: 2 }}
      >
        <ToggleButtonGroup
          value={form.objetosChoque}
          //exclusive
          onChange={(_, v: string[]) => setField('objetosChoque')(v)}
          sx={{ display: 'grid', gridTemplateColumns: "repeat(3, 1fr)" ,gap: 1, mb: 2, 
            "& .MuiToggleButton-root": {
                borderRadius: 2,      // fuerza esquinas redondeadas
                border: "1px solid #ccc !important", // evita que se fusionen
            }
          }}
        >
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", padding: "30px 0",
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
          }
          }} value="Colision">Colisión</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
          }
          }} value="Volcadura">Volcadura</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
          }
          }} value="Automotor">Automotor</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", padding: "30px 0",
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
          }
          }} value="Bicicleta">Bicicleta</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
            }
          }} value="Motocicleta">Motocicleta</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
            }
          }} value="Maquinaria">Maquinaria</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", padding: "30px 0",
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
            }
          }} value="Contra Objeto Fijo">Contra Objeto Fijo</ToggleButton>
          
        </ToggleButtonGroup>

        <Typography variant="body1" sx={{color: "gray" }}>
            IMPACTO
        </Typography>

        <ToggleButtonGroup
          value={form.impactos}
          exclusive
          onChange={(_, v: string[]) => setField('impactos')(v)}
          sx={{mb: 1 }}
        >
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff",
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
          }
          }} value="Posterior">Posterior</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
          }
          }} value="Volcadura">Volcadura</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
          }
          }} value="Rotacional">Rotacional</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff",
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
          }
          }} value="Frontal">Frontal</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
            }
          }} value="Lateral">Lateral</ToggleButton>
        </ToggleButtonGroup>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={6} sx={{display: 'flex', alignItems: 'end', mb: 3}}>
          <Stack direction="column">
            <Typography variant="body1" sx={{ mb: 1, color: "gray" }}>
                HUNDIMIENTO
            </Typography>
            <TextField
                label="CMS"
                variant="standard"
                required
                value={form.cms}
                onChange={e => setField('cms')(e.target.value)}
            />
          </Stack>

          <Stack direction="column">
            <Typography variant="body1" sx={{ mb: 1, color: "gray" }}>
                PARABRISAS
            </Typography>
            <ToggleButtonGroup
            value={form.parabrisas}
            exclusive
            onChange={(_, v) => setField('parabrisas')(v)}
            sx={{ }}
            >
            <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff",
                "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                    borderColor: "primary.main",
                },
                "&:hover": {
                    backgroundColor: "#8E8E8E",
                    color: "white",
                    borderColor: "#8E8E8E",
                    cursor: "pointer"
            }
            }} value="Integro">Integro</ToggleButton>
            <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
                "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                    borderColor: "primary.main",
                },
                "&:hover": {
                    backgroundColor: "#8E8E8E",
                    color: "white",
                    borderColor: "#8E8E8E",
                    cursor: "pointer"
            }
            }} value="Estrellado">Estrellado</ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Stack direction="column">
            <Typography variant="body1" sx={{ mb: 1, color: "gray" }}>
                VOLANTE
            </Typography>
            <ToggleButtonGroup
            value={form.volante}
            exclusive
            onChange={(_, v) => setField('volante')(v)}
            sx={{ }}
            >
            <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff",
                "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                    borderColor: "primary.main",
                },
                "&:hover": {
                    backgroundColor: "#8E8E8E",
                    color: "white",
                    borderColor: "#8E8E8E",
                    cursor: "pointer"
            }
            }} value="Integro">Integro</ToggleButton>
            <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
                "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                    borderColor: "primary.main",
                },
                "&:hover": {
                    backgroundColor: "#8E8E8E",
                    color: "white",
                    borderColor: "#8E8E8E",
                    cursor: "pointer"
            }
            }} value="Doblado">Doblado</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Stack>

        <Stack direction='row' spacing={6} sx={{display: 'flex', alignItems: 'end'}}>
            <Stack direction="column">
            <Typography variant="body1" sx={{ mb: 1, color: "gray" }}>
                BOLSA DE AIRE
            </Typography>
            <ToggleButtonGroup
            value={form.bolsa}
            exclusive
            onChange={(_, v) => setField('bolsa')(v)}
            sx={{ }}
            >
            <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff",
                "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                    borderColor: "primary.main",
                },
                "&:hover": {
                    backgroundColor: "#8E8E8E",
                    color: "white",
                    borderColor: "#8E8E8E",
                    cursor: "pointer"
            }
            }} value="SI">SI</ToggleButton>
            <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
                "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                    borderColor: "primary.main",
                },
                "&:hover": {
                    backgroundColor: "#8E8E8E",
                    color: "white",
                    borderColor: "#8E8E8E",
                    cursor: "pointer"
            }
            }} value="NO">NO</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
            <Stack direction="column">
            <Typography variant="body1" sx={{ mb: 1, color: "gray" }}>
                CINTURON DE SEGURIDAD
            </Typography>
            <ToggleButtonGroup
            value={form.cinturon}
            exclusive
            onChange={(_, v) => setField('cinturon')(v)}
            sx={{ }}
            >
            <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff",
                "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                    borderColor: "primary.main",
                },
                "&:hover": {
                    backgroundColor: "#8E8E8E",
                    color: "white",
                    borderColor: "#8E8E8E",
                    cursor: "pointer"
            }
            }} value="Colocado">Colocado</ToggleButton>
            <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
                "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                    borderColor: "primary.main",
                },
                "&:hover": {
                    backgroundColor: "#8E8E8E",
                    color: "white",
                    borderColor: "#8E8E8E",
                    cursor: "pointer"
            }
            }} value="No colocado">No colocado</ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Stack direction="column">
            <Typography variant="body1" sx={{ mb: 1, color: "gray" }}>
                DENTRO DEL VEHICULO
            </Typography>
            <ToggleButtonGroup
            value={form.dentro}
            exclusive
            onChange={(_, v) => setField('dentro')(v)}
            sx={{ }}
            >
            <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff",
                "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                    borderColor: "primary.main",
                },
                "&:hover": {
                    backgroundColor: "#8E8E8E",
                    color: "white",
                    borderColor: "#8E8E8E",
                    cursor: "pointer"
            }
            }} value="si">si</ToggleButton>
            <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
                "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                    borderColor: "primary.main",
                },
                "&:hover": {
                    backgroundColor: "#8E8E8E",
                    color: "white",
                    borderColor: "#8E8E8E",
                    cursor: "pointer"
            }
            }} value="no">no</ToggleButton>
            <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
                "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                    borderColor: "primary.main",
                },
                "&:hover": {
                    backgroundColor: "#8E8E8E",
                    color: "white",
                    borderColor: "#8E8E8E",
                    cursor: "pointer"
            }
            }} value="Eyectado">Eyectado</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Stack>

        <Typography variant="body1" sx={{color: "gray" }}>
            ATROPELLADO
        </Typography>

        <ToggleButtonGroup
          value={form.atropellado}
          exclusive
          onChange={(_, v) => setField('atropellado')(v)}
          sx={{mb: 1 }}
        >
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff",
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
          }
          }} value="Automotor">Automotor</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
          }
          }} value="Motocicleta">Motocicleta</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff", 
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
          }
          }} value="Bicicleta">Bicicleta</ToggleButton>
          <ToggleButton sx={{backgroundColor: "#8E8E8E", color: "#f3f3f3ff",
            "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
            },
            "&:hover": {
                backgroundColor: "#8E8E8E",
                color: "white",
                borderColor: "#8E8E8E",
                cursor: "pointer"
          }
          }} value="Maquinaria">Maquinaria</ToggleButton>
        </ToggleButtonGroup>
        
      </Box>

      <Divider sx={{ my: 5}}/>
    </Box>

  );

};

export default OpcionesAccidente;