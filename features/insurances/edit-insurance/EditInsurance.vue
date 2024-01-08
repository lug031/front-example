<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white p-4 w-96 rounded-lg shadow-lg">
      <!-- Contenido del formulario de edición -->
      <h2 class="text-xl font-semibold mb-4">Editar Seguro</h2>
      <form @submit.prevent="editInsurance">
        <div>
          <label for="name" class="block font-semibold">Nombre</label>
          <input v-model="editedInsurance.name" type="text" id="name" name="name"
            class="w-full border p-2 rounded focus:outline-none focus:border-blue-500" required />
        </div>
        <div class="mt-4">
          <label for="description" class="block font-semibold">Descripción</label>
          <textarea v-model="editedInsurance.description" id="description" name="description" rows="3"
            class="w-full border p-2 rounded focus:outline-none focus:border-blue-500" required></textarea>
        </div>
        <div class="mt-4">
          <label for="coverage" class="block font-semibold">Cobertura</label>
          <input v-model="editedInsurance.coverage" type="number" id="coverage" name="coverage"
            class="w-full border p-2 rounded focus:outline-none focus:border-blue-500" required />
        </div>
        <div class="mt-4">
          <label for="price" class="block font-semibold">Precio</label>
          <input v-model="editedInsurance.price" type="number" id="price" name="price"
            class="w-full border p-2 rounded focus:outline-none focus:border-blue-500" required />
        </div>
        <div class="mt-4">
          <label for="company" class="block font-semibold">Compañía</label>
          <select v-model="editedInsurance.company.id_company" id="company" name="company"
            class="w-full border p-2 rounded focus:outline-none focus:border-blue-500" required>
            <option value="1">Interseguro</option>
            <option value="2">LaPositiva</option>
          </select>
        </div>
        <div class="mt-4">
          <div class="text-right">
            <button type="submit" class="rounded-full w-full p-3 font-bold"
              :disabled="(!editedInsurance.name || !editedInsurance.description || !editedInsurance.coverage || !editedInsurance.price)"
              :class="(editedInsurance.name && editedInsurance.description && editedInsurance.coverage && editedInsurance.price) ?
                'bg-[#3B82F6] hover:bg-[#0b63f3] text-white' :
                'bg-[#EFF0EB] text-[#A7AAA2]'">
              Guardar Cambios
            </button>
          </div>
        </div>
      </form>
      <div class="mt-4 text-right">
        <button @click="closeEditModal" class="px-4 py-2 bg-[#3B82F6] text-white rounded-md">Cerrar</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import { ref } from 'vue';
import { useInsuranceStore } from '~/stores/insurance';

export default {
  props: {
    selectedEditInsurance: Object,
    onClose: Function,
  },
  setup(props) {
    const insuranceStore = useInsuranceStore();
    const id = props.selectedEditInsurance.id;
    const editedInsurance = ref({
      name: props.selectedEditInsurance.name,
      description: props.selectedEditInsurance.description,
      coverage: props.selectedEditInsurance.coverage,
      price: props.selectedEditInsurance.price,
      company: {
        id_company: props.selectedEditInsurance.company.id_company,
        name_company: props.selectedEditInsurance.company.name_company,
      },
    });

    //const editedInsurance = ref({ ...props.selectedEditInsurance });

    const editInsurance = async () => {
      try {
        await insuranceStore.updateInsurance(id, editedInsurance.value);
        props.onClose();
      } catch (error) {
        console.error('Error al actualizar el seguro:', error);
      }
    };

    const closeEditModal = () => {
      props.onClose();
    };

    return {
      editedInsurance,
      editInsurance,
      closeEditModal,
    };
  },
};
</script>
  