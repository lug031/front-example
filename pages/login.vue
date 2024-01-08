<template>
    <div>
        <Header />
        <section class="bg-ct-blue-600 min-h-screen pt-20">
            <LoadingProgress v-if="isLoadingLogin" />
            <div v-if="!isLoggedIn">

                <!--if successful -->
                <NxAlert v-if="loginSuccess" theme="success" :show-close="false">
                    <strong>Login successful</strong>
                </NxAlert>

                <!-- Error message -->
                <NxAlert v-if="loginError" theme="danger" @click="loginError = null">
                    <strong>{{ loginError.message }}</strong>
                </NxAlert>

                <NxCard header="Login" text="" class="login-card">
                    <button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-[#0b63f3] hover:text-white-500"
                        @click="loginWithGoogle">Login with Google</button>
                    <IamOrSeparator />
                    <NxForm :data="inputData" submit-text="Login" @submit="loginUser" />
                    <div class="register-forgot">
                        <div>
                            <NuxtLink to="">Register</NuxtLink>
                        </div>
                        <div class="forgot">
                            <NuxtLink to="">Forgot Password?</NuxtLink>
                        </div>
                    </div>
                </NxCard>
            </div>
            <div v-else>
                <div class="text-center">
                    <p class="text-white font-semibold">Ya ha iniciado sesión.</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: "auth"
})
import { ref } from 'vue';
import Header from '~~/features/shared/Header.vue';
import type { User, NxFormInput } from '~~/types/types';
import { useUserStore } from '~~/stores/user';
import { usePermisosStore } from '~~/stores/permisos';
import { useFirebaseAuth } from '~/composables/useFirebaseAuth';
import LoadingProgress from '~/features/shared/LoadingProgress.vue';
import NxAlert from '~/features/shared/NxAlert.vue';
import IamOrSeparator from '~/features/shared/IamOrSeparator.vue';
import NxForm from '~/features/shared/NxForm.vue';
import NxCard from '~/features/shared/NxCard.vue';

const { loginGoogleAuth } = useFirebaseAuth();
const userStore = useUserStore();
const permisosStore = usePermisosStore();
//const allowGoogleAuth = useRuntimeConfig().public.iamAllowGoogleAuth === "true";
const isLoggedIn = userStore.isLoggedIn;
const isLoadingLogin = userStore.isLoadingLogin;

// Error variable
const loginError = ref(<Error | null>null);
const loginSuccess = ref(false);

// Data for login form
const inputData = [
    {
        label: "Email",
        id: "email",
        type: "input:email",
    },
    {
        label: "Password",
        id: "password",
        type: "input:password",
    },
] as Array<NxFormInput>;

async function loginUser(user: User) {
    //Normal login
}

async function loginWithGoogle() {
    try {
        const result = await loginGoogleAuth();
        const user = result.user;
        //const refreshToken = user.refreshToken;

        // Accede al token de acceso
        const token = await user.getIdToken();
        //const tokenResult = await user.getIdTokenResult();

        //console.log("Expiration time", tokenResult.expirationTime)

        userStore.setIsLoggedIn(true);
        // Cargar los permisos después de la autenticación exitosa
        const correo = user.email;
        const permissions = await permisosStore.fetchPermissions(correo, token);

        // Construye el menú dinámico
        const isAuthPermisosMenu = permissions.map((permission: { titulo: any; url: any; }) => ({
            name: permission.titulo,
            link: permission.url,
        }));

        // Almacena el menú de permisos en el store
        userStore.setAuthPermisos(isAuthPermisosMenu);

        // Redirige a la página de bienvenida
        // Check for error
        if (!user) {
            loginError.value = {} as Error;
            loginError.value.message = "Falló el inicio de sesión";
        }
        else {
            loginSuccessful();
        }

        console.log("User info", user);
        console.log("Access Token", token);
    } catch (error) {
        console.error("Authentication error:", error);
    }
}

/**
 * @desc Steps to take when login is successful
 */
async function loginSuccessful() {
    userStore.setLoadingLogin();
    loginSuccess.value = true;
    setTimeout(() => {
        navigateTo("/welcome");
    }, 300);
}

useHead({
    title: "Login",
});
</script>

<style scoped>
.register-forgot {
    display: flex;
}

.register-forgot a {
    text-decoration: none;
}

.forgot {
    margin-left: auto;
}

.login-card {
    margin: auto;
}
</style>