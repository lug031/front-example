<template>
    <div class="fixed inset-0 flex items-center justify-center z-50">
        <div class="bg-white p-4 w-96 rounded-lg shadow-lg">
            <h2 class="text-xl font-semibold mb-4">Detalle del Seguro</h2>
            <div>
                <p><strong>Nombre:</strong> {{ selectedViewInsurance.name }}</p>
                <p><strong>Descripción:</strong> {{ selectedViewInsurance.description }}</p>
                <p><strong>Cobertura:</strong> {{ selectedViewInsurance.coverage }}</p>
                <p><strong>Precio:</strong> ${{ selectedViewInsurance.price }}</p>
                <p><strong>Compañía:</strong> {{ selectedViewInsurance.company.name_company }}</p>
                <p><strong>Fecha de Creación:</strong> {{ insuranceStore.formatDate(selectedViewInsurance.createAt) }}</p>
            </div>
            <div class="mt-4 text-right">
                <button @click="closeDetailModal" class="px-4 py-2 bg-[#3B82F6] text-white rounded-md">Cerrar</button>
            </div>
        </div>
    </div>
</template>
  
<script>
import { useInsuranceStore } from '~/stores/insurance';

export default {
    props: {
        selectedViewInsurance: Object,
        onClose: Function,
    },
    setup(props) {
        const insuranceStore = useInsuranceStore();

        const closeDetailModal = () => {
            props.onClose();
        };
        return {
            closeDetailModal,
            insuranceStore
        };
    },
};
</script>
  