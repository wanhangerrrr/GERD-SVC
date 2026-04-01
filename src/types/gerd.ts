export type RiskLevel = "Risiko Rendah" | "Risiko Sedang" | "Risiko Tinggi";

export interface GerdPayload {
  features: number[];
  nama?: string;
  catatan_tambahan?: string;
}

export interface GerdResponse {
  label: RiskLevel;
  probability: number;
  top_factors: string[];
}
