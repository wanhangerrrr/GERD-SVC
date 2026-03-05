import { GerdPayload, GerdResponse, RiskLevel } from "@/types/gerd";

export async function predictGERD(payload: GerdPayload): Promise<GerdResponse> {
    const apiUrl = process.env.NEXT_PUBLIC_PREDICT_API_URL;

    if (apiUrl) {
        try {
            const response = await fetch(`${apiUrl}/predict/gerd`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Gagal terhubung ke API ML");
            }

            return await response.json();
        } catch (error) {
            console.error("API Prediction Error:", error);
            return mockPredict(payload);
        }
    }

    // Fallback ke mock prediction
    return mockPredict(payload);
}

function mockPredict(payload: GerdPayload): GerdResponse {
    let score = 0;

    // Heuristik sederhana untuk mock prediction
    if (payload.frekuensi_heartburn > 3) score += 30;
    if (payload.regurgitasi) score += 20;
    if (payload.nyeri_dada) score += 10;
    if (payload.bmi > 25) score += 10;
    if (payload.perokok) score += 10;
    if (payload.makan_malam_larut) score += 10;
    if (payload.stress_level > 7) score += 10;

    // Normalisasi score ke probability (0-1)
    const probability = Math.min(score / 100, 0.99);

    let label: RiskLevel = "Risiko Rendah";
    if (probability > 0.7) {
        label = "Risiko Tinggi";
    } else if (probability > 0.3) {
        label = "Risiko Sedang";
    }

    // Identifikasi faktor pemicu (mock)
    const top_factors = [];
    if (payload.frekuensi_heartburn > 2) top_factors.push("Frekuensi Heartburn Tinggi");
    if (payload.perokok) top_factors.push("Kebiasaan Merokok");
    if (payload.bmi > 25) top_factors.push("BMI di atas normal");
    if (payload.makan_malam_larut) top_factors.push("Kebiasaan makan larut malam");
    if (payload.stress_level > 5) top_factors.push("Tingkat stress");

    return {
        label,
        probability,
        top_factors: top_factors.slice(0, 3),
    };
}
