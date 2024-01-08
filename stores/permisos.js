import { defineStore } from "pinia";

const { urlPermisos } = useRuntimeConfig().public;

export const usePermisosStore = defineStore('permisos', {
    state: () => ({
        authPermisos: [],
    }),

    getters: {
    },

    actions: {
        async fetchPermissions(correo, accessToken) {
            try {
                const apiUrl = urlPermisos + `/authority/${correo}`;
                const response = await fetch(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    return data.authority[0].permissions;
                } else {
                    console.error('Error al cargar los permisos:', response.status, response.statusText);
                    return [];
                }
            } catch (error) {
                console.error('Error al cargar los permisos:', error);
                return [];
            }
        },
        setAuthPermisos(permisos) {
            this.authPermisos = permisos;
        }
    },
    persist: true,
});
