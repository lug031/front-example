<template>
    <Header />
    <section class="bg-ct-blue-600 min-h-screen pt-20">
        <div v-if="isLoggedIn" class="max-w-4xl mx-auto bg-white rounded-md h-[20rem] flex justify-center items-center">
            <p class="text-5xl font-semibold">TITULO 1</p>
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
import { useUserStore } from '~~/stores/user';

const userStore = useUserStore()
const isLoggedIn = userStore.isLoggedIn;

useHead({
    title: "Titulo 1",
});
</script>