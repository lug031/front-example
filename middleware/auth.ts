import { useFirebaseAuth } from "~/composables/useFirebaseAuth";

export default defineNuxtRouteMiddleware(async(to, from) => {
    if (process.server) return

    console.log("En el middlewaree!!!")

    const { currentUserPromise } = useFirebaseAuth();

    const user = await currentUserPromise();

    if (user && to.path === "/login") {
        return navigateTo("/profile")
    }

}) 