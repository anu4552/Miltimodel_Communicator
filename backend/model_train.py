
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, FileResponse, JSONResponse
from pydantic import BaseModel
import pandas as pd
import joblib
import tempfile
from jinja2 import Template
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from datetime import datetime
from weasyprint import HTML
from fastapi.responses import Response
from fastapi.templating import Jinja2Templates

# === Load Model and Scaler ===
best_model = joblib.load("best_model.pkl")
scaler = joblib.load("scaler.pkl")

templates = Jinja2Templates(directory="templates")

# === FastAPI App ===
app = FastAPI(title="HelpME AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Input Schema ===
class UserInput(BaseModel):
    user_id: str
    age: float
    gender: str
    disorder: str
    mentalscale: float
    sleeping_hr: float
    duration_interaction: float
    symptoms: list[str] = []
    prev_score: float | None = None


# === Predict Function ===
def predict_progress(age, gender, disorder, mentalscale, sleeping_hr, duration_interaction):
    gender_Male = 1 if gender.lower() == "male" else 0

    disorders = {
        "disorder_Arthritis": 0,
        "disorder_Autism Spectrum Disorder": 0,
        "disorder_Blindness": 0,
        "disorder_Dementia": 0,
        "disorder_Depression": 0,
        "disorder_Diabetes": 0,
        "disorder_Down Syndrome": 0,
        "disorder_Epilepsy": 0,
        "disorder_OCD": 0,
    }

    if f"disorder_{disorder}" in disorders:
        disorders[f"disorder_{disorder}"] = 1

    features = {
        "age": age,
        "social_duration": duration_interaction,
        "mental_scale": mentalscale,
        "Sleeping_hr": sleeping_hr,
        "gender_Male": gender_Male,
        **disorders,
    }

    df = pd.DataFrame([features])
    scaled = scaler.transform(df)
    predicted = best_model.predict(scaled)[0]

    # Return both but only use percent in HTML/PDF
    return round(float(predicted[0]), 3), round(float(predicted[1]), 2)


# === HTML Template Filler (Jinja2) ===
def fill_template(data: UserInput, progress_percent):
    with open("TemplatePreview.html", "r", encoding="utf-8") as f:
        template = Template(f.read())

    html = template.render(
        user_id=data.user_id,
        age=data.age,
        gender=data.gender,
        disorder=data.disorder,
        sleeping_hr=data.sleeping_hr,
        interaction_duration=data.duration_interaction,
        mental_scale=data.mentalscale,
        symptoms=data.symptoms or [],
        prev_score=data.prev_score,
        progress_increase=progress_percent,
    )
    return html


# === Prediction Endpoint ===
@app.post("/predict", response_class=HTMLResponse)
def get_prediction(data: UserInput):
    try:
        _, percent = predict_progress(
            data.age, data.gender, data.disorder,
            data.mentalscale, data.sleeping_hr,
            data.duration_interaction
        )
        html = fill_template(data, percent)
        return HTMLResponse(content=html, status_code=200)
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


# === PDF Export Endpoint (Fixed) ===
             

@app.get("/export-pdf")
def export_pdf():
    # 1. Load your existing HTML file
    with open("TemplatePreview.html", "r", encoding="utf-8") as f:
        html_content = f.read()

    # 2. Output PDF path
    output_path = "output.pdf"

    # 3. Convert HTML → PDF
    HTML(string=html_content).write_pdf(output_path)

    # 4. Return the generated PDF file
    return FileResponse(output_path, media_type="application/pdf", filename="Progress_Report.pdf")




# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import HTMLResponse, FileResponse, JSONResponse
# from pydantic import BaseModel
# import pandas as pd
# import joblib
# import pdfkit
# import tempfile
# from jinja2 import Template

# # === Load Model and Scaler ===
# best_model = joblib.load("best_model.pkl")
# scaler = joblib.load("scaler.pkl")

# # === FastAPI App ===
# app = FastAPI(title="HelpME AI Backend")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # === Input Schema ===
# class UserInput(BaseModel):
#     user_id: str
#     age: float
#     gender: str
#     disorder: str
#     mentalscale: float
#     sleeping_hr: float
#     duration_interaction: float
#     symptoms: list[str] = []
#     prev_score: float | None = None


# # === Predict Function ===
# def predict_progress(age, gender, disorder, mentalscale, sleeping_hr, duration_interaction):
#     gender_Male = 1 if gender.lower() == "male" else 0

#     disorders = {
#         "disorder_Arthritis": 0,
#         "disorder_Autism Spectrum Disorder": 0,
#         "disorder_Blindness": 0,
#         "disorder_Dementia": 0,
#         "disorder_Depression": 0,
#         "disorder_Diabetes": 0,
#         "disorder_Down Syndrome": 0,
#         "disorder_Epilepsy": 0,
#         "disorder_OCD": 0,
#     }

#     if f"disorder_{disorder}" in disorders:
#         disorders[f"disorder_{disorder}"] = 1

#     features = {
#         "age": age,
#         "social_duration": duration_interaction,
#         "mental_scale": mentalscale,
#         "Sleeping_hr": sleeping_hr,
#         "gender_Male": gender_Male,
#         **disorders,
#     }

#     df = pd.DataFrame([features])
#     scaled = scaler.transform(df)
#     predicted = best_model.predict(scaled)[0]

#     # Return both but only use percent in HTML
#     return round(float(predicted[0]), 3), round(float(predicted[1]), 2)


# # === HTML Template Filler (Jinja2) ===
# def fill_template(data: UserInput, progress_percent):
#     with open("TemplatePreview.html", "r", encoding="utf-8") as f:
#         template = Template(f.read())

#     html = template.render(
#         user_id=data.user_id,
#         age=data.age,
#         gender=data.gender,
#         disorder=data.disorder,
#         sleeping_hr=data.sleeping_hr,
#         interaction_duration=data.duration_interaction,
#         mental_scale=data.mentalscale,
#         symptoms=data.symptoms or [],
#         progress_increase=progress_percent,  # Only this is sent
#     )
#     return html


# # === Prediction Endpoint ===
# @app.post("/predict", response_class=HTMLResponse)
# def get_prediction(data: UserInput):
#     try:
#         _, percent = predict_progress(
#             data.age, data.gender, data.disorder,
#             data.mentalscale, data.sleeping_hr,
#             data.duration_interaction
#         )
#         html = fill_template(data, percent)
#         return HTMLResponse(content=html, status_code=200)
#     except Exception as e:
#         return JSONResponse(status_code=500, content={"error": str(e)})


# # === PDF Export Endpoint ===
# @app.post("/export-pdf")
# def export_pdf(data: UserInput):
#     try:
#         _, percent = predict_progress(
#             data.age, data.gender, data.disorder,
#             data.mentalscale, data.sleeping_hr,
#             data.duration_interaction
#         )
#         html = fill_template(data, percent)
#         with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
#             pdfkit.from_string(html, tmp.name)
#             filename = tmp.name
#         return FileResponse(filename, media_type="application/pdf", filename="Progress_Report.pdf")
#     except Exception as e:
#         return JSONResponse(status_code=500, content={"error": str(e)})




# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import HTMLResponse, FileResponse, JSONResponse
# from pydantic import BaseModel
# import pandas as pd
# import joblib
# import pdfkit
# import tempfile
# import os
# from jinja2 import Template

# best_model = joblib.load("best_model.pkl")
# scaler = joblib.load("scaler.pkl")

# app = FastAPI(title="HelpME AI Backend")
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class UserInput(BaseModel):
#     user_id: str
#     age: float
#     gender: str
#     disorder: str
#     mentalscale: float
#     sleeping_hr: float
#     duration_interaction: float
#     symptoms: list[str] = []
#     prev_score: float | None = None

# def predict_progress(age, gender, disorder, mentalscale, sleeping_hr, duration_interaction):
#     gender_Male = 1 if gender.lower() == "male" else 0
#     disorders = {
#         "disorder_Arthritis": 0,
#         "disorder_Autism Spectrum Disorder": 0,
#         "disorder_Blindness": 0,
#         "disorder_Dementia": 0,
#         "disorder_Depression": 0,
#         "disorder_Diabetes": 0,
#         "disorder_Down Syndrome": 0,
#         "disorder_Epilepsy": 0,
#         "disorder_OCD": 0,
#     }
#     if f"disorder_{disorder}" in disorders:
#         disorders[f"disorder_{disorder}"] = 1

#     features = {
#         "age": age,
#         "social_duration": duration_interaction,
#         "mental_scale": mentalscale,
#         "Sleeping_hr": sleeping_hr,
#         "gender_Male": gender_Male,
#         **disorders,
#     }
#     df = pd.DataFrame([features])
#     scaled = scaler.transform(df)
#     predicted = best_model.predict(scaled)[0]
#     return round(float(predicted[0]), 3), round(float(predicted[1]), 2)

# def fill_template(data: UserInput, progress_score, progress_percent):
#     with open("TemplatePreview.html", "r", encoding="utf-8") as f:
#         template = Template(f.read())
#     html = template.render(
#         user_id=data.user_id,
#         age=data.age,
#         gender=data.gender,
#         disorder=data.disorder,
#         sleeping_hr=data.sleeping_hr,
#         interaction_duration=data.duration_interaction,
#         mental_scale=data.mentalscale,
#         symptoms=data.symptoms or [],
#         progress_increase=progress_percent,
#         progress_score=progress_score,
#     )
#     return html

# @app.post("/predict", response_class=HTMLResponse)
# def get_prediction(data: UserInput):
#     try:
#         score, percent = predict_progress(
#             data.age, data.gender, data.disorder,
#             data.mentalscale, data.sleeping_hr,
#             data.duration_interaction
#         )
#         html = fill_template(data, score, percent)
#         return HTMLResponse(content=html, status_code=200)
#     except Exception as e:
#         return JSONResponse(status_code=500, content={"error": str(e)})

# @app.post("/export-pdf")
# def export_pdf(data: UserInput):
#     try:
#         score, percent = predict_progress(
#             data.age, data.gender, data.disorder,
#             data.mentalscale, data.sleeping_hr,
#             data.duration_interaction
#         )
#         html = fill_template(data, score, percent)
#         with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
#             pdfkit.from_string(html, tmp.name)
#             filename = tmp.name
#         return FileResponse(filename, media_type="application/pdf", filename="Progress_Report.pdf")
#     except Exception as e:
#         return JSONResponse(status_code=500, content={"error": str(e)})






# from fastapi import FastAPI, Request
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import HTMLResponse, FileResponse
# from pydantic import BaseModel
# import pandas as pd
# import joblib
# import pdfkit
# import tempfile
# import os

# # === Load Model and Scaler ===
# best_model = joblib.load("best_model.pkl")
# scaler = joblib.load("scaler.pkl")

# # === FastAPI App ===
# app = FastAPI(title="HelpME AI Backend")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# # === Input Schema ===
# class UserInput(BaseModel):
#     user_id: str
#     age: float
#     gender: str
#     disorder: str
#     mentalscale: float
#     sleeping_hr: float
#     duration_interaction: float
#     symptoms: list[str] = []
#     prev_score: float | None = None


# # === Predict Function ===
# def predict_progress(age, gender, disorder, mentalscale, sleeping_hr, duration_interaction):
#     gender_Male = 1 if gender.lower() == "male" else 0
#     disorders = {
#         "disorder_Arthritis": 0,
#         "disorder_Autism Spectrum Disorder": 0,
#         "disorder_Blindness": 0,
#         "disorder_Dementia": 0,
#         "disorder_Depression": 0,
#         "disorder_Diabetes": 0,
#         "disorder_Down Syndrome": 0,
#         "disorder_Epilepsy": 0,
#         "disorder_OCD": 0,
#     }
#     if f"disorder_{disorder}" in disorders:
#         disorders[f"disorder_{disorder}"] = 1

#     features = {
#         "age": age,
#         "social_duration": duration_interaction,
#         "mental_scale": mentalscale,
#         "Sleeping_hr": sleeping_hr,
#         "gender_Male": gender_Male,
#         **disorders,
#     }

#     df = pd.DataFrame([features])
#     scaled = scaler.transform(df)
#     predicted = best_model.predict(scaled)[0]

#     return round(float(predicted[0]), 3), round(float(predicted[1]), 2)


# # === Utility: Fill HTML Template ===
# def fill_template(data, progress_score, progress_percent):
#     with open("TemplatePreview.html", "r", encoding="utf-8") as f:
#         html = f.read()

#     filled = html.format(
#         user_id=data.user_id,
#         age=data.age,
#         gender=data.gender,
#         disorder=data.disorder,
#         sleeping_hr=data.sleeping_hr,
#         interaction_duration=data.duration_interaction,
#         mental_scale=data.mentalscale,
#         symptom1=(data.symptoms[0] if len(data.symptoms) > 0 else "N/A"),
#         symptom2=(data.symptoms[1] if len(data.symptoms) > 1 else "N/A"),
#         symptom3=(data.symptoms[2] if len(data.symptoms) > 2 else "N/A"),
#         progress_increase=progress_percent,
#     )
#     return filled


# # === API: Prediction and HTML Preview ===
# @app.post("/predict", response_class=HTMLResponse)
# def get_prediction(data: UserInput):
#     score, percent = predict_progress(
#         data.age, data.gender, data.disorder,
#         data.mentalscale, data.sleeping_hr,
#         data.duration_interaction
#     )
#     html = fill_template(data, score, percent)
#     return HTMLResponse(content=html, status_code=200)


# # === API: PDF Export ===
# @app.post("/export-pdf")
# def export_pdf(data: UserInput):
#     score, percent = predict_progress(
#         data.age, data.gender, data.disorder,
#         data.mentalscale, data.sleeping_hr,
#         data.duration_interaction
#     )
#     html = fill_template(data, score, percent)

#     with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
#         pdfkit.from_string(html, tmp.name)
#         filename = tmp.name

#     return FileResponse(filename, media_type="application/pdf", filename="Progress_Report.pdf")









# # main.py
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import pandas as pd
# import joblib

# # Load model and scaler
# best_model = joblib.load("best_model.pkl")
# scaler = joblib.load("scaler.pkl")

# # Initialize app
# app = FastAPI(title="Health Progress Predictor API")

# # Allow CORS for frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],  # or ["http://localhost:5173"] if using Vite
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Pydantic model for input data
# class UserInput(BaseModel):
#     age: float
#     gender: str
#     disorder: str
#     mentalscale: float
#     sleeping_hr: float
#     duration_interaction: float


# # Prediction function
# def predict_progress(age, gender, disorder, mentalscale, sleeping_hr, duration_interaction):
#     gender_Male = 1 if gender.lower() == "male" else 0

#     disorders = {
#         "disorder_Arthritis": 0,
#         "disorder_Autism Spectrum Disorder": 0,
#         "disorder_Blindness": 0,
#         "disorder_Dementia": 0,
#         "disorder_Depression": 0,
#         "disorder_Diabetes": 0,
#         "disorder_Down Syndrome": 0,
#         "disorder_Epilepsy": 0,
#         "disorder_OCD": 0,
#     }

#     key = f"disorder_{disorder}"
#     if key in disorders:
#         disorders[key] = 1

#     # Build feature set
#     features = {
#         "age": age,
#         "social_duration": duration_interaction,
#         "mental_scale": mentalscale,
#         "Sleeping_hr": sleeping_hr,
#         "gender_Male": gender_Male,
#         **disorders
#     }

#     df = pd.DataFrame([features])
#     scaled_data = scaler.transform(df)
#     predicted = best_model.predict(scaled_data)[0]

#     return {
#         "progress_score": round(float(predicted[0]), 3),
#         "progress_percent": round(float(predicted[1]), 2),
#     }


# # API route
# @app.post("/predict")
# def get_prediction(data: UserInput):
#     result = predict_progress(
#         data.age, data.gender, data.disorder, data.mentalscale,
#         data.sleeping_hr, data.duration_interaction
#     )
#     return {"status": "success", "prediction": result}
