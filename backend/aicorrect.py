# aicorrect.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

app = FastAPI()

# Allow frontend connection (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define input model
class TextInput(BaseModel):
    text: str

# ---------------------- LOAD LIGHTWEIGHT MODEL ---------------------- #
MODEL_NAME = "Prithivida/grammar_error_correcter_v1"


tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)

# ---------------------- API ENDPOINT ---------------------- #
@app.post("/correct_text")
async def correct_text(data: TextInput):
    user_text = data.text.strip()

    if not user_text:
        return {"corrected_text": ""}

    # Prepare input for model
    input_text = f"grammar: {user_text}"
    inputs = tokenizer(input_text, return_tensors="pt", truncation=True).to(device)

    # Generate output

    with torch.no_grad():
        outputs = model.generate(
        **inputs,
        max_length=512,
        num_beams=4,
        early_stopping=True,
        )

    corrected_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

# 🧹 Clean up unwanted prefix if model returns it
    if corrected_text.lower().startswith("grammar:"):
        corrected_text = corrected_text[len("grammar:"):].strip()

# ✨ Format nicely
    formatted_text = corrected_text.strip().capitalize()

    return {"corrected_text": formatted_text}
   
 


    # with torch.no_grad():
    #     outputs = model.generate(
    #         **inputs,
    #         max_length=512,
    #         num_beams=4,
    #         early_stopping=True,
    #     )

    # corrected_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

    # # Capitalize and tidy the result
    # formatted_text = corrected_text.strip().capitalize()

    # return {"corrected_text": formatted_text}




# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import language_tool_python
# from textblob import TextBlob

# app = FastAPI()

# # Allow frontend connection (CORS)
# from fastapi.middleware.cors import CORSMiddleware

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],  # 👈 your frontend URL
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# # Input model
# class TextInput(BaseModel):
#     text: str

# @app.post("/correct_text")
# async def correct_text(data: TextInput):
#     user_text = data.text.strip()

#     # Step 1: Format capitalization using TextBlob
#     blob = TextBlob(user_text)
#     formatted_text = str(blob.correct())  # basic spelling correction

#     # Step 2: Grammar check with LanguageTool
  
#     matches = tool.check(formatted_text)
#     corrected_text = language_tool_python.utils.correct(formatted_text, matches)

#     # Step 3: Return formatted text with proper casing
#     final_text = corrected_text.capitalize()
#     return {"formatted_text": final_text}
