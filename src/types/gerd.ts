export type RiskLevel = "Risiko Rendah" | "Risiko Sedang" | "Risiko Tinggi";

export interface GerdPayload {
  usia: number;
  jenis_kelamin: "Laki-laki" | "Perempuan";
  frekuensi_heartburn: number;
  regurgitasi: boolean;
  nyeri_dada: boolean;
  mual: boolean;
  batuk_malam: boolean;
  sulit_menelan: boolean;
  bmi: number;
  perokok: boolean;
  konsumsi_kopi: number;
  makan_malam_larut: boolean;
  stress_level: number;
  nama?: string;
  catatan_tambahan?: string;
}

export interface GerdResponse {
  label: RiskLevel;
  probability: number;
  top_factors: string[];
}
