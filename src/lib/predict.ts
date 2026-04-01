import { GerdPayload, GerdResponse, RiskLevel } from "@/types/gerd";

export async function predictGERD(payload: GerdPayload): Promise<GerdResponse> {
    try {
        const response = await fetch("/api/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Gagal melakukan prediksi");
        }

        return await response.json();
    } catch (error) {
        console.error("Prediction Error:", error);
        throw error;
    }
}
