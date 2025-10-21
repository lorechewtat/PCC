import { 
  Box, TextField, Typography, Card, CardContent, List, ListItem, 
  ListItemText, Button, Alert, CircularProgress, Chip, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions 
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNotify, Title } from "react-admin";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Define the Report type
interface Report {
  _id?: string;
  id?: string | number;
  datosPaciente?: {
    nombre?: string;
    edadAnios?: string | number;
  };
  datosLugarControl?: {
    socorrista?: string;
  };
  datosCronometria?: {
    fecha?: string;
  };
  datosCausaTraumatica?: {
    causa?: string;
  };
  datosCausaClinica?: {
    origen?: string;
  };
  numAmbulancia?: string | number;
}

// API functions
const fetchAllReports = async (): Promise<Report[]> => {
  const response = await fetch('http://localhost:3000/reportes');
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
};

const searchReportByName = async (nombre: string): Promise<Report | null> => {
  const response = await fetch(`http://localhost:3000/reportes/${encodeURIComponent(nombre)}`);
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

const searchReportsBySocorrista = async (socorrista: string): Promise<Report[]> => {
  const response = await fetch(`http://localhost:3000/reportes/socorrista/${encodeURIComponent(socorrista)}`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
};

const searchReportsByFecha = async (fecha: string): Promise<Report[]> => {
  const response = await fetch(`http://localhost:3000/reportes/fecha/${fecha}`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
};

const searchReportsCombined = async (params: { nombre?: string; socorrista?: string; fecha?: string }): Promise<Report[]> => {
  const searchParams = new URLSearchParams();
  if (params.nombre) searchParams.append('nombre', params.nombre);
  if (params.socorrista) searchParams.append('socorrista', params.socorrista);
  if (params.fecha) searchParams.append('fecha', params.fecha);

  const response = await fetch(`http://localhost:3000/reportes/search?${searchParams.toString()}`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
};

const BuscarReportes = () => {
  // Fix: Properly type the reports state
  const [reports, setReports] = useState<Report[]>([]);
  const [search, setSearch] = useState({ paciente: "", socorrista: "", fecha: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState<'all' | 'nombre' | 'socorrista' | 'fecha' | 'combined'>('all');
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [newId, setNewId] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);

  const notify = useNotify();

  useEffect(() => {
    loadAllReports();
  }, []);

  const loadAllReports = async () => {
    setLoading(true);
    setError(null);
    setSearchMode('all');

    try {
      const data = await fetchAllReports();
      setReports(Array.isArray(data) ? data : []);
      notify('Reportes cargados exitosamente', { type: 'success' });
    } catch (error) {
      setError('Error al cargar reportes de la base de datos');
      notify('Error al cargar reportes', { type: 'error' });
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByName = async () => {
    if (!search.paciente.trim()) {
      notify('Ingresa un nombre de paciente para buscar', { type: 'warning' });
      return;
    }

    setLoading(true);
    setError(null);
    setSearchMode('nombre');

    try {
      const data = await searchReportByName(search.paciente.trim());
      setReports(data ? [data] : []);
      notify(data ? 'Reporte encontrado' : 'No se encontró el reporte', { type: data ? 'success' : 'info' });
    } catch (error) {
      setError('Error al buscar por nombre');
      notify('Error al buscar por nombre', { type: 'error' });
      setReports([]);
    } finally {
      setLoading(false);
    }
  };


  const handleUpdate = (id: string | number | undefined) => {
    const report = reports.find(r => r.id === id || r._id === id);
    if (report) {
      setSelectedReport(report);
      setNewId(report.id?.toString() || '');
      setUpdateModalOpen(true);
    } else {
      notify('No se encontró el reporte para actualizar', { type: 'error' });
    }
  };

  const handleUpdateSubmit = async () => {
    if (!selectedReport || !newId.trim()) {
      notify('Ingresa un nuevo ID válido', { type: 'warning' });
      return;
    }

    if (newId === selectedReport.id?.toString()) {
      notify('El nuevo ID debe ser diferente al actual', { type: 'warning' });
      return;
    }

    setUpdateLoading(true);

    try {
      const currentId = selectedReport.id || selectedReport._id;
      const response = await fetch(`http://localhost:3000/reportes/${encodeURIComponent(currentId!.toString())}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newId: Number(newId) }),
      });

      if (response.ok) {
        const result = await response.json();
        
        // Update local state
        setReports(reports.map(r => 
          (r.id === currentId || r._id === currentId) 
            ? { ...r, id: Number(newId) }
            : r
        ));
        
        notify('ID del reporte actualizado exitosamente', { type: 'success' });
        handleCloseUpdateModal();
        console.log('Report updated:', result);
      } else if (response.status === 404) {
        notify('Reporte no encontrado', { type: 'error' });
      } else if (response.status === 409) {
        notify('El nuevo ID ya existe', { type: 'error' });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error updating report:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      notify(`Error al actualizar reporte: ${errorMessage}`, { type: 'error' });
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedReport(null);
    setNewId('');
    setUpdateLoading(false);
  };

  const handleDelete = async (id: string | number | undefined) => {
    if (!id) {
      notify('No se puede eliminar: ID no válido', { type: 'error' });
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:3000/reportes/${encodeURIComponent(id.toString())}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        const result = await response.json();
        // Remove from local state after successful deletion
        setReports(reports.filter(r => r._id !== id && r.id !== id));
        notify('Reporte eliminado exitosamente', { type: 'success' });
        console.log('Report deleted:', result);
      } else if (response.status === 404) {
        notify('Reporte no encontrado', { type: 'error' });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error deleting report:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      notify(`Error al eliminar reporte: ${errorMessage}`, { type: 'error' });
    }
  };

  const handleSearchBySocorrista = async () => {
    if (!search.socorrista.trim()) {
      notify('Ingresa un nombre de socorrista para buscar', { type: 'warning' });
      return;
    }

    setLoading(true);
    setError(null);
    setSearchMode('socorrista');

    try {
      const data = await searchReportsBySocorrista(search.socorrista.trim());
      setReports(data || []);
      notify(`Se encontraron ${data?.length || 0} reportes`, { type: 'success' });
    } catch (error) {
      setError('Error al buscar por socorrista');
      notify('Error al buscar por socorrista', { type: 'error' });
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByFecha = async () => {
    if (!search.fecha) {
      notify('Selecciona una fecha para buscar', { type: 'warning' });
      return;
    }

    setLoading(true);
    setError(null);
    setSearchMode('fecha');

    try {
      const data = await searchReportsByFecha(search.fecha);
      setReports(data || []);
      notify(`Se encontraron ${data?.length || 0} reportes`, { type: 'success' });
    } catch (error) {
      setError('Error al buscar por fecha');
      notify('Error al buscar por fecha', { type: 'error' });
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCombinedSearch = async () => {
    const hasFilters = search.paciente.trim() || search.socorrista.trim() || search.fecha;
    if (!hasFilters) {
      notify('Ingresa al menos un criterio de búsqueda', { type: 'warning' });
      return;
    }

    setLoading(true);
    setError(null);
    setSearchMode('combined');

    try {
      const searchParams = {
        ...(search.paciente.trim() && { nombre: search.paciente.trim() }),
        ...(search.socorrista.trim() && { socorrista: search.socorrista.trim() }),
        ...(search.fecha && { fecha: search.fecha })
      };

      const data = await searchReportsCombined(searchParams);
      setReports(data || []);
      notify(`Se encontraron ${data?.length || 0} reportes`, { type: 'success' });
    } catch (error) {
      setError('Error en la búsqueda combinada');
      notify('Error en la búsqueda combinada', { type: 'error' });
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearch({ paciente: "", socorrista: "", fecha: "" });
  };

  // Statistics calculations - now properly typed
  const ageDistribution = reports
    .filter((r) => r.datosPaciente?.nombre && r.datosPaciente?.edadAnios)
    .map((r) => ({
      name: r.datosPaciente!.nombre!.split(' ').slice(0, 2).join(' '),
      edad: Number(r.datosPaciente!.edadAnios) || 0
    }));

  const causeStats = reports.reduce(
    (acc, r) => {
      if (r.datosCausaTraumatica?.causa) acc.traumatica += 1;
      if (r.datosCausaClinica?.origen) acc.clinica += 1;
      return acc;
    }, { traumatica: 0, clinica: 0 }
  );

  const causeData = [
    { name: "Traumática", value: causeStats.traumatica },
    { name: "Clínica", value: causeStats.clinica }
  ];

  const reportsByDate: Record<string, number> = {};
  reports.forEach((r) => {
    const fecha = r.datosCronometria?.fecha;
    if (fecha) {
      reportsByDate[fecha] = (reportsByDate[fecha] || 0) + 1;
    }
  });
  const dateData = Object.entries(reportsByDate).map(([fecha, count]) => ({ fecha, count }));

  const getSearchModeText = () => {
    switch (searchMode) {
      case 'nombre': return 'Búsqueda por Nombre Exacto';
      case 'socorrista': return 'Búsqueda por Socorrista';
      case 'fecha': return 'Búsqueda por Fecha';
      case 'combined': return 'Búsqueda Combinada';
      default: return 'Todos los Reportes';
    }
  };

  return (

    <Box p={3} maxWidth="100vw" mx="auto">
      <Title title="Buscar reportes" />
      <Typography variant="h5" gutterBottom>
        Buscar Reportes Médicos - Base de Datos
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            {getSearchModeText()}
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            {/* Search Fields */}
            <TextField
              label="Nombre del Paciente"
              value={search.paciente}
              onChange={(e) => setSearch({ ...search, paciente: e.target.value })}
              fullWidth
              disabled={loading}
            />

            <TextField
              label="Nombre del Socorrista"
              value={search.socorrista}
              onChange={(e) => setSearch({ ...search, socorrista: e.target.value })}
              fullWidth
              disabled={loading}
            />

            <TextField
              label="Fecha"
              type="date"
              value={search.fecha}
              onChange={(e) => setSearch({ ...search, fecha: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
              disabled={loading}
            />

            {/* Search Buttons */}
            <Box display="flex" gap={1} flexWrap="wrap">
              <Button
                variant="contained"
                onClick={handleSearchByName}
                disabled={loading || !search.paciente.trim()}
                size="small"
              >
                {loading && searchMode === 'nombre' ? <CircularProgress size={20} color="inherit" /> : 'Buscar por Nombre'}
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={handleSearchBySocorrista}
                disabled={loading || !search.socorrista.trim()}
                size="small"
              >
                {loading && searchMode === 'socorrista' ? <CircularProgress size={20} color="inherit" /> : 'Buscar por Socorrista'}
              </Button>

              <Button
                variant="contained"
                color="success"
                onClick={handleSearchByFecha}
                disabled={loading || !search.fecha}
                size="small"
              >
                {loading && searchMode === 'fecha' ? <CircularProgress size={20} color="inherit" /> : 'Buscar por Fecha'}
              </Button>

              <Button
                variant="contained"
                color="warning"
                onClick={handleCombinedSearch}
                disabled={loading || (!search.paciente.trim() && !search.socorrista.trim() && !search.fecha)}
                size="small"
              >
                {loading && searchMode === 'combined' ? <CircularProgress size={20} color="inherit" /> : 'Búsqueda Combinada'}
              </Button>
            </Box>

            {/* Action Buttons */}
            <Box display="flex" gap={2}>
              <Button
                variant="outlined"
                onClick={loadAllReports}
                disabled={loading}
              >
                {loading && searchMode === 'all' ? 'Cargando...' : 'Cargar Todos'}
              </Button>

              <Button
                variant="text"
                onClick={clearSearch}
                disabled={loading}
              >
                Limpiar Filtros
              </Button>
            </Box>

            {/* Search Mode Indicator */}
            <Box>
              <Chip
                label={getSearchModeText()}
                color={searchMode === 'all' ? 'default' : 'primary'}
                size="small"
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Resultados ({reports.length} reportes)
          </Typography>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" p={3}>
              <CircularProgress />
              <Typography ml={2}>Buscando reportes...</Typography>
            </Box>
          ) : reports.length === 0 ? (
            <Typography color="textSecondary">
              No se encontraron reportes con los criterios especificados.
            </Typography>
          ) : (
            <List>
              {reports.map((r) => (
                <Box key={r.id || r._id} display="flex" alignItems="center">
                  <ListItem sx={{ flex: 1 }}>
                    <ListItemText
                      primary={`Paciente: ${r.datosPaciente?.nombre || 'N/A'} | Socorrista: ${r.datosLugarControl?.socorrista || 'N/A'}`}
                      secondary={`Fecha: ${r.datosCronometria?.fecha || 'N/A'} | Ambulancia: ${r.numAmbulancia || 'N/A'} | ID: ${r.id || r._id || 'N/A'}`}
                    />
                  </ListItem>
                  <IconButton 
                    color="error" 
                    onClick={() => handleDelete(r.id || r._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton 
                    color="success" 
                    onClick={() => handleUpdate(r.id || r._id)}
                  >
                    <UpdateIcon />
                  </IconButton>
                </Box>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      {/* Update Modal */}
      <Dialog open={updateModalOpen} onClose={handleCloseUpdateModal} maxWidth="sm" fullWidth>
        <DialogTitle>
          Actualizar ID del Reporte
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Paciente: {selectedReport?.datosPaciente?.nombre || 'N/A'}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            ID Actual: {selectedReport?.id || selectedReport?._id || 'N/A'}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Nuevo ID"
            type="number"
            fullWidth
            variant="outlined"
            value={newId}
            onChange={(e) => setNewId(e.target.value)}
            disabled={updateLoading}
            helperText="Ingresa un nuevo ID numérico único para el reporte"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateModal} disabled={updateLoading}>
            Cancelar
          </Button>
          <Button 
            onClick={handleUpdateSubmit} 
            variant="contained" 
            disabled={updateLoading || !newId.trim()}
          >
            {updateLoading ? <CircularProgress size={20} /> : 'Actualizar'}
          </Button>
        </DialogActions>
      </Dialog>

      {reports.length > 0 && (
        <>
          {ageDistribution.length > 0 && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Distribución de Edades
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ageDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="edad" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {(causeStats.traumatica > 0 || causeStats.clinica > 0) && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Causas de Atención
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={causeData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#82ca9d"
                      label
                    >
                      {causeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {dateData.length > 0 && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Reportes por Fecha
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="fecha" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </Box>
  );
};

export default BuscarReportes;
