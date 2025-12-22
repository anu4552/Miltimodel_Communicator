def process_decision(text: str, image_name: str | None):
    """
    Handles reasoning for combined image + text input.
    For example: generate meaningful interpretation or action suggestion.
    """
    if image_name:
        return f"🧩 Combined reasoning for '{image_name}': {text}"
    else:
        return f"💬 Reasoning from text only: {text}"




# from fastapi import FastAPI
# from pydantic import BaseModel
# import json
# import requests
# import os

# app = FastAPI()

# OLLAMA_URL = "http://127.0.0.1:11434/api/generate"  # change if needed
# IMAGE_CONTEXT_FILE = "image_context.json"


# class TextInput(BaseModel):
#     text: str = ""
#     image_name: str | None = None


# @app.post("/decide")
# async def decide(input_data: TextInput):
#     # --- Case 1: Image + (optional text)
#     if input_data.image_name:
#         if os.path.exists(IMAGE_CONTEXT_FILE):
#             with open(IMAGE_CONTEXT_FILE, "r") as f:
#                 context = json.load(f)
#             description = context.get(input_data.image_name, "No description found for image.")
#         else:
#             description = "No image_context.json file found."

#         prompt = f"Based on the image '{input_data.image_name}', describe or respond appropriately.\n\n{description}"
    
#     # --- Case 2: Text only
#     else:
#         prompt = input_data.text.strip()

#     # --- Clean prompt (remove <thinking>...</thinking>)
#     import re
#     prompt = re.sub(r"<think>.*?</think>", "", prompt, flags=re.DOTALL).strip()

#     # --- Send prompt to Ollama
#     payload = {
#         "model": "llama3.1",
#         "prompt": prompt
#     }

#     try:
#         response = requests.post(OLLAMA_URL, json=payload)
#         response.raise_for_status()
#         result = response.json().get("response", "No response from Ollama.")
#         return {"reply": result}
#     except Exception as e:
#         return {"error": str(e)}




# from fastapi import FastAPI, Body
# from fastapi.middleware.cors import CORSMiddleware
# import json
# import requests

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# OLLAMA_URL = "http://localhost:11434/api/generate"
# IMAGE_CONTEXT_FILE = "image_context.json"

# # Load your image prompt mapping
# with open(IMAGE_CONTEXT_FILE, "r") as f:
#     IMAGE_CONTEXT = json.load(f)


# @app.post("/decide")
# async def decide(data: dict = Body(...)):
#     text = data.get("text")
#     image_name = data.get("image_name")

#     # 🧩 Case 1 — Image + text
#     if image_name and text:
#         print("🖼️ Image + Text detected → using image context only")
#         if image_name in IMAGE_CONTEXT:
#             prompt = IMAGE_CONTEXT[image_name]["description"]
#             return call_ollama(prompt)
#         else:
#             return {"error": f"No context found for {image_name}"}

#     # 🧩 Case 2 — Text only
#     elif text and not image_name:
#         print("✏️ Text only detected → send text directly to Ollama")
#         return call_ollama(text)

#     else:
#         return {"error": "No valid input received"}


# def call_ollama(prompt):
#     """Send prompt to Ollama and get response"""
#     payload = {"model": "llama3", "prompt": prompt}
#     try:
#         r = requests.post(OLLAMA_URL, json=payload)
#         data = r.json()
#         return {"response": data.get("response", "No reply from model")}
#     except Exception as e:
#         return {"error": str(e)}





# # agents/decision_agent.py

# def decision_agent(image_name: str | None, user_text: str | None) -> str:
#     """
#     Decides which agent to use.
#     Priority:
#     1. If image + text → use image agent (ignore text)
#     2. If only text → use text agent
#     """
#     if image_name and user_text:   # ✅ both image + text
#         return "image"
#     elif image_name:               # (optional fallback)
#         return "image"
#     elif user_text:
#         return "text"
#     else:
#         return "unknown"


# def decision_agent(image_name: str | None, user_text: str | None) -> str:
#     """
#     Decides which agent to use: image, text, or correction.
#     """
#     if image_name:
#         return "image"

#     if user_text:
#         lower = user_text.lower()
#         if "fix" in lower or "correct" in lower or "grammar" in lower:
#             return "correction"
#         return "text"

#     return "unknown"




# def decision_agent(image_name: str | None, user_text: str | None) -> str:
#     """
#     Decides which agent to use: image, text, or correction.
#     """
#     # ✅ Priority: if image is present
#     if image_name:
#         return "image"

#     # ✅ Otherwise decide based on text content
#     if user_text:
#         lower = user_text.lower()
#         if "fix" in lower or "correct" in lower or "grammar" in lower:
#             return "correction"
#         return "text"

#     return "unknown"
