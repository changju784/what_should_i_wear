from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# ---------- User Schemas ----------
class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    class Config:
        orm_mode = True


# ---------- Clothing Schemas ----------
class ClothingBase(BaseModel):
    category: str
    image_url: str

class ClothingCreate(ClothingBase):
    user_id: int

class Clothing(ClothingBase):
    id: int
    user_id: int
    created_at: datetime
    class Config:
        orm_mode = True
