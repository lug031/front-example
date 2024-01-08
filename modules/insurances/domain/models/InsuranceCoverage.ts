export type InsuranceCoverage = number;

const MINIMUM_COVERAGE = 0;
const MAXIMUM_COVERAGE = 100;

export function isInsuranceCoverageValid(coverage: number): boolean {
  return coverage >= MINIMUM_COVERAGE && coverage <= MAXIMUM_COVERAGE;
}

export function InsuranceCoverageNotValidError(): Error {
  return new Error('Rango de cobertura no válido');
}
