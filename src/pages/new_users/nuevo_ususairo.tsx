// pages/new_users/custom_form.tsx
import { useNotify, useRedirect, Title } from "react-admin";
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Card, 
  CardContent,
  List, 
  ListItem, 
  ListItemText,
  MenuItem,
  IconButton
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";

  //TODO NAJAR LSO DATOS AQUI DE LA BASE REAL Y SINCRONIZAR
const initialUsers = [
  { id: 1, name: "Juan", apellido: "Pérez", email: "juan@example.com", role: "Administrador", password: "1234", turno: "1" },
  { id: 2, name: "María", apellido: "García", email: "maria@example.com", role: "Paramédico", password: "abcd", turno: "2" },
  { id: 3, name: "Carlos", apellido: "López", email: "carlos@example.com", role: "Jefe de turno", password: "pass", turno: "3" },
];

const roles = ["Administrador", "Paramédico", "Jefe de turno"];
const turnos = ["1", "2","3","4","5"];

const PaginaNuevosUsuarios = () => {
  const [users, setUsers] = useState(initialUsers);
  const [formData, setFormData] = useState({ name: '', apellido: '', turno: '', email: '', role: '', password: '' });
  const [loading, setLoading] = useState(false);

  const notify = useNotify();
  const redirect = useRedirect();

  const generateId = () => users.length === 0 ? 1 : Math.max(...users.map(u => u.id)) + 1;


  //TODO CONECTAR ESTO A LA BASE DE DATOS REALES
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.apellido || !formData.email || !formData.role || !formData.password || !formData.turno) {
      notify('Completa todos los campos', { type: 'warning' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newUser = { id: generateId(), ...formData };
      setUsers([...users, newUser]);
      setFormData({ name: '', apellido: '', turno: '', email: '', role: '', password: '' });
      notify('Usuario creado exitosamente', { type: 'success' });
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
    notify('Usuario eliminado', { type: 'info' });
  };

  return (
    <Box p={3} maxWidth="800px">
      <Title title="Formulario Personalizado - Prueba de Inserción y Lectura" />

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Crear Nuevo Usuario
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              select
              fullWidth
              label="Rol"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              margin="normal"
            >
              {roles.map((r) => (
                <MenuItem key={r} value={r}>{r}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Turno"
              name="turno"
              value={formData.turno}
              onChange={handleChange}
              required
              margin="normal"
            >
              {turnos.map((t) => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              margin="normal"
            />
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? 'Creando...' : 'Crear Usuario'}
              </Button>
              <Button 
                onClick={() => setFormData({ name: '', apellido: '', turno: '', email: '', role: '', password: '' })} 
                variant="outlined" 
                disabled={loading} 
                sx={{ ml: 2 }}
              >
                Limpiar
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Lista de Usuarios (Lectura - {users.length} total)
          </Typography>
          {users.length === 0 ? (
            <Typography color="textSecondary">No hay usuarios.</Typography>
          ) : (
            <List>
              {users.map((user) => (
                <Box key={user.id} display="flex" alignItems="center">
                  <ListItem sx={{ flex: 1 }}>
                    <ListItemText
                      primary={`${user.name} ${user.apellido}`}
                      secondary={`Email: ${user.email} | Rol: ${user.role} | Turno: ${user.turno} | Contraseña: ${user.password}`}
                    />
                  </ListItem>
                  <IconButton color="error" onClick={() => handleDelete(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </List>
          )}
       
        </CardContent>
      </Card>
    </Box>
  );
};

export default PaginaNuevosUsuarios;
