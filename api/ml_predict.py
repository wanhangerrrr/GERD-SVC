from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import os

app = FastAPI(title="GERD Detector Vercel API")

# Model path relative to this script in the api/ directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Root: .. -> src/lib/model/gerd_detector.joblib
MODEL_PATH = os.path.join(BASE_DIR, "..", "src", "lib", "model", "gerd_detector.joblib")

class PredictionRequest(BaseModel):
    features: list[float]

# Model loaded globally
model = None

def load_model():
    global model
    try:
        if os.path.exists(MODEL_PATH):
            model = joblib.load(MODEL_PATH)
            print(f"Model loaded successfully from {MODEL_PATH}")
        else:
            print(f"Model file not found at {MODEL_PATH}")
    except Exception as e:
        print(f"Error loading model: {e}")

# Call load_model immediately for serverless persistence (if possible)
load_model()

@app.post("/api/ml_predict")
async def predict(data: PredictionRequest):
    global model
    if model is None:
        # Re-try loading in case of worker cold start issues
        load_model()
        if model is None:
            raise HTTPException(status_code=500, detail=f"Model could not be loaded. Please check path: {MODEL_PATH}")
    
    if len(data.features) != 64:
        raise HTTPException(status_code=400, detail=f"Expected 64 features, got {len(data.features)}")
    
    try:
        # Reshape for prediction
        features_array = np.array(data.features).reshape(1, -1)
        
        # Prediction
        prediction = model.predict(features_array)[0]
        
        # Probabilities
        if hasattr(model, "predict_proba"):
            probabilities = model.predict_proba(features_array)[0]
            probability = float(np.max(probabilities))
        else:
            probability = 1.0
            
        result_label = "GERD" if int(prediction) == 1 else "Tidak GERD"
        
        return {
            "prediction": result_label,
            "probability": probability,
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
