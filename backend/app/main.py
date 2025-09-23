from fastapi import FastAPI, UploadFile, File
from PIL import Image
import io
from .model import ClothingClassifier

classifier = None 

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}

@app.post("/classify")
async def classify(file: UploadFile = File(...)):
    global classifier
    if classifier is None:
        classifier = ClothingClassifier() 
    image = Image.open(io.BytesIO(await file.read())).convert("RGB")
    label = classifier.predict(image)
    return {"category": label}