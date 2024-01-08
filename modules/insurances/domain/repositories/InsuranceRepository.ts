import type { Insurance } from '../models/Insurance';

export interface InsuranceRepository {
    getInsurances: () => Promise<Insurance[]>;
    getInsurancesById: (id: string) => Promise<Insurance[]>;
}
