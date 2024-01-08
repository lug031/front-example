import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {
    const {
        apiKey,
        authDomain
    } = useRuntimeConfig().public;

    const firebaseConfig = {
        apiKey,
        authDomain
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    return {
        provide: {
            auth,
        },
    };
});