import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
        user: null,
        isLoggedIn: false,
        isLoadingLogin: true,
        authPermisos: [],
    }),

    getters: {
        totalUsers: (state) => state.users.length,
    },

    actions: {
        setUser(userData) {
            this.user = userData;
        },
        setLoadingLogin() {
            this.isLoading = false;
        },
        setIsLoggedIn(value) {
            this.isLoggedIn = value;
        },
        setAuthPermisos(permisos) {
            this.authPermisos = permisos;
        }
    },
    persist: true,
})