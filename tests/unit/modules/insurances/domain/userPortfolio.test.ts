// src/tests/userPortfolio.test.ts
import { expect, test } from 'vitest';
import { userPortfolioService } from '../../../../../modules/insurances/domain/services/userPortfolioService';
import type { Insurance } from '../../../../../modules/insurances/domain/models/Insurance';

const anyInsurance = (id: string, price: number): Insurance => ({
    id,
    title: 'Any title',
    price
});

test('If I add more than five insurances, the sixth will not be added', async () => {
    const portafolio = userPortfolioService.createPortfolio();

    userPortfolioService.addInsuranceToPortfolio(portafolio, anyInsurance('1', 0));
    userPortfolioService.addInsuranceToPortfolio(portafolio, anyInsurance('2', 0));
    userPortfolioService.addInsuranceToPortfolio(portafolio, anyInsurance('3', 0));
    userPortfolioService.addInsuranceToPortfolio(portafolio, anyInsurance('4', 0));
    userPortfolioService.addInsuranceToPortfolio(portafolio, anyInsurance('5', 0));
    userPortfolioService.addInsuranceToPortfolio(portafolio, anyInsurance('6', 0));
    expect(portafolio.insurances.length).toEqual(5);
});

test('If I add a insurance and it already exist in the portafolio, the insurance will not be added', async () => {
    const portafolio = userPortfolioService.createPortfolio();

    userPortfolioService.addInsuranceToPortfolio(portafolio, anyInsurance('1', 0));
    userPortfolioService.addInsuranceToPortfolio(portafolio, anyInsurance('1', 0));
    expect(portafolio.insurances.length).toEqual(1);
});

test('If I add a insurance and it will exceed 100€, the insurance will not be added', async () => {
    const portafolio = userPortfolioService.createPortfolio();

    userPortfolioService.addInsuranceToPortfolio(portafolio, anyInsurance('1', 50));
    userPortfolioService.addInsuranceToPortfolio(portafolio, anyInsurance('2', 60));
    expect(portafolio.insurances.length).toEqual(1);
});
