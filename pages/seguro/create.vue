<template>
    <div class="flex items-center justify-center h-screen">
        <div class="max-w-md w-full p-6 bg-white rounded-md shadow-md">
            <h2 class="text-xl font-semibold mb-4">Agregar Nuevo Seguro</h2>
            <form @submit.prevent="createInsurance">
                <div>
                    <label for="name" class="block font-semibold">Nombre</label>
                    <TextInput placeholder="Name: Seguro Vida Ley" v-model:input="name" inputType="text"
                        :error="errors && errors.name ? errors.name[0] : ''" />
                </div>
                <div class="mt-4">
                    <label for="description" class="block font-semibold">Descripción</label>
                    <TextInput placeholder="Description: Descripcion del Seguro" v-model:input="description"
                        inputType="text" :error="errors && errors.description ? errors.description[0] : ''" />
                </div>
                <div class="mt-4">
                    <label for="coverage" class="block font-semibold">Cobertura</label>
                    <TextInput placeholder="Coverage: 10 " v-model:input="coverage" inputType="number"
                        :error="errors && errors.coverage ? errors.coverage[0] : ''" />
                </div>
                <div class="mt-4">
                    <label for="price" class="block font-semibold">Precio</label>
                    <TextInput placeholder="Price: 2000 " v-model:input="price" inputType="number"
                        :error="errors && errors.price ? errors.price[0] : ''" />
                </div>
                <!-- <div class="mb-4">
                        <label for="name" class="block font-semibold">Nombre</label>
                        <input v-model="newInsurance.name" type="text" id="name" name="name"
                            class="w-full border p-2 rounded focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div class="mb-4">
                        <label for="description" class="block font-semibold">Descripción</label>
                        <textarea v-model="newInsurance.description" id="description" name="description" rows="3"
                            class="w-full border p-2 rounded focus:outline-none focus:border-blue-500" required></textarea>
                    </div>
                    <div class="mb-4">
                        <label for="coverage" class="block font-semibold">Cobertura</label>
                        <input v-model="newInsurance.coverage" type="number" id="coverage" name="coverage"
                            class="w-full border p-2 rounded focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div class="mb-4">
                        <label for="price" class="block font-semibold">Precio</label>
                        <input v-model="newInsurance.price" type="number" id="price" name="price"
                            class="w-full border p-2 rounded focus:outline-none focus:border-blue-500" required />
                    </div> -->
                <div class="mt-4">
                    <label for="company" class="block font-semibold">Compañía</label>
                    <select v-model="company.id_company" id="company" name="company"
                        class="w-full border p-2 rounded focus:outline-none focus:border-blue-500" required>
                        <option value="1">Interseguro</option>
                        <option value="2">LaPositiva</option>
                    </select>
                </div>
                <div class="mt-4">
                    <div class="text-right">
                        <LoadingButton :loading="loading" type="submit" class="rounded-full w-full p-3 font-bold"
                            :disabled="(!name || !description || !coverage || !price)" :class="(name && description && coverage && price) ?
                                'bg-[#3B82F6] hover:bg-[#0b63f3] text-white' :
                                'bg-[#EFF0EB] text-[#A7AAA2]'">
                            Agregar Seguro
                        </LoadingButton>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script setup>

import { ref } from 'vue';
import TextInput from '~/features/shared/TextInput.vue';
import LoadingButton from '~~/features/shared/LoadingButton.vue';
import { useInsuranceStore } from '~~/stores/insurance';
const router = useRouter()

const insuranceStore = useInsuranceStore()

let name = ref(null)
let description = ref(null)
let coverage = ref(null)
let price = ref(null)
let errors = ref(null)
let loading = ref(false);
let company = ref({
    id_company: 1,
    name_company: 'Interseguro', // Valor predeterminado para Interseguro
})

const createInsurance = async () => {
    errors.value = null
    loading.value = true
    try {
        const newInsuranceData = {
            name: name.value,
            description: description.value,
            coverage: coverage.value,
            price: price.value,
            company: {
                id_company: company.value.id_company, // Usa company.value.id_company
                name_company: company.value.name_company, // Usa company.value.name_company
            },
        };

        await insuranceStore.createInsurance(newInsuranceData);
        router.push('/insurance')
    } catch (error) {
        console.error('Error al crear el seguro:', error);
        errors.value = error.response.data.errors;
    } finally {
        loading.value = false // Deshabilita la animación de carga cuando termina
    }
}
useHead({
    title: "Crear Seguro",
});
</script>
  