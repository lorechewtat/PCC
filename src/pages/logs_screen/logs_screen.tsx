import React, { useEffect, useState,  } from "react";
import { Title } from "react-admin";
import {
  
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";

interface LogEntry {
  _id?: string;
  timestamp: string;
  sujeto?: string;
  objeto?: string;
  accion?: string;
  detalles?: any;
  endpoint?: string;
  method?: string;
  ip?: string;
}

const LogsView = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    fetch("https://localhost:3000/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch(() => setLogs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box p={2} maxWidth="100vw">
              <Title title="Historial de cambios" />
      
      <Typography variant="h5" gutterBottom>
        Historial de Cambios (Logs)
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table size={isMobile ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                <TableCell>Fecha/Hora</TableCell>
                <TableCell>Sujeto</TableCell>
                <TableCell>Acción</TableCell>
                <TableCell>Objeto</TableCell>
                {!isMobile && <TableCell>Endpoint</TableCell>}
                {!isMobile && <TableCell>IP</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log, idx) => (
                <TableRow key={log._id || idx}>
                  <TableCell>
                    {new Date(log.timestamp).toLocaleString("es-MX")}
                  </TableCell>
                  <TableCell>{log.sujeto || "-"}</TableCell>
                  <TableCell>{log.accion || "-"}</TableCell>
                  <TableCell>{log.objeto || "-"}</TableCell>
                  {!isMobile && <TableCell>{log.endpoint || "-"}</TableCell>}
                  {!isMobile && <TableCell>{log.ip || "-"}</TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default LogsView;
