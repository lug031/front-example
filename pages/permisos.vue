<template>
    <Header />
    <section class="bg-ct-blue-600 min-h-screen pt-20 flex flex-col items-center justify-start">
        <div v-if="isLoggedIn">
            <button @click="consultarPermisos"
                class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-[#0b63f3] hover:text-white-500 mb-4">
                Consultar Permisos
            </button>
            <div v-if="mostrarPermisos" class="mt-4">
                <div class="mt-8 flex justify-center">
                    <div class="bg-white p-4 rounded-lg">
                        <ul>
                            <li v-for="permission in authorities">
                            <li><strong>Código Opción: </strong> {{ permission.codigoOpcion }}</li>
                            <li><strong>Código Opción Padre: </strong> {{ permission.codigoOpcionPadre }}</li>
                            <li><strong>Descripcion Operación Azman: </strong> {{ permission.descripcionOperacionAzman
                            }}
                            </li>

                            <li><strong>Nombre Operación Azman: </strong> {{ permission.nombreOperacionzman }}</li>
                            <li><strong>Nro Operación Azman: </strong> {{ permission.nroOperacionAzman }}</li>
                            <li><strong>Orden: </strong> {{ permission.orden }}</li>

                            <li><strong>Ruta Icono: </strong> {{ permission.rutaIcono }}</li>
                            <li><strong>Tipo Opción: </strong> {{ permission.tipoOpcion }}</li>
                            <li><strong>Título: </strong> {{ permission.titulo }}</li>

                            <li><strong>Tooltip: </strong> {{ permission.toolTip }}</li>
                            <li><strong>Url: </strong> {{ permission.url }}</li>
                            <li><strong>Visible: </strong> {{ permission.visible }}</li>
                            <br>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-else-if="error" class="mt-4 text-white">
                Algo falló al consultar los permisos.
            </div>
        </div>
        <div v-else>
            <div class="text-center">
                <p class="text-white font-semibold">Inicie sesión para ver esta página.</p>
            </div>
        </div>
    </section>
</template>
  
<script setup>
import Header from '~~/features/shared/Header.vue';
import { usePermisosStore } from '~~/stores/permisos';
import { useUserStore } from '~~/stores/user';
import { useFirebaseAuth } from '~/composables/useFirebaseAuth';

const { infoUser, logout } = useFirebaseAuth();

const userStore = useUserStore()
const permisosStore = usePermisosStore();
const user = infoUser;

const isLoggedIn = userStore.isLoggedIn;
const correo = ref(infoUser.email);
const accessToken = ref();
const mostrarPermisos = ref(false);
const authorities = ref([]);
const error = ref(false);

const inactivityTimeout = 30000;
let inactivityTimer;

const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(async () => {
        console.log("Se cerrará la sesion")
        userStore.setIsLoggedIn(false);
        await logout();
    }, inactivityTimeout);
};

document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);

const consultarPermisos = async () => {
    const correoConsulta = correo.value;

    await validateAccessToken();

    const accessTokenConsulta = accessToken.value;

    const response = await permisosStore.fetchPermissions(correoConsulta, accessTokenConsulta);

    if (response && response.length > 0) {
        authorities.value = response;
        mostrarPermisos.value = true;
    } else {
        error.value = true;
    }

    resetInactivityTimer();
};

const validateAccessToken = async () => {
    try {
        const tokenResult = await user?.getIdTokenResult();
        console.log(tokenResult.token)

        console.log("tokenResult?")
        console.log(tokenResult)

        console.log(new Date(tokenResult.expirationTime))

        if (tokenResult) {
            const newToken = tokenResult.token;
            accessToken.value = newToken;
        }
    } catch (error) {
        console.error('Error renewing access token:', error);
    }
};

useHead({
    title: "Permisos",
});
</script>
  