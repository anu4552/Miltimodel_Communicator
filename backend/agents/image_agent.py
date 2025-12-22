import json, requests, re

def handle_image_agent(image_name: str) -> str:
    """Handles image+text communication using image context and Ollama."""
    with open("image_context.json", "r") as f:
        image_context = json.load(f)

    context = image_context.get(image_name)
    if not context:
        return f"❌ No context found for {image_name}"

    prompt = f"The user sent this gesture: {context}. Respond in a friendly, short sentence."

    try:
        response = requests.post(
            "http://127.0.0.1:11434/api/generate",
            json={"model": "deepseek-r1:1.5b", "prompt": prompt},
            timeout=60,
        )

        if response.status_code != 200:
            return f"⚠️ Ollama error: {response.text}"

        # Combine stream into one response
        lines = response.text.splitlines()
        full_response = ""
        for line in lines:
            try:
                data = json.loads(line)
                if "response" in data:
                    full_response += data["response"]
            except json.JSONDecodeError:
                continue

        ai_response = re.sub(r"<thinking>.*?</thinking>", "", full_response, flags=re.DOTALL)
        return ai_response.strip() or "No response generated."

    except requests.Timeout:
        return "⏳ The model took too long to respond."
    except Exception as e:
        return f"❌ Error connecting to Ollama: {str(e)}"





# import json, requests

# def handle_image_agent(image_name: str) -> str:
#     """Handles image+text communication using image context and Ollama."""
#     with open("image_context.json", "r") as f:
#         image_context = json.load(f)

#     context = image_context.get(image_name)
#     if not context:
#         return f"❌ No context found for {image_name}"

#     prompt = f"The user sent this gesture: {context}. Respond in a friendly, short sentence."

#     try:
#         response = requests.post(
#             "http://127.0.0.1:11434/api/generate",
#             json={"model": "deepseek-r1:1.5b", "prompt": prompt},
#             timeout=60,
#         )

#         if response.status_code != 200:
#             return f"⚠️ Ollama error: {response.text}"

#         # Combine stream into one response
#         lines = response.text.splitlines()
#         full_response = ""
#         for line in lines:
#             try:
#                 data = json.loads(line)
#                 if "response" in data:
#                     full_response += data["response"]
#             except json.JSONDecodeError:
#                 continue

#         ai_response = full_response.strip().replace("<thinking>", "").replace("</thinking>", "")
#         return ai_response or "No response generated."

#     except requests.Timeout:
#         return "⏳ The model took too long to respond."
#     except Exception as e:
#         return f"❌ Error connecting to Ollama: {str(e)}"
