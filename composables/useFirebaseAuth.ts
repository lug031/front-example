import { signInWithPopup, GoogleAuthProvider, type UserCredential, signOut, onAuthStateChanged } from 'firebase/auth';

export const useFirebaseAuth = () => {
    const { $auth } = useNuxtApp();
    const provider = new GoogleAuthProvider();
    let inactivityTimer: string | number | NodeJS.Timeout | null | undefined = null;

    provider.setCustomParameters({
        prompt: "select_account",
    });

    const loginGoogleAuth = async (): Promise<UserCredential> => {
        try {
            const result = await signInWithPopup($auth, provider);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const logout = async () => {
        await signOut($auth);
        await navigateTo("/login");
    };

    const currentUserPromise = () =>
        new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged($auth, (user) => {
                unsubscribe();
                console.log("promesa usuario actual")
                resolve(user);
                console.log(user)
            });
        });

    const infoUser = $auth.currentUser;

    return {
        loginGoogleAuth,
        logout,
        currentUserPromise,
        infoUser,
    };
};
