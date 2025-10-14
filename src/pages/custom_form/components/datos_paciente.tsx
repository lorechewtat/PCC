import { Box, Divider, MenuItem, Paper, TextField, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery } from '@mui/material';
import { Icon } from '@iconify/react';
import { SimpleForm } from 'react-admin';
import React from 'react';
import type { Theme } from '@mui/material/styles';

export type DatosPaciente = {
  nombrePaciente: string;
  sexoPaciente: '' | 'M' | 'F';
  edadAniosPaciente: string;
  edadMesesPaciente: string;
  domicilioPaciente: string;
  coloniaPaciente: string;
  alcaldiaPaciente: string;
  derechohabientePaciente: string;
  telefonoPaciente: string;
  ocupacionPaciente: string;
};

type Props = {
  value: DatosPaciente;
  onChange: (patch: Partial<DatosPaciente>) => void;
};

const DatosPacienteSection = ({ value, onChange }: Props) => {
  const handlePacienteChange =
  (field: keyof DatosPaciente) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value; 
      onChange({ [field]: value } as Partial<DatosPaciente>);
    };
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  return (
      <Box sx={{ fontFamily: 'Inter', mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 1, mt: 4, ml: 1, color: '#203972' }}>
          DATOS DEL PACIENTE
          <Icon icon="mdi:patient" style={{ fontSize: '1.5rem', marginLeft: 8 }} />
        </Typography>

        <Paper elevation={1} sx={{ width: isSmall ? '100%' : 850, p: 2, mt: 1, mb: 2, border: '2px solid #203972', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', gap: 2, mb: 2, alignItems: isSmall ? 'stretch' : 'end' }}>
            <Box sx={{ flex: 1 }}>
              <TextField
                name="nombre"
                label="NOMBRE DEL PACIENTE"
                value={value.nombrePaciente}
                onChange={handlePacienteChange('nombrePaciente')}
                variant="standard"
                fullWidth
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ mb: 1, color: 'gray' }}>
                SEXO
              </Typography>
              <ToggleButtonGroup
                value={value.sexoPaciente}
                exclusive
                onChange={(_, val: '' | 'M' | 'F' | null) => {
                  if (val === null) return;
                  onChange({ sexoPaciente: val });
                }}
              >
                <ToggleButton
                  value="M"
                  sx={{
                    backgroundColor: 'gray',
                    color: 'white',
                    '&.Mui-selected': { backgroundColor: '#203972', color: 'white', '&:hover': { backgroundColor: '#203972' } },
                  }}
                >
                  Masculino
                </ToggleButton>
                <ToggleButton
                  value="F"
                  sx={{
                    backgroundColor: 'gray',
                    color: 'white',
                    '&.Mui-selected': { backgroundColor: '#203972', color: 'white', '&:hover': { backgroundColor: '#203972' } },
                  }}
                >
                  Femenino
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              name="edadAnios"
              variant="standard"
              label="EDAD (AÑOS)"
              type="number"
              value={value.edadAniosPaciente ?? ""}
              onChange={handlePacienteChange('edadAniosPaciente')}
              fullWidth
              inputProps={{ min: 0 }}
            />
            <TextField
              name="edadMeses"
              variant="standard"
              label="EDAD (MESES)"
              type="number"
              value={value.edadMesesPaciente ?? ""}
              onChange={handlePacienteChange('edadMesesPaciente')}
              fullWidth
              inputProps={{ min: 0, max: 11 }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', gap: 2, mb: 2 }}>
            <TextField
              name="domicilio"
              variant="standard"
              label="DOMICILIO"
              value={value.domicilioPaciente}
              onChange={handlePacienteChange('domicilioPaciente')}
              fullWidth
            />
            <TextField
              name="colonia"
              variant="standard"
              label="COLONIA O COMUNIDAD"
              value={value.coloniaPaciente}
              onChange={handlePacienteChange('coloniaPaciente')}
              fullWidth
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', gap: 2, mb: 2 }}>
            <TextField
              name="alcaldia"
              variant="standard"
              select
              label="ALCALDÍA O MUNICIPIO"
              value={value.alcaldiaPaciente}
              onChange={handlePacienteChange('alcaldiaPaciente')}
              fullWidth
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
            <TextField
              name="derechohabiente"
              variant="standard"
              label="DERECHOHABIENTE A"
              value={value.derechohabientePaciente}
              onChange={handlePacienteChange('derechohabientePaciente')}
              fullWidth
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', gap: 2, mb: 2 }}>
            <TextField
              name="telefono"
              variant="standard"
              label="TELÉFONO"
              value={value.telefonoPaciente}
              onChange={handlePacienteChange('telefonoPaciente')}
              fullWidth
              inputProps={{ inputMode: 'tel', maxLength: 20 }}
            />
            <TextField
              name="ocupacion"
              variant="standard"
              label="OCUPACIÓN"
              value={value.ocupacionPaciente}
              onChange={handlePacienteChange('ocupacionPaciente')}
              fullWidth
            />
          </Box>
        </Paper>

        <Divider sx={{ my: 4, color: '#203972' }} />
      </Box>
  );
};

export default DatosPacienteSection;
