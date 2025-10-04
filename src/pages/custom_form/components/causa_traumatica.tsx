import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Divider, Stack } from '@mui/material';
import {useState } from 'react';
import { useNotify } from "react-admin";
import PlaceIcon from '@mui/icons-material/PlaceOutlined';
import DirectionsBusFilledOutlinedIcon from '@mui/icons-material/DirectionsBusFilledOutlined';

const OpcionesAccidente = () => {
    //const notify = useNotify();
    const commonBtnSx = {
        backgroundColor: '#8E8E8E',
        color: '#f3f3f3ff',
        '&.Mui-selected': { backgroundColor: 'primary.main', color: 'white', borderColor: 'primary.main' },
        '&:hover': { backgroundColor: '#8E8E8E', color: 'white', borderColor: '#8E8E8E', cursor: 'pointer' },
    };

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
        

        <Box sx={{ width: '100%', maxWidth: { xs: 360, sm: 500, md: 850 }, px: { xs: 1, sm: 2 } }}>
        <ToggleButtonGroup
          value={form.causa}
          exclusive
          onChange={(_, v) => setField('causa')(v)}
          sx={{ display: 'grid', 
            gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',     // teléfonos
                sm: 'repeat(3, 1fr)',     // tablets
                md: 'repeat(4, 1fr)',     // laptops
                lg: 'repeat(5, 1fr)',     // desktop grande (tu valor actual)
            }
            ,gap: 1, mb: 2, 
            "& .MuiToggleButton-root": {
                borderRadius: 2,      // fuerza esquinas redondeadas
                border: "1px solid #ccc !important", // evita que se fusionen
                padding: '30px 10px'
            }
          }}
        >
          <ToggleButton sx={commonBtnSx} value="Anima">Anima</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Juguete">Juguete</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Explosion">Explosión</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Fuego">Fuego</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Animal">Animal</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Bicicleta">Bicicleta</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Automotor">Automotor</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Maquinaria">Maquinaria</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Herramienta">Herramienta</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Electricidad">Electricidad</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="sustancia caliente">sustancia caliente</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="sustancia toxica">sustancia toxica</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Producto Biologico">Producto Biologico</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="g humano">g humano</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="otro">Otro</ToggleButton>
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
        
      <Box display="flex" flexDirection="column" width='100%' gap={2} mb={2}
        sx={{ maxWidth: { xs: 360, sm: 500, md: 850 }, border: 2, borderColor: 'primary.main', borderRadius: 2, p: 2 }}
      >
        <ToggleButtonGroup
          value={form.objetosChoque}
          //exclusive
          onChange={(_, v: string[]) => setField('objetosChoque')(v)}
          sx={{ display: 'grid', 
            gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',     // teléfonos
                sm: 'repeat(3, 1fr)',     // tablets
                md: 'repeat(3, 1fr)',     // laptops
                lg: 'repeat(4, 1fr)',     // desktop grande (tu valor actual)
            },
            gap: 1, mb: 2, 
            "& .MuiToggleButton-root": {
                borderRadius: 2,      
                border: "1px solid #ccc !important", 
                padding: "30px 0"
            }
          }}
        >
          <ToggleButton sx={commonBtnSx} value="Colision">Colisión</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Volcadura">Volcadura</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Automotor">Automotor</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Bicicleta">Bicicleta</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Motocicleta">Motocicleta</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Maquinaria">Maquinaria</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Contra Objeto Fijo">Contra Objeto Fijo</ToggleButton>
        </ToggleButtonGroup>

        <Typography variant="body1" sx={{color: "gray" }}>
            IMPACTO
        </Typography>

        <ToggleButtonGroup
          value={form.impactos}
          exclusive
          onChange={(_, v: string[]) => setField('impactos')(v)}
          sx={{mb: 1 , 
            display: 'flex',
            flexWrap: 'wrap',   
            gap: 1,                     
            justifyContent: 'center',   // opcional, para centrar el contenido
            "& .MuiToggleButton-root": {
            
            flex: { xs: '1 1 45%', sm: '1 1 30%', md: '1 1 18%' }, 
            minWidth: 120,            // evita botones demasiado pequeños
            }
        }}
        >
          <ToggleButton sx={commonBtnSx} value="Posterior">Posterior</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Volcadura">Volcadura</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Rotacional">Rotacional</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Frontal">Frontal</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Lateral">Lateral</ToggleButton>
        </ToggleButtonGroup>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={6} sx={{display: 'flex', alignItems: {xs: 'self-start', sm: 'end'}, mb: 3, justifyContent: "space-between"}}>
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
            <ToggleButton sx={commonBtnSx} value="Integro">Integro</ToggleButton>
            <ToggleButton sx={commonBtnSx} value="Estrellado">Estrellado</ToggleButton>
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
            <ToggleButton sx={commonBtnSx} value="Integro">Integro</ToggleButton>
            <ToggleButton sx={commonBtnSx} value="Doblado">Doblado</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={6} sx={{display: 'flex', alignItems: {xs: 'self-start', sm: 'end'}, justifyContent: "space-between"}}>
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
            <ToggleButton sx={commonBtnSx} value="SI">SI</ToggleButton>
            <ToggleButton sx={commonBtnSx} value="NO">NO</ToggleButton>
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
            <ToggleButton sx={commonBtnSx} value="Colocado">Colocado</ToggleButton>
            <ToggleButton sx={commonBtnSx} value="No colocado">No colocado</ToggleButton>
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
            <ToggleButton sx={commonBtnSx} value="si">si</ToggleButton>
            <ToggleButton sx={commonBtnSx} value="no">no</ToggleButton>
            <ToggleButton sx={commonBtnSx} value="Eyectado">Eyectado</ToggleButton>
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
          sx={{mb: 1 , 
            display: 'flex',
            flexWrap: 'wrap',   
            gap: 1,                     
            justifyContent: 'center',   // opcional, para centrar el contenido
            "& .MuiToggleButton-root": {
            
            flex: { xs: '1 1 45%', sm: '1 1 30%', md: '1 1 18%' }, 
            minWidth: 120,            // evita botones demasiado pequeños
            }
          }}
        >
          <ToggleButton sx={commonBtnSx} value="Automotor">Automotor</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Motocicleta">Motocicleta</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Bicicleta">Bicicleta</ToggleButton>
          <ToggleButton sx={commonBtnSx} value="Maquinaria">Maquinaria</ToggleButton>
        </ToggleButtonGroup>
        
      </Box>

      <Divider sx={{ my: 5}}/>
    </Box>

  );

};

export default OpcionesAccidente;