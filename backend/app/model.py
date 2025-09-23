import os
import torch
from dotenv import load_dotenv
from transformers import AutoFeatureExtractor, AutoModelForImageClassification
from PIL import Image
from .mapping import CATEGORY_MAPPING

load_dotenv()

class ClothingClassifier:
    def __init__(self, model_name=None):
        self.model_name = model_name or os.getenv("MODEL_NAME", "facebook/deit-tiny-patch16-224")
        print(f"🔍 Loading model: {self.model_name}")
        self.extractor = AutoFeatureExtractor.from_pretrained(self.model_name)
        self.model = AutoModelForImageClassification.from_pretrained(self.model_name)

    def predict(self, image: Image.Image) -> str:
        inputs = self.extractor(images=image, return_tensors="pt")
        with torch.no_grad():
            outputs = self.model(**inputs)
            probs = torch.nn.functional.softmax(outputs.logits, dim=-1)
            predicted_class = probs.argmax().item()
        raw_label = self.model.config.id2label[predicted_class].lower()

        # Simplify to closet categories
        for key, category in CATEGORY_MAPPING.items():
            if key in raw_label:
                return category
        return "Unknown"
