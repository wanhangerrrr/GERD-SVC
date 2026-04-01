import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { features } = body;

        if (!features || !Array.isArray(features) || features.length !== 64) {
            return NextResponse.json(
                { error: "Expected exactly 64 input features." },
                { status: 400 }
            );
        }

        // Proxy to FastAPI backend
        const response = await fetch("http://localhost:8000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ features }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { error: errorData.detail || "Error from prediction service." },
                { status: response.status }
            );
        }

        const data = await response.json();
        
        // Transform for frontend result card
        return NextResponse.json({
            label: data.prediction === "GERD" ? "Risiko Tinggi" : "Risiko Rendah",
            probability: data.probability,
            top_factors: ["Clinical Pattern Analysis", "SVC Engine Prediction", "Medical Data Consistency"]
        });
    } catch (error: any) {
        console.error("API Route Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error during prediction." },
            { status: 500 }
        );
    }
}
