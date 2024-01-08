import VueTailwindDatepicker from 'vue-tailwind-datepicker'
export default defineNuxtPlugin((nuxtApp) => {
	// @ts-ignore
	nuxtApp.vueApp.use(VueTailwindDatepicker)
})
