import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Divider, Stack } from '@mui/material';
import React from 'react';
import PlaceIcon from '@mui/icons-material/PlaceOutlined';
import DirectionsBusFilledOutlinedIcon from '@mui/icons-material/DirectionsBusFilledOutlined';

export type CausaTraumatica = {
  causa: string;
  objetosChoque: string[];
  impactos: string[];
  especifique: string;
  cms: string;
  parabrisas: string;
  volante: string;
  bolsa: string;
  cinturon: string;
  dentro: string;
  atropellado: string;
};

type Props = {
  value: CausaTraumatica;
  onChange: (patch: Partial<CausaTraumatica>) => void;
};

const OpcionesAccidente = ({ value, onChange }: Props) => {
    const commonBtnSx = {
        backgroundColor: '#8E8E8E',
        color: '#f3f3f3ff',
        '&.Mui-selected': { backgroundColor: 'primary.main', color: 'white', borderColor: 'primary.main' },
        '&:hover': { backgroundColor: '#8E8E8E', color: 'white', borderColor: '#8E8E8E', cursor: 'pointer' },
    };

    const handleFieldChange = (field: keyof CausaTraumatica) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange({ [field]: e.target.value } as Partial<CausaTraumatica>);
        };

    const handleSingleSelectChange = (field: keyof CausaTraumatica) =>
        (newValue: string | null) => {
            if (newValue !== null) {
                onChange({ [field]: newValue } as Partial<CausaTraumatica>);
            }
        };

    const handleMultiSelectChange = (field: keyof CausaTraumatica) =>
        (newValue: string[]) => {
            onChange({ [field]: newValue } as Partial<CausaTraumatica>);
        };

    return (
    <Box>
        <Divider sx={{ my: 5}}/>

        <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h6" color="primary">
            AGENTE CAUSAL
            </Typography>
            <PlaceIcon sx={{ mr: 1, color: 'primary.main' }} />
        </Box>
        

        <Box sx={{ width: '100%', maxWidth: { xs: 320, sm: 500, md: 850 }, px: { xs: 1, sm: 2 } }}>
        <ToggleButtonGroup
          value={value.causa}
          exclusive
          onChange={(_, v) => handleSingleSelectChange('causa')(v)}
          sx={{ display: 'grid', 
            gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
                lg: 'repeat(5, 1fr)',
            }
            ,gap: 1, mb: 2, 
            "& .MuiToggleButton-root": {
                borderRadius: 2,
                border: "1px solid #ccc !important",
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
          value={value.especifique}
          onChange={handleFieldChange('especifique')}
        />
        </Box>

        <Divider sx={{ my: 5}}/>

        <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h6" color="primary">
                ACCIDENTE AUTOMOVILISTCICO
            </Typography>
            <DirectionsBusFilledOutlinedIcon sx={{ mr: 1, color: 'primary.main' }}/>
        </Box>
        
      <Box display="flex" flexDirection="column" width='100%' gap={2} mb={2}
        sx={{ maxWidth: { xs: 320, sm: 500, md: 850 }, border: 2, borderColor: 'primary.main', borderRadius: 2, p: 2 }}
      >
        <ToggleButtonGroup
          value={value.objetosChoque}
          onChange={(_, v: string[]) => handleMultiSelectChange('objetosChoque')(v)}
          sx={{ display: 'grid', 
            gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
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
          value={value.impactos}
          onChange={(_, v: string[]) => handleMultiSelectChange('impactos')(v)}
          sx={{mb: 1 , 
            display: 'flex',
            flexWrap: 'wrap',   
            gap: 1,                     
            justifyContent: 'center',
            "& .MuiToggleButton-root": {
            flex: { xs: '1 1 45%', sm: '1 1 30%', md: '1 1 18%' }, 
            minWidth: 120,
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
                value={value.cms}
                onChange={handleFieldChange('cms')}
            />
          </Stack>

          <Stack direction="column">
            <Typography variant="body1" sx={{ mb: 1, color: "gray" }}>
                PARABRISAS
            </Typography>
            <ToggleButtonGroup
            value={value.parabrisas}
            exclusive
            onChange={(_, v) => handleSingleSelectChange('parabrisas')(v)}
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
            value={value.volante}
            exclusive
            onChange={(_, v) => handleSingleSelectChange('volante')(v)}
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
            value={value.bolsa}
            exclusive
            onChange={(_, v) => handleSingleSelectChange('bolsa')(v)}
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
            value={value.cinturon}
            exclusive
            onChange={(_, v) => handleSingleSelectChange('cinturon')(v)}
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
            value={value.dentro}
            exclusive
            onChange={(_, v) => handleSingleSelectChange('dentro')(v)}
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
          value={value.atropellado}
          exclusive
          onChange={(_, v) => handleSingleSelectChange('atropellado')(v)}
          sx={{mb: 1 , 
            display: 'flex',
            flexWrap: 'wrap',   
            gap: 1,                     
            justifyContent: 'center',
            "& .MuiToggleButton-root": {
            flex: { xs: '1 1 45%', sm: '1 1 30%', md: '1 1 18%' }, 
            minWidth: 120,
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