from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import pets_list
from fastapi.staticfiles import StaticFiles
from models import Pet
from pydantic import BaseModel # Added for the adoption form structure

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/assets", StaticFiles(directory="assets"), name="assets")

# --- NEW STORAGE FOR ADOPTIONS ---
adoption_requests = []

class AdoptionApplication(BaseModel):
    user_name: str
    phone: str
    address: str
    pet_id: int
    has_pets: str
    house_type: str

# --- EXISTING PET ROUTES ---
@app.get("/pets")
def get_pets():
    return pets_list

@app.post("/add_pet")
def add_pet(pet: Pet):
    pets_list.append(pet.dict())
    return {"message": f"{pet.name} added!", "pet": pet}

@app.delete("/remove_pet/{pet_id}")
def remove_pet(pet_id: int):
    global pets_list
    pets_list[:] = [p for p in pets_list if p["id"] != pet_id]
    return {"message": "Pet removed"}

# --- NEW ADOPTION ROUTE ---
@app.post("/submit_adoption")
def submit_adoption(app_data: AdoptionApplication):
    # Store the data in our list
    application = app_data.dict()
    application["status"] = "Pending" # Added a default status
    adoption_requests.append(application)
    
    # This prints the data in your VS Code terminal so you can see it!
    print(f"📥 New Application Received: {application}")
    
    return {"message": "Application stored in backend!", "data": application}

@app.get("/admin/requests")
def view_requests():
    
    return adoption_requests