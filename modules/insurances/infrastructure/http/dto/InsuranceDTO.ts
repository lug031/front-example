// src/infrastructure/http/dto/InsuranceDTO.ts

import { Company } from "../../../domain/models/Company";

export interface InsuranceDTO extends Company {
    id: number;
    name: string;
    description: string;
    coverage: number;
    price: number;
    company: Company;
    createAt: Date;
    updateAt: Date;
}