// src/infrastructure/repositories/insuranceRepository.ts

import type { Insurance } from '../../domain/models/Insurance';
import type { InsuranceRepository } from '../../domain/repositories/InsuranceRepository';
import type { Http } from '../../domain/repositories/Http';
import type { InsuranceDTO } from '../http/dto/InsuranceDTO';

const INSURANCES_URL = process.env.INSURANCES_URL || 'http://localhost:8080';
    
export const insuranceRepository = (client: Http): InsuranceRepository => ({
    getInsurances: async () => {
        try {
            const insurancesDTO = await client.get<InsuranceDTO[]>(`${INSURANCES_URL}/insurances`);
            const insurances: Insurance[] = insurancesDTO.map((insuranceDto: { id: any; name: any; description: any; coverage: any; price: any; company: any; createAt: any; updateAt: any; }): Insurance => ({
                id: insuranceDto.id,
                name: insuranceDto.name,
                description: insuranceDto.description,
                coverage: insuranceDto.coverage,
                price: insuranceDto.price,
                company: insuranceDto.company,
                createAt: insuranceDto.createAt,
                updateAt: insuranceDto.updateAt,
            }));
            return insurances;
        } catch (error: any) {
            throw new Error(`Error getting insurances: ${error.message}`);
        }
    },

    getInsurancesById: async (id: string) => {
        try {
            const insuranceDTO = await client.get<InsuranceDTO>(`${INSURANCES_URL}/insurances/${id}`);
            const insurance: Insurance = {
                id: insuranceDTO.id,
                name: insuranceDTO.name,
                description: insuranceDTO.description,
                coverage: insuranceDTO.coverage,
                price: insuranceDTO.price,
                company: insuranceDTO.company,
                createAt: insuranceDTO.createAt,
                updateAt: insuranceDTO.updateAt,
            };
            return [insurance];
        } catch (error: any) {
            throw new Error(`Error getting insurance by ID ${id}: ${error.message}`);
        }
    }
});