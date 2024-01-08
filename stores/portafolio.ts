import { defineStore } from 'pinia';
import { userPortfolioService } from '../modules/insurances/domain/services/userPortfolioService';
import type { UserPortfolio } from '../modules/insurances/domain/models/UserPortfolio';
import type { Insurance } from '../modules/insurances/domain/models/Insurance';

export const useUserPortfolioStore = defineStore('userPortfolio', () => {
    const portfolio: Ref<UserPortfolio> = ref(userPortfolioService.createPortfolio());

    const setPortfolio = (newPortfolio: UserPortfolio): void => {
        portfolio.value = { ...newPortfolio };
    };

    const addInsurance = async (insurance: Insurance): Promise<void> => {
        try {
            const updatedPortfolio = userPortfolioService.addInsuranceToPortfolio(
                portfolio.value,
                insurance
            );
            setPortfolio(updatedPortfolio);
        } catch (error) {
            console.error('Error al agregar el seguro al portafolio:', error);
        }
    };

    const removeInsurance = async (insurance: Insurance): Promise<void> => {
        try {
            const updatedPortfolio = userPortfolioService.removeInsuranceFromPortfolio(
                portfolio.value,
                insurance
            );
            setPortfolio(updatedPortfolio);
        } catch (error) {
            console.error('Error al eliminar el seguro del portafolio:', error);
        }
    };

    return {
        portfolio,
        setPortfolio,
        addInsurance,
        removeInsurance,
    };
}, { persist: true });