from fastapi import FastAPI, HTTPException, UploadFile, File, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from PIL import Image
import io

from .model import ClothingClassifier          # your ML model
from . import db_models, schemas               # SQLAlchemy + Pydantic
from .database import engine, SessionLocal     # DB connection

# Create tables if not exist
db_models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency: get DB session per request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

classifier = None


# ---------- Root ----------
@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}


# ---------- Users ----------
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db_models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/by-email/{email}", response_model=schemas.User)
def get_user_by_email(email: str, db: Session = Depends(get_db)):
    user = db.query(db_models.User).filter(db_models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# ---------- Clothes ----------
@app.post("/clothes/", response_model=schemas.Clothing)
def add_clothing(clothing: schemas.ClothingCreate, db: Session = Depends(get_db)):
    db_clothing = db_models.Clothing(**clothing.dict())
    db.add(db_clothing)
    db.commit()
    db.refresh(db_clothing)
    return db_clothing

@app.get("/clothes/{user_id}", response_model=list[schemas.Clothing])
def get_user_clothes(user_id: int, db: Session = Depends(get_db)):
    return db.query(db_models.Clothing).filter(db_models.Clothing.user_id == user_id).all()


# ---------- Classify + Save ----------
@app.post("/classify", response_model=schemas.Clothing)
async def classify(file: UploadFile = File(...), db: Session = Depends(get_db)):
    global classifier
    if classifier is None:
        classifier = ClothingClassifier()

    image = Image.open(io.BytesIO(await file.read())).convert("RGB")
    label = classifier.predict(image)

    # TODO: replace with actual uploaded image URL (S3)
    fake_url = "https://example.com/test.png"

    # Save to DB (for now assume user_id=1 exists)
    clothing = db_models.Clothing(user_id=1, category=label, image_url=fake_url)
    db.add(clothing)
    db.commit()
    db.refresh(clothing)

    return clothing
