import { AuthProvider } from "react-admin";
import ppusuario from "./images/nj_copy.jpg";

// Lista de usuarios con roles para prueba
const users = {
  admin: { password: "admin", role: "admin" },
  jefe_turno: { password: "123", role: "jefe_turno" },
  paramedico: { password: "123", role: "paramedico" },
  e_urbanas: { password: "123", role: "emergencias_urbanas" },
};

export const authProvider: AuthProvider = {
  async login({ username, password }) {
    const user = users[username as keyof typeof users];

    if (user && user.password === password) {
      localStorage.setItem("username", username);
      localStorage.setItem("role", user.role);
      return Promise.resolve();
    } else {
      return Promise.reject("Credenciales inválidas");
    }
  },

  async logout() {
    localStorage.removeItem("username");
    return Promise.resolve();
  },

  async checkError({ status }: { status: number }) {
    if (status === 401 || status === 403) {
      localStorage.removeItem("username");
      throw new Error("Sesión expirada");
    }
    return Promise.resolve();
  },

  async checkAuth() {
    if (!localStorage.getItem("username")) {
      throw new Error("No autenticado");
    }
    return Promise.resolve();
  },

  async getIdentity() {
    const username = localStorage.getItem("username");

    if (!username) {
      return Promise.reject("No identity found");
    }

    return Promise.resolve({
      id: username,
      fullName: "Soobin", //TODO: SACAR DE UN BACKEND LOS DATOS
      avatar: ppusuario,
    });
  },

  async getPermissions() {
    const role = localStorage.getItem("userRole");
    return Promise.resolve(role ? [role] : []);
  },
};
