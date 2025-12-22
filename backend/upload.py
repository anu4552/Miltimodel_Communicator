from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import json, os, re, requests

app = FastAPI(title="AI Communicator Backend")

# ✅ Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Restrict to frontend URL later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# 🔹 Load Image Context
# -----------------------------
CONTEXT_PATH = os.path.join(os.path.dirname(__file__), "image_context.json")
with open(CONTEXT_PATH, "r") as f:
    IMAGE_CONTEXT = json.load(f)

# -----------------------------
# 🔹 Data Model
# -----------------------------
class InputData(BaseModel):
    text: str = ""
    image_name: str | None = None


# -----------------------------
# 🔹 Health Check
# -----------------------------
@app.get("/ping")
async def ping():
    return {
        "message": "✅ Backend running successfully on port 8002",
        "endpoints": {
            "health_check": "http://127.0.0.1:8002/ping",
            "main_process": "http://127.0.0.1:8002/process"
        }
    }


# -----------------------------
# 🔹 Main Endpoint
# -----------------------------
@app.post("/process")
async def process_input(data: InputData):
    text = data.text.strip()
    image_name = data.image_name

    print(f"📩 Received → text='{text}', image_name='{image_name}'")

    # --- CASE 1: Image + (optional) Text ---
    if image_name:

        print(f"🔍 Frontend sent image name (raw): {image_name}")
        normalized_context = {k.lower(): v for k, v in IMAGE_CONTEXT.items()}
        image_key = image_name.lower()



        if image_key in normalized_context:
            image_description = normalized_context[image_key]

            # 🧠 Build prompt dynamically
            prompt = (
                f"You are a helpful AI assistant that  responds clearly using following Discription.\n\n"
                f"Image context: {image_description}\n\n"
            )
            if text:
                prompt += f"User said: '{text}'"
            else:
                prompt += "Describe this gesture and what it means in simple language."

            print(f"\n🧠 Sending to DeepSeek:\n{prompt}\n")

            ollama_response = query_ollama(prompt)
            clean_response = clean_output(ollama_response)

            print(f"✅ Cleaned Response:\n{clean_response}\n")
            return {"reply": clean_response}
        else:
            return JSONResponse(
                content={"reply": f"⚠️ Image '{image_name}' not recognized in image_context.json."},
                status_code=404,
            )

    # --- CASE 2: Only Text ---
    elif text:
        prompt = (
            f"You are a helpful AI assistant that responds clearly and concisely .\n\n"
            f"User message: {text}"
        )
        print(f"\n🧠 Sending text prompt to DeepSeek:\n{prompt}\n")

        ollama_response = query_ollama(prompt)
        clean_response = clean_output(ollama_response)

        print(f"✅ Cleaned Response:\n{clean_response}\n")
        return {"reply": clean_response}

    # --- CASE 3: No input ---
    else:
        return {"reply": "⚠️ No text or image provided."}


# -----------------------------
# 🔹 Query Ollama (DeepSeek)
# -----------------------------
def query_ollama(prompt: str):
    OLLAMA_URL = "http://localhost:11434/api/generate"
    payload = {"model": "deepseek-r1:1.5b", "prompt": prompt}
    try:
        response = requests.post(OLLAMA_URL, json=payload)
        if response.status_code == 200:
            final_output = ""
            for line in response.text.splitlines():
                try:
                    data = json.loads(line)
                    if "response" in data:
                        final_output += data["response"]
                except:
                    pass
            return final_output.strip()
        else:
            return f"❌ Ollama returned error {response.status_code}"
    except requests.exceptions.ConnectionError:
        return "❌ Could not connect to Ollama. Is it running on port 11434?"


# -----------------------------
# 🔹 Clean Output (<think> removal)
# -----------------------------
def clean_output(text: str) -> str:
    """Remove <think>...</think> and clean whitespace."""
    cleaned = re.sub(r"<think>.*?</think>", "", text, flags=re.DOTALL)
    cleaned = re.sub(r"\n\s*\n", "\n\n", cleaned.strip())
    return cleaned


# -----------------------------
# 🔹 Run command (info print)
# -----------------------------
if __name__ == "__main__":
    print("\n🚀 AI Communicator Backend is ready!")
    print("✅ API running on: http://127.0.0.1:8002")
    print("🔹 Health check → http://127.0.0.1:8002/ping")
    print("🔹 Process route → http://127.0.0.1:8002/process\n")
    print("Make sure Ollama is running (e.g., `ollama serve`) before testing.\n")










# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import JSONResponse
# from pydantic import BaseModel
# import json, os, requests
# from decision_agent import process_decision

# app = FastAPI(title="AI Communicator Backend")

# # ✅ Allow frontend CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # You can restrict later to ["http://localhost:5173"]
#     allow_credentials=True,
#     allow_methods=["*"],  # allows OPTIONS automatically
#     allow_headers=["*"],
# )

# # -----------------------------
# # 🔹 Load Image Context
# # -----------------------------
# CONTEXT_PATH = os.path.join(os.path.dirname(__file__), "image_context.json")
# with open(CONTEXT_PATH, "r") as f:
#     IMAGE_CONTEXT = json.load(f)


# class InputData(BaseModel):
#     text: str = ""
#     image_name: str | None = None


# # -----------------------------
# # 🔹 Health Check Route
# # -----------------------------
# @app.get("/ping")
# async def ping():
#     return {"message": "✅ Backend running successfully on port 8002"}


# # -----------------------------
# # 🔹 Main Route
# # -----------------------------
# @app.post("/process")
# async def process_input(data: InputData):
#     """
#     1️⃣ If image + text → find image meaning, merge with text → send to decision_agent.py
#     2️⃣ If only text → send directly to DeepSeek via Ollama
#     """
#     text = data.text.strip()
#     image_name = data.image_name

#     print(f"📩 Received → text='{text}', image_name='{image_name}'")

#     # --- CASE 1: Image + (optional) Text ---
#     if image_name:
#         if image_name in IMAGE_CONTEXT:
#             image_description = IMAGE_CONTEXT[image_name]
#             combined_text = (
#                 f"User said: '{text}'. Based on the sign, {image_description}"
#                 if text
#                 else image_description
#             )

#             print(f"🧠 Sending to decision_agent: {combined_text}")
#             result = process_decision(combined_text, image_name)
#             return {"reply": result}
#         else:
#             return {"reply": f"⚠️ Image '{image_name}' not recognized in image_context.json."}

#     # --- CASE 2: Only Text ---
#     elif text:
#         try:
#             ollama_response = query_ollama(text)
#             print(f"✅ DeepSeek Response: {ollama_response}")
#             return {"reply": ollama_response}
#         except Exception as e:
#             print(f"❌ Ollama error: {str(e)}")
#             return {"reply": f"❌ Error querying DeepSeek: {str(e)}"}

#     # --- CASE 3: No input ---
#     else:
#         return {"reply": "⚠️ No text or image provided."}


# # -----------------------------
# # 🔹 Ollama Query Helper
# # -----------------------------
# def query_ollama(prompt: str):
#     """
#     Send text directly to DeepSeek via Ollama.
#     """
#     OLLAMA_URL = "http://localhost:11434/api/generate"
#     payload = {"model": "deepseek-r1:1.5b", "prompt": prompt}

#     response = requests.post(OLLAMA_URL, json=payload)
#     if response.status_code == 200:
#         final_output = ""
#         for line in response.text.splitlines():
#             try:
#                 data = json.loads(line)
#                 if "response" in data:
#                     final_output += data["response"]
#             except:
#                 pass
#         return final_output.strip()
#     else:
#         return f"Ollama returned error {response.status_code}"



# from fastapi import FastAPI
# from pydantic import BaseModel
# import json, os
# import requests
# from decision_agent import process_decision

# app = FastAPI()

# # Load the image context JSON
# CONTEXT_PATH = os.path.join(os.path.dirname(__file__), "image_context.json")
# with open(CONTEXT_PATH, "r") as f:
#     IMAGE_CONTEXT = json.load(f)


# class InputData(BaseModel):
#     text: str = ""
#     image_name: str | None = None


# @app.post("/process")
# async def process_input(data: InputData):
#     """
#     Central router:
#     1️⃣ If image + text → find image meaning, merge with text → send to decision_agent.py
#     2️⃣ If only text → send directly to Ollama
#     """

#     text = data.text.strip()
#     image_name = data.image_name

#     # --- CASE 1: Image + (optional) Text ---
#     if image_name:
#         if image_name in IMAGE_CONTEXT:
#             image_description = IMAGE_CONTEXT[image_name]

#             combined_text = (
#                 f"User said: '{text}'. Based on the sign, {image_description}"
#                 if text
#                 else image_description
#             )

#             # Send both to decision agent for reasoning
#             result = process_decision(combined_text, image_name)
#             return {"reply": result}
#         else:
#             return {"reply": f"⚠️ Image '{image_name}' not recognized in image_context.json."}

#     # --- CASE 2: Only Text ---
#     elif text:
#         # Forward text to Ollama model
#         try:
#             ollama_response = query_ollama(text)
#             return {"reply": ollama_response}
#         except Exception as e:
#             return {"reply": f"❌ Error querying Ollama: {str(e)}"}

#     # --- CASE 3: No input ---
#     else:
#         return {"reply": "⚠️ No text or image provided."}


# # -----------------------------
# # 🔹 Ollama query helper
# # -----------------------------
# def query_ollama(prompt: str):
#     """
#     Send the text directly to a local Ollama model and get its response.
#     """
#     OLLAMA_URL = "http://localhost:11434/api/generate"
#     payload = {"model": "deepseek-r1:1.5b", "prompt": prompt}

#     response = requests.post(OLLAMA_URL, json=payload)
#     if response.status_code == 200:
#         lines = response.text.splitlines()
#         # Ollama streams JSON lines; extract final text
#         final_output = ""
#         for line in lines:
#             try:
#                 data = json.loads(line)
#                 if "response" in data:
#                     final_output += data["response"]
#             except:
#                 pass
#         return final_output.strip()
#     else:
#         return f"Ollama returned error {response.status_code}"



# from fastapi import FastAPI, UploadFile, Form
# from fastapi.middleware.cors import CORSMiddleware
# import aiofiles
# import os
# import requests

# app = FastAPI()

# # Allow CORS (React frontend)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# UPLOAD_DIR = "uploads"
# os.makedirs(UPLOAD_DIR, exist_ok=True)

# DECISION_AGENT_URL = "http://127.0.0.1:8001/decide"


# @app.post("/process")
# async def process_input(
#     text: str = Form(""),
#     image: UploadFile | None = None,
# ):
#     try:
#         image_name = None

#         # --- If image uploaded → save it
#         if image:
#             image_name = image.filename
#             save_path = os.path.join(UPLOAD_DIR, image_name)
#             async with aiofiles.open(save_path, "wb") as out_file:
#                 content = await image.read()
#                 await out_file.write(content)

#         # --- Prepare payload for Decision Agent
#         payload = {"text": text, "image_name": image_name}

#         # --- Send to Decision Agent
#         res = requests.post(DECISION_AGENT_URL, json=payload)
#         res.raise_for_status()

#         return {"reply": res.json().get("reply", "No response.")}
#     except Exception as e:
#         return {"error": str(e)}




# from fastapi import FastAPI, UploadFile, Form
# from fastapi.middleware.cors import CORSMiddleware
# import aiofiles
# import requests
# import os

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# UPLOAD_FOLDER = "uploaded_images"
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# # 🧩 Decision agent endpoint
# DECISION_AGENT_URL = "http://localhost:8001/decide"

# @app.post("/process")
# async def process_input(
#     text: str = Form(None),
#     image: UploadFile = None
# ):
#     # both text + image are uploaded from frontend
#     image_name = None

#     if image:
#         image_name = image.filename
#         file_path = os.path.join(UPLOAD_FOLDER, image_name)

#         async with aiofiles.open(file_path, "wb") as f:
#             content = await image.read()
#             await f.write(content)

#     # Prepare payload for decision agent
#     payload = {
#         "text": text,
#         "image_name": image_name
#     }

#     try:
#         # Send to decision agent for logic routing
#         response = requests.post(DECISION_AGENT_URL, json=payload)
#         return response.json()

#     except Exception as e:
#         return {"error": f"Failed to reach decision agent: {str(e)}"}




# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from agents.decision_agent import decision_agent
# from agents.text_agent import handle_text_agent
# from agents.image_agent import handle_image_agent

# app = FastAPI(title="AI Decision Agent")

# # CORS setup
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],  # frontend
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Request model
# class ChatRequest(BaseModel):
#     image_name: str | None = None
#     user_text: str | None = None


# @app.post("/chat")
# async def chat(request: ChatRequest):
#     """Main endpoint — routes requests to correct agent."""
#     image_name = request.image_name
#     user_text = request.user_text

#     # Decide which agent to use
#     agent_type = decision_agent(image_name, user_text)
#     print(f"🧠 Decision Agent selected: {agent_type}")

#     # Call corresponding agent
#     if agent_type == "image":
#         reply = handle_image_agent(image_name)
#     elif agent_type == "text":
#         reply = handle_text_agent(user_text)
#     else:
#         reply = "❓ Unable to determine agent type."

#     return {"response": reply}


# @app.get("/")
# async def root():
#     return {"message": "AI Decision Agent running on port 8001"}





# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from agents.decision_agent import decision_agent
# from agents.text_agent import handle_text_agent
# from agents.image_agent import handle_image_agent

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class RequestData(BaseModel):
#     image_name: str | None = None
#     user_text: str | None = None

# @app.post("/chat")
# def chat(data: RequestData):
#     image_name = data.image_name
#     user_text = data.user_text or ""

#     # Step 1 — decide which agent to use
#     mode = decision_agent(image_name, user_text)
#     print(f"🧭 DecisionAgent → {mode}")

#     # Step 2 — route to correct agent
#     if mode == "image":
#         result = handle_image_agent(image_name)
#     elif mode == "text":
#         result = handle_text_agent(user_text)
#     elif mode == "correction":
#         result = "✅ Grammar correction agent not yet integrated."
#     else:
#         result = "🤔 I couldn’t understand your input."

#     return {"response": result, "mode": mode}


# from fastapi import FastAPI, HTTPException, UploadFile, File
# from fastapi.middleware.cors import CORSMiddleware
# import json, requests

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# with open("image_context.json", "r") as f:
#     image_context = json.load(f)

# @app.post("/image_to_text")
# async def image_to_text(file: UploadFile = File(...)):
#     image_name = file.filename
#     context = image_context.get(image_name)

#     if not context:
#         raise HTTPException(status_code=404, detail=f"No context found for {image_name}")

#     prompt = f"The user sent this gesture: {context}. Respond in a friendly, short sentence."

#     try:
#         response = requests.post(
#             "http://127.0.0.1:11434/api/generate",
#             json={"model": "deepseek-r1:1.5b", "prompt": prompt},
#             timeout=60
#         )

#         if response.status_code != 200:
#             raise HTTPException(status_code=500, detail=f"Ollama error: {response.text}")

#         lines = response.text.splitlines()
#         full_response = ""
#         for line in lines:
#             try:
#                 data = json.loads(line)
#                 if "response" in data:
#                     full_response += data["response"]
#             except json.JSONDecodeError:
#                 continue

#         ai_response = full_response.strip() or "No response generated."

#     except requests.Timeout:
#         ai_response = "The model took too long to respond."
#     except Exception as e:
#         ai_response = f"Error connecting to Ollama: {str(e)}"

#     return {"caption": ai_response}



# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# import json
# import requests

# app = FastAPI()

# # 🧩 Allow your frontend to communicate with FastAPI
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],  # 👈 your frontend URL
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # 🖼️ Load image context once at startup
# with open("image_context.json", "r") as f:
#     image_context = json.load(f)

# @app.post("/image_to_text")
# async def image_to_text(payload: dict):
#     image_name = payload.get("image_name")

#     if not image_name:
#         raise HTTPException(status_code=400, detail="No image name provided")

#     context = image_context.get(image_name)
#     if not context:
#         return {"response": f"I don’t recognize the image '{image_name}'."}

#     # 🧠 Prepare the prompt for DeepSeek
#     prompt = f"The user sent this gesture: {context}. Respond in a friendly, short sentence."

#     try:
#         # 🚀 Send the request directly to Ollama
#         response = requests.post(
#             "http://127.0.0.1:11434/api/generate",
#             json={
#                 "model": "deepseek-r1:1.5b",
#                 "prompt": prompt
#             },
#             timeout=60
#         )

#         if response.status_code != 200:
#             raise HTTPException(status_code=500, detail=f"Ollama error: {response.text}")

#         # Ollama streams output line by line — we’ll collect the text
#         lines = response.text.splitlines()
#         full_response = ""
#         for line in lines:
#             try:
#                 data = json.loads(line)
#                 if "response" in data:
#                     full_response += data["response"]
#             except json.JSONDecodeError:
#                 continue

#         ai_response = full_response.strip() or "No response generated."

#     except requests.Timeout:
#         ai_response = "The model took too long to respond."
#     except Exception as e:
#         ai_response = f"Error connecting to Ollama: {str(e)}"

#     return {"response": ai_response}



