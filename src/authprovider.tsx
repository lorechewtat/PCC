import { AuthProvider } from "react-admin";
import ppusuario from './images/nj_copy.jpg';

export const authProvider: AuthProvider = {
    async login({ username, password }) {
        if (username === "123" && password === "123") {
            localStorage.setItem("username", username);
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
    }
};
