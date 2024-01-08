import { defineStore } from "pinia";
import MoshaVueToastify from 'mosha-vue-toastify';
import { insuranceService } from '../modules/insurances/domain/services/InsuranceService'; // Importa tu servicio
import { insuranceRepository } from '../modules/insurances/infrastructure/repositories/insuranceRepository';
import type { Http } from '../modules/insurances/domain/repositories/Http';
import type { Insurance } from "../modules/insurances/domain/models/Insurance";
import { httpFetch } from "~/modules/insurances/infrastructure/instances/httpFetch";

//const { createToast } = MoshaVueToastify;
//const { urlSeguro } = useRuntimeConfig().public;

export const useInsuranceStore = defineStore('insurance', () => {
    const httpClient: Http = httpFetch;
    const repository = insuranceRepository(httpClient);
    const insuranceServiceInstance = insuranceService(repository);

    const insurances: Ref<Insurance[]> = ref([]);
    const isLoading: Ref<boolean> = ref(false);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getTotalPrice = () => {
        return insurances.value.reduce((total, insurance) => total + insurance.price, 0);
    };

    const getInsurances = async () => {
        try {
            console.log('Comenzando la carga de seguros...');
            isLoading.value = true;

            const data = await insuranceServiceInstance.getInsurances();
            console.log('Datos obtenidos:', data);

            insurances.value = data;
            isLoading.value = false;
            console.log('Carga de seguros completada.');

        } catch (error) {
            isLoading.value = false;
            console.error('Error al obtener los seguros:', error);

        } finally {
            console.log('Finalizando la carga de seguros...');
        }
    };

    return {
        insurances,
        isLoading,
        formatDate,
        getTotalPrice,
        getInsurances
    };
}, { persist: true });
