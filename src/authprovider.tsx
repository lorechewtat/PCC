import { AuthProvider } from "react-admin";
import ppusuario from "./images/nj_copy.jpg";

export const authProvider: AuthProvider = {
  async login({ username, password }) {
    const request = new Request(import.meta.env.VITE_BACKEND + "/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    try {
      const response = await fetch(request);

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const userData = await response.json();
      console.log("Datos del usuario:", userData);

      // Guardar en sessionStorage
      sessionStorage.setItem("auth", "authenticated");
      sessionStorage.setItem("token", userData.token);
      sessionStorage.setItem("username", userData.email);
      sessionStorage.setItem("role", userData.role);
      sessionStorage.setItem(
        "identity",
        JSON.stringify({
          id: userData.id,
          fullName: userData.nombre,
        }),
      );

      return Promise.resolve();
    } catch (error: any) {
      console.error("Error en login:", error);
      throw new Error(error.message || "Error en usuario o password");
    }
  },

  async logout() {
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("identity");
    sessionStorage.removeItem("userData");
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
    return sessionStorage.getItem("auth")
      ? Promise.resolve()
      : Promise.reject();
  },

  async getIdentity() {
    const identityStr = sessionStorage.getItem("identity");

    if (!identityStr) {
      return Promise.reject("No identity found");
    }

    try {
      const identity = JSON.parse(identityStr);

      return Promise.resolve({
        id: identity.id,
        fullName: identity.fullName,
        avatar: ppusuario,
      });
    } catch (error) {
      return Promise.reject("Error al cargar datos del usuario");
    }
  },

  async getPermissions() {
    const role = sessionStorage.getItem("role");
    return Promise.resolve(role ? [role] : []);
  },
};
