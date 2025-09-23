from fastapi import FastAPI, UploadFile, File
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
from .model import ClothingClassifier

classifier = None 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)


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
    print(f"Predicted label: {label}")
    return {"category": label}