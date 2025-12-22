import requests, json, re

def handle_text_agent(user_text: str) -> str:
    """Handles normal text conversation via Ollama."""
    prompt = f"You are a friendly assistant. Respond clearly to:\n\n{user_text}"

    try:
        response = requests.post(
            "http://127.0.0.1:11434/api/generate",
            json={"model": "deepseek-r1:1.5b", "prompt": prompt},
            timeout=60,
        )

        if response.status_code != 200:
            return f"⚠️ Ollama error: {response.text}"

        lines = response.text.splitlines()
        full_response = ""
        for line in lines:
            try:
                data = json.loads(line)
                if "response" in data:
                    full_response += data["response"]
            except json.JSONDecodeError:
                continue

        # Remove <thinking> tags
        response_text = re.sub(r"<thinking>.*?</thinking>", "", full_response, flags=re.DOTALL)
        return response_text.strip()

    except requests.Timeout:
        return "⏳ The model took too long to respond."
    except Exception as e:
        return f"❌ Error connecting to Ollama: {str(e)}"




# import requests, json, re

# def handle_text_agent(user_text: str) -> str:
#     """Handles normal text conversation via Ollama."""
#     prompt = f"You are a friendly assistant. Respond clearly to:\n\n{user_text}"

#     try:
#         response = requests.post(
#             "http://127.0.0.1:11434/api/generate",
#             json={"model": "deepseek-r1:1.5b", "prompt": prompt},
#             timeout=60,
#         )
#         if response.status_code != 200:
#             return f"⚠️ Ollama error: {response.text}"

#         lines = response.text.splitlines()
#         full_response = ""
#         for line in lines:
#             try:
#                 data = json.loads(line)
#                 if "response" in data:
#                     full_response += data["response"]
#             except json.JSONDecodeError:
#                 continue

#         response_text = re.sub(r"<thinking>.*?</thinking>", "", full_response, flags=re.DOTALL)
#         return response_text.strip()

#     except requests.Timeout:
#         return "⏳ The model took too long to respond."
#     except Exception as e:
#         return f"❌ Error connecting to Ollama: {str(e)}"
