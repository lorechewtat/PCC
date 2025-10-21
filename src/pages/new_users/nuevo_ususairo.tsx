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
  IconButton,
  CircularProgress
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState, useEffect } from "react";

// Tipo para los usuarios
interface User {
  id: number;
  name: string;
  apellido: string;
  email: string;
  role: string;
  password: string;
  turno: string;
}

const roles = ["Administrador", "Paramédico", "Jefe de turno"];
const turnos = ["1", "2", "3", "4", "5"];

// Función para obtener usuarios de la base de datos
const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch('https://localhost:3000/Usuarios');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const PaginaNuevosUsuarios = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({ name: '', apellido: '', turno: '', email: '', role: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const notify = useNotify();
  const redirect = useRedirect();

  // Cargar usuarios cuando el componente se monta
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      const usersData = await fetchUsers();
      setUsers(usersData);
    } catch (error) {
      notify('Error al cargar usuarios de la base de datos', { type: 'error' });
      console.error('Error loading users:', error);
      setUsers([]); // Fallback a array vacío
    } finally {
      setLoadingUsers(false);
    }
  };

  const generateId = () => users.length === 0 ? 1 : Math.max(...users.map(u => u.id)) + 1;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.apellido || !formData.email || !formData.role || !formData.password || !formData.turno) {
      notify('Completa todos los campos', { type: 'warning' });
      return;
    }

    setLoading(true);

    const dataToSend = {
      id: generateId(),
      ...formData
    };

    console.log("Data being sent:", dataToSend);

    try {
      const response = await fetch('https://localhost:3000/Usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("Server response:", result);
        notify("Usuario creado con éxito", { type: "success" });

        // Recargar la lista de usuarios desde la base de datos
        await loadUsers();

        // Limpiar el formulario
        setFormData({ name: '', apellido: '', turno: '', email: '', role: '', password: '' });
      } else if (response.status === 403) {
        notify("El usuario ya existe", { type: "error" });
      } else {
        const errorText = await response.text();
        console.error("Server error:", response.status, errorText);
        throw new Error(`Server error: ${response.status}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      notify("Error al enviar el formulario", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = (id: number) => {
    // Por ahora solo eliminar del estado local
    // TODO: Implementar DELETE endpoint en el backend
    setUsers(users.filter(u => u.id !== id));
    notify('Usuario eliminado (solo local - falta implementar DELETE en backend)', { type: 'info' });
  };

  return (
    <Box p={3} maxWidth="800px">
      <Title title="Gestión de Usuarios - Base de Datos Real" />

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
              disabled={loading}
            />
            <TextField
              fullWidth
              label="Apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
              margin="normal"
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />
            <Box mt={2}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Crear Usuario'}
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
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              Lista de Usuarios ({users.length} total)
            </Typography>
            <Button
              onClick={loadUsers}
              variant="outlined"
              size="small"
              disabled={loadingUsers}
              startIcon={loadingUsers ? <CircularProgress size={16} /> : <RefreshIcon />}
            >
              {loadingUsers ? 'Cargando...' : 'Actualizar'}
            </Button>
          </Box>
          
          {loadingUsers ? (
            <Box display="flex" justifyContent="center" p={3}>
              <CircularProgress />
              <Typography ml={2}>Cargando usuarios...</Typography>
            </Box>
          ) : users.length === 0 ? (
            <Typography color="textSecondary">No hay usuarios en la base de datos.</Typography>
          ) : (
            <List>
              {users.map((user) => (
                <Box key={user.id} display="flex" alignItems="center">
                  <ListItem sx={{ flex: 1 }}>
                    <ListItemText
                      primary={`${user.name} ${user.apellido}`}
                      secondary={`Email: ${user.email} | Rol: ${user.role} | Turno: ${user.turno} | ID: ${user.id}`}
                    />
                  </ListItem>
                  <IconButton 
                    color="error" 
                    onClick={() => handleDelete(user.id)}
                    disabled={loadingUsers}
                  >
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
