<template>
  <div>
    <Header />
    <section class="bg-ct-blue-600 min-h-screen py-16">
      <div v-if="isLoggedIn">
        <LoadingProgress v-if="isLoading" />
        <div v-else>
          <div class="max-w-6xl mx-auto px-6">
            <div class="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
              <div class="flex justify-between w-full mb-4">
                <LazyNuxtLink to="/seguro/create"
                  class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-[#0b63f3] hover:text-white-500">
                  Nuevo Seguro
                </LazyNuxtLink>
              </div>
              <div class="flex justify-end mt-4">
                <p class="text-xl font-semibold text-[#4d4d4d]">
                  Precio Total: ${{ totalPrice }}
                </p>
              </div>
              <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                <div class="group relative" v-for="insurance in insurances" :key="insurance.id">
                  <div class="rounded-md shadow-md bg-white">
                    <div class="mx-2 mt-2 overflow-hidden rounded-md">
                      <img v-if="insurance.company.id_company === 1" src="~~/assets/images/interseguro-img.png" alt=""
                        class="object-fill w-full h-full" />
                      <img v-else-if="insurance.company.id_company === 2" src="~~/assets/images/positiva-img.png" alt=""
                        class="object-fill w-full h-full" />
                    </div>
                    <div class="p-4">
                      <h5 class="font-semibold text-xl text-[#4d4d4d] mb-4">
                        {{
                          insurance.name.length > 25
                          ? insurance.name.substring(0, 25) + '...'
                          : insurance.name
                        }}
                      </h5>
                      <div class="flex items-center mt-4">
                        <p class="p-1 rounded-sm mr-4 bg-[#dad8d8]">${{ insurance.price }}</p>
                        <p class="text-[#ffa238]">
                          {{ formatDate(insurance.createAt) }}
                        </p>
                      </div>
                    </div>
                    <div class="p-4">
                      <div class="flex items-center">
                        <IconTooling />
                        <p class="text-[#4d4d4d] text-lg ml-2">
                          {{ insurance.company.name_company }}
                        </p>
                      </div>
                    </div>
                    <div class="flex justify-between items-center px-4 pb-4">
                      <div class="flex items-center">
                        <p class="text-sm font-semibold">{{ insurance.coverage }}</p>
                        <p class="ml-4 text-sm font-semibold">
                          {{ insurance.description.length > 50
                            ? insurance.description.substring(0, 50) + '...'
                            : insurance.description }}
                        </p>
                      </div>
                      <div class="relative">
                        <div class="text-3xl text-[#4d4d4d] cursor-pointer p-3" @click="toggleSettings(insurance)">
                          ...
                        </div>
                        <ul
                          class="absolute bottom-5 -right-1 z-50 py-2 rounded-sm bg-white shadow-lg transition ease-out duration-300"
                          v-if="insurance.showSettings">
                          <li
                            class="w-24 h-7 py-3 px-2 hover:bg-[#f5f5f5] flex items-center gap-2 cursor-pointer transition ease-in duration-300"
                            @click="openDetailModal(insurance)">
                            <i class="bx bx-show"></i> <span>Ver</span>
                          </li>
                          <li
                            class="w-24 h-7 py-3 px-2 hover:bg-[#f5f5f5] flex items-center gap-2 cursor-pointer transition ease-in duration-300"
                            @click="openEditModal(insurance)">
                            <i class="bx bx-show"></i> <span>Editar</span>
                          </li>
                          <li
                            class="w-24 h-7 py-3 px-2 hover:bg-[#f5f5f5] flex items-center gap-2 cursor-pointer transition ease-in duration-300"
                            @click="onDelete(insurance)">
                            <i class="bx bx-trash"></i> <span>Eliminar</span>
                          </li>
                          <li
                            class="w-24 h-7 py-3 px-2 hover:bg-[#f5f5f5] flex items-center gap-2 cursor-pointer transition ease-in duration-300"
                            @click="addToPortfolio(insurance)">
                            <i class="bx bx-plus"></i> <span>Agregar</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Message v-if="insurances && insurances.length === 0" />
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="text-center">
          <p class="text-white font-semibold">Inicie sesión para ver esta página.</p>
        </div>
      </div>
    </section>
    <teleport to="body">
      <EditInsurance :selectedEditInsurance="selectedEditInsurance" :onClose="closeEditModal"
        v-if="selectedEditInsurance" />
      <VerInsurance :selectedViewInsurance="selectedViewInsurance" :onClose="closeDetailModal"
        v-if="selectedViewInsurance" />
    </teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Header from '~~/features/shared/Header.vue';
import LoadingProgress from '~~/features/shared/LoadingProgress.vue';
import IconTooling from '~~/features/shared/IconTooling.vue';
import { useInsuranceStore } from '~~/stores/insurance';
import { useUserPortfolioStore } from '~~/stores/portafolio';
import { useUserStore } from '~~/stores/user';
import Message from '~/features/shared/Message.vue';
import VerInsurance from '~/features/insurances/ver-insurance/VerInsurance.vue';
import EditInsurance from '~/features/insurances/edit-insurance/EditInsurance.vue';

const userStore = useUserStore();
const userPortfolioStore = useUserPortfolioStore();
const insuranceStore = useInsuranceStore();

const { insurances, formatDate, getInsurances, getTotalPrice } = useInsuranceStore();

const isLoggedIn = userStore.isLoggedIn;
const isLoading = insuranceStore.isLoading;

const searchTerm = ref('');

const selectedEditInsurance = ref(null);
const selectedViewInsurance = ref(null);

const openEditModal = (insurance) => {
  selectedEditInsurance.value = insurance;
};

const closeEditModal = () => {
  selectedEditInsurance.value = null;
};

const openDetailModal = (insurance) => {
  selectedViewInsurance.value = insurance;
};

const closeDetailModal = () => {
  selectedViewInsurance.value = null;
};

onMounted(async () => {
  try {
    console.log('Obteniendo seguros...');
    await getInsurances();
  } catch (error) {
    console.error('Error al obtener seguros:', error);
  }
});

const onDelete = async (insurance) => {
  const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este seguro?');

  if (confirmDelete) {
    try {
      await insuranceStore.deleteInsurance(insurance.id);
    } catch (error) {
      console.error('Error al eliminar el seguro:', error);
    }
  }
}

const addToPortfolio = async (insurance) => {
  try {
    console.log(insurance.coverage)
    await userPortfolioStore.addInsurance(insurance);
  } catch (error) {
    console.error('Error al agregar el seguro al portafolio:', error);
  }
};

const toggleSettings = (insurance) => {
  if (insurances.value) {
    insurances.value.forEach((ins) => {
      if (ins !== insurance) {
        ins.showSettings = false;
      }
    });
  }
  if (insurance) {
    insurance.showSettings = !insurance.showSettings;
  }
};

const totalPrice = computed(() => getTotalPrice());

useHead({
  title: "Insurance",
});
</script>
