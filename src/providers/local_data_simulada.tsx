// src/providers/localDataProvider.js
import usersData from '../data/base_domy.json'; // Ajusta la ruta si tu JSON está en otro lugar

// Carga los datos en memoria (array mutable para create)
let users = [...usersData]; // Copia para no modificar el JSON original

// Función helper para generar ID único (simple, incrementa el último ID)
const generateId = () => {
  if (users.length === 0) return 1;
  return Math.max(...users.map(u => u.id)) + 1;
};

// DataProvider custom
const localDataProvider = {
  getList: (resource: string, params: { filter?: any; pagination?: any; }) => {
    if (resource !== 'users') {
      throw new Error(`Resource ${resource} no soportado`);
    }
    // Simula paginación y filtros (básico)
    let data = [...users];
    const { pagination } = params;
    const { page, perPage } = pagination;

    // Filtro simple por q (búsqueda)
    if (params.filter && params.filter.q) {
      data = data.filter(user =>
        user.name.toLowerCase().includes(params.filter.q.toLowerCase()) ||
        user.email.toLowerCase().includes(params.filter.q.toLowerCase())
      );
    }

    // Paginación
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedData = data.slice(start, end);
    const total = data.length;

    return Promise.resolve({
      data: paginatedData,
      total: total,
    });
  },

  getOne: (resource: string, params: { id: number; }) => {
    if (resource !== 'users') {
      throw new Error(`Resource ${resource} no soportado`);
    }
    const user = users.find(u => u.id === params.id);
    if (!user) {
      throw new Error(`Usuario con ID ${params.id} no encontrado`);
    }
    return Promise.resolve({ data: user });
  },

  create: (resource: string, params: { data: any; }) => {
    if (resource !== 'users') {
      throw new Error(`Resource ${resource} no soportado`);
    }
    const newUser = { ...params.data, id: generateId() };
    users.push(newUser); // Agrega al array en memoria
    return Promise.resolve({ data: newUser });
  },

  // Opcional: update y delete si los necesitas
  update: (resource: string, params: { id: number; data: { id: number; name: string; email: string; role: string; }; }) => {
    if (resource !== 'users') {
      throw new Error(`Resource ${resource} no soportado`);
    }
    const index = users.findIndex(u => u.id === params.id);
    if (index === -1) {
      throw new Error(`Usuario con ID ${params.id} no encontrado`);
    }
    users[index] = { ...params.data, id: params.id };
    return Promise.resolve({ data: users[index] });
  },

  delete: (resource: string, params: { id: number; }) => {
    if (resource !== 'users') {
      throw new Error(`Resource ${resource} no soportado`);
    }
    const index = users.findIndex(u => u.id === params.id);
    if (index === -1) {
      throw new Error(`Usuario con ID ${params.id} no encontrado`);
    }
    users.splice(index, 1);
    return Promise.resolve({ data: { id: params.id } });
  },

  // Métodos requeridos por React Admin (devuelven vacío si no se usan)
  getMany: () => Promise.resolve({ data: [] }),
  getManyReference: () => Promise.resolve({ data: [], total: 0 }),
  updateMany: () => Promise.resolve({ data: [] }),
  deleteMany: () => Promise.resolve({ data: [] }),
};

export default localDataProvider;
