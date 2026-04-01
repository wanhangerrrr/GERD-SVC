import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import os

app = FastAPI(title="GERD Detector Service")

# Model path relative to this script's location
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "src", "lib", "model", "gerd_detector.joblib")

class PredictionRequest(BaseModel):
    features: list[float]

@app.on_event("startup")
def load_model():
    global model
    try:
        model = joblib.load(MODEL_PATH)
        print(f"Model loaded successfully from {MODEL_PATH}")
    except Exception as e:
        print(f"Error loading model: {e}")
        model = None

@app.post("/predict")
async def predict(data: PredictionRequest):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded. Please ensure gerd_detector.joblib exists in src/lib/model/")
    
    if len(data.features) != 64:
        raise HTTPException(status_code=400, detail=f"Expected 64 features, got {len(data.features)}")
    
    try:
        # Reshape for prediction
        features_array = np.array(data.features).reshape(1, -1)
        
        # Prediction
        prediction = model.predict(features_array)[0]
        
        # In case the model provides probabilities
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

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
