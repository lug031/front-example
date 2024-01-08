import type { UserPortfolio, IUserPortfolio } from '../models/UserPortfolio';
import type { Insurance, InsuranceCoverage } from '../models/Insurance';

const MINIMUM_COVERAGE = 0;
const MAXIMUM_COVERAGE = 100;

const createPortfolio = (): UserPortfolio => {
    // Crea y devuelve una nueva cartera de seguros para el usuario
    return { id: Date.now().toString(), insurances: [] };
};

const hasInsurance = (portfolio: UserPortfolio, insurance: Insurance): boolean => {
    // Verifica si la cartera ya contiene el seguro
    return !!portfolio.insurances.find(item => item.id === insurance.id);
};

const isPortfolioFull = (portfolio: UserPortfolio): boolean => {
    // Verifica si la cartera de seguros está llena (max 5)
    return portfolio.insurances.length >= 5;
};

const isPortfolioLimitPriceExceeded = (portfolio: UserPortfolio, insurance: Insurance, limit: number): boolean => {
    // Verifica si añadir el seguro excedería el límite de precio de la cartera (máximo 100)
    let totalPortfolioPrice = 0;
    portfolio.insurances.forEach(item => {
        totalPortfolioPrice += item.price;
    });
    totalPortfolioPrice += insurance.price;

    return totalPortfolioPrice > limit;
};

const isInsuranceCoverageValid = (insurance: Insurance): boolean => {
    return insurance.coverage > MINIMUM_COVERAGE && insurance.coverage < MAXIMUM_COVERAGE;
};

const InsuranceCoverageNotValidError: () => Error = () => {
    return new Error('Rango de cobertura no aceptado');
};

const addInsuranceToPortfolio = (portfolio: UserPortfolio, insurance: Insurance): UserPortfolio => {
    // Agrega un seguro a la cartera si cumple con las reglas comerciales
    console.log('Cobertura del seguro:', insurance.coverage);
    if (
        !hasInsurance(portfolio, insurance) &&
        !isPortfolioFull(portfolio) &&
        !isPortfolioLimitPriceExceeded(portfolio, insurance, 100) &&
        isInsuranceCoverageValid(insurance)
    ) {
        portfolio.insurances = [...portfolio.insurances, insurance];
    } else {
        throw InsuranceCoverageNotValidError();
    }
    return { ...portfolio };
};

const removeInsuranceFromPortfolio = (portfolio: UserPortfolio, insurance: Insurance): UserPortfolio => {
    // Remueve un seguro de la cartera
    const insurancesWithRemovedItem: Insurance[] = [];
    portfolio.insurances.forEach(item => {
        if (item.id !== insurance.id) insurancesWithRemovedItem.push(item);
    });
    portfolio.insurances = [...insurancesWithRemovedItem];
    return { ...portfolio };
};

export const userPortfolioService: IUserPortfolio = {
    createPortfolio,
    addInsuranceToPortfolio,
    removeInsuranceFromPortfolio
};
