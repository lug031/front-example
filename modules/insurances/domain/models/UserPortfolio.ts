// src/domain/models/Insurance.ts
import type { Insurance } from './Insurance';

export interface IUserPortfolio {
    createPortfolio: () => UserPortfolio;
    addInsuranceToPortfolio: (portfolio: UserPortfolio, insurance: Insurance) => UserPortfolio;
    removeInsuranceFromPortfolio: (portfolio: UserPortfolio, insurance: Insurance) => UserPortfolio;
}

export type UserPortfolio = {
    id: string;
    insurances: Insurance[];
};
