Pet Adoption Mobile Application
A full-stack mobile platform designed for pet discovery and adoption management. The system consists of a cross-platform mobile client and a high-performance RESTful API.

Project Overview
The Pet Adoption System provides an end-to-end interface for users to browse pet profiles and submit adoption applications. The mobile application utilizes modern navigation and animation libraries to ensure a high-quality user experience, while the backend manages data persistence and form handling via a Python-based server.

Technical Stack
Frontend (Mobile)
Framework: React Native (Expo SDK)

Navigation: Expo Router (File-based routing)

Animations: React Native Animatable

Build Tool: EAS (Expo Application Services)

Backend (API)
Language: Python 3.x

Framework: FastAPI

Server: Uvicorn (ASGI)

Validation: Pydantic models

Repository Structure
The project is organized as a monorepo containing both the frontend and backend source code:

/PetAdoptionApp: The React Native source code, assets, and build configuration.

/pet-adoption-api: The FastAPI application files, data models, and requirements.

1. Backend API
cd pet-adoption-api
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000
2. Mobile Client
cd PetAdoptionApp
npm install
npx expo start
Binary Distribution
A standalone Android Package (APK) is available for direct installation. This can be found in the Releases section of this GitHub repository.
