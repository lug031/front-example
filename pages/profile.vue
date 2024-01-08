<template>
    <Header />
    <section class="bg-ct-blue-600 min-h-screen pt-20">
        <div v-if="infoUser">
            <div class="text-center">
                <img :src="infoUser.photoURL" alt="Foto de perfil" class="mx-auto mt-4 rounded-full" width="96" height="96" />
            </div>
            <div class="mt-8 flex justify-center">
                <div class="bg-white p-4 rounded-lg">
                    <ul>
                        <li><strong>Email:</strong> {{ infoUser.email }}</li>
                        <li><strong>Full Name:</strong> {{ infoUser.displayName }}</li>
                        <li><strong>ProviderId:</strong> {{ infoUser.providerId }}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="text-center">
                <h1 class="text-white font-semibold">Por favor inicia sesión para ver tu perfil.</h1>
            </div>
        </div>
    </section>
</template>
  
<script setup>
import Header from '~~/features/shared/Header.vue';
import { useFirebaseAuth } from '~/composables/useFirebaseAuth';
const { infoUser } = useFirebaseAuth();

useHead({
    title: "Profile",
});
</script>