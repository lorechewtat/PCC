// src/components/section_datos_paciente.tsx
import { Box, Divider, MenuItem, Paper, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Icon } from '@iconify/react';

export type DatosPaciente = {
  nombre: string;
  sexo: '' | 'M' | 'F';
  edadAnios: string;
  edadMeses: string;
  domicilio: string;
  colonia: string;
  alcaldia: string;
  derechohabiente: string;
  telefono: string;
  ocupacion: string;
};

type Props = {
  value: DatosPaciente;
  onChange: (patch: Partial<DatosPaciente>) => void;
};

const DatosPacienteSection = ({ value, onChange }: Props) => {
  const handlePacienteChange =
    (field: keyof DatosPaciente) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange({ [field]: e.target.value });

  return (
    <Box sx={{ fontFamily: 'Inter', mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 1, mt: 4, ml: 1, color: '#203972' }}>
        DATOS DEL PACIENTE
        <Icon icon="mdi:patient" style={{ fontSize: '1.5rem', marginLeft: '8px' }} />
      </Typography>

      <Paper elevation={1} sx={{ width: '100%', p: 2, mt: 1, mb: 2, border: '1px solid #203972', borderRadius: 5 }}>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{display: 'flex', alignItems: 'end'}}>
            <Box sx={{ flex: 1 }}>
              <TextField
                label="NOMBRE DEL PACIENTE"
                value={value.nombre}
                onChange={handlePacienteChange('nombre')}
                variant="standard"
                fullWidth
                InputLabelProps={{ style: { textTransform: 'uppercase' } }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ mb: 1, color: "gray" }}>SEXO</Typography>
              <ToggleButtonGroup
                value={value.sexo}
                exclusive
                onChange={(_, val: '' | 'M' | 'F' | null) => {
                  if (val === null) return;
                  onChange({ sexo: val });
                }}
              >
                <ToggleButton
                  value="M"
                  sx={{
                    backgroundColor: 'gray',
                    color: 'white',
                    '&.Mui-selected': {
                      backgroundColor: '#203972',
                      color: 'white',
                      '&:hover': { backgroundColor: '#203972' },
                    },
                  }}
                >
                  Masculino
                </ToggleButton>
                <ToggleButton
                  value="F"
                  sx={{
                    backgroundColor: 'gray',
                    color: 'white',
                    '&.Mui-selected': {
                      backgroundColor: '#203972',
                      color: 'white',
                      '&:hover': { backgroundColor: '#203972' },
                    },
                  }}
                >
                  Femenino
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
      
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  variant="standard"
                  label="EDAD (AÑOS)"
                  type="number"
                  value={value.edadAnios}
                  onChange={handlePacienteChange('edadAnios')}
                  fullWidth
                  inputProps={{ min: 0 }}
                  InputLabelProps={{ style: { textTransform: 'uppercase' } }}
                />
                <TextField
                  variant="standard"
                  label="EDAD (MESES)"
                  type="number"
                  value={value.edadMeses}
                  onChange={handlePacienteChange('edadMeses')}
                  fullWidth
                  inputProps={{ min: 0, max: 11 }}
                  InputLabelProps={{ style: { textTransform: 'uppercase' } }}
                />
              </Box>
            </Box>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Box sx={{ flex: 1 }}>
              <TextField
                variant="standard"
                label="DOMICILIO"
                value={value.domicilio}
                onChange={handlePacienteChange('domicilio')}
                fullWidth
                InputLabelProps={{ style: { textTransform: 'uppercase' } }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextField
                variant="standard"
                label="COLONIA O COMUNIDAD"
                value={value.colonia}
                onChange={handlePacienteChange('colonia')}
                fullWidth
                InputLabelProps={{ style: { textTransform: 'uppercase' } }}
              />
            </Box>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Box sx={{ flex: 1 }}>
              <TextField
                variant="standard"
                select
                label="ALCALDÍA O MUNICIPIO"
                value={value.alcaldia}
                onChange={handlePacienteChange('alcaldia')}
                fullWidth
                InputLabelProps={{ style: { textTransform: 'uppercase' } }}
              >
                <MenuItem value="Álvaro Obregón">Álvaro Obregón</MenuItem>
                <MenuItem value="Azcapotzalco">Azcapotzalco</MenuItem>
                <MenuItem value="Benito Juárez">Benito Juárez</MenuItem>
                <MenuItem value="Coyoacán">Coyoacán</MenuItem>
                <MenuItem value="Cuajimalpa de Morelos">Cuajimalpa de Morelos</MenuItem>
                <MenuItem value="Cuauhtémoc">Cuauhtémoc</MenuItem>
                <MenuItem value="Gustavo A. Madero">Gustavo A. Madero</MenuItem>
                <MenuItem value="Iztacalco">Iztacalco</MenuItem>
                <MenuItem value="Iztapalapa">Iztapalapa</MenuItem>
                <MenuItem value="La Magdalena Contreras">La Magdalena Contreras</MenuItem>
                <MenuItem value="Miguel Hidalgo">Miguel Hidalgo</MenuItem>
                <MenuItem value="Milpa Alta">Milpa Alta</MenuItem>
                <MenuItem value="Tláhuac">Tláhuac</MenuItem>
                <MenuItem value="Tlalpan">Tlalpan</MenuItem>
                <MenuItem value="Venustiano Carranza">Venustiano Carranza</MenuItem>
                <MenuItem value="Xochimilco">Xochimilco</MenuItem>
              </TextField>
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextField
                variant="standard"
                label="DERECHOHABIENTE A"
                value={value.derechohabiente}
                onChange={handlePacienteChange('derechohabiente')}
                fullWidth
                InputLabelProps={{ style: { textTransform: 'uppercase' } }}
              />
            </Box>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Box sx={{ flex: 1 }}>
              <TextField
                variant="standard"
                label="TELÉFONO"
                value={value.telefono}
                onChange={handlePacienteChange('telefono')}
                fullWidth
                inputProps={{ inputMode: 'tel', maxLength: 20 }}
                InputLabelProps={{ style: { textTransform: 'uppercase' } }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextField
                variant="standard"
                label="OCUPACIÓN"
                value={value.ocupacion}
                onChange={handlePacienteChange('ocupacion')}
                fullWidth
                InputLabelProps={{ style: { textTransform: 'uppercase' } }}
              />
            </Box>
          </Stack>
        </Stack>
      </Paper>

      <Divider sx={{ my: 4, color: '#203972' }} />
    </Box>
  );
};

export default DatosPacienteSection;
