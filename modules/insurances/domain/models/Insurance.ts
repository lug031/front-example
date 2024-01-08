// src/domain/models/Insurance.ts

// src/domain/models/Insurance.ts
import type { Company } from './Company';

export type InsuranceCoverage = number;

export type Insurance = {
    id: number;
    name: string;
    description: string;
    coverage: InsuranceCoverage;
    price: number;
    company: Company;
    createAt: Date;
    updateAt: Date;
};