from pydantic import BaseModel

class Pet(BaseModel):
    id: int
    name: str
    breed: str
    age: str
    image: str  # The filename in your assets folder
    status: str = "Available"