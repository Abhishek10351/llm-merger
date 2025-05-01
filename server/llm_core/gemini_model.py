import os

import dotenv

from langchain.chat_models import init_chat_model
from langchain_core.messages import AIMessage, HumanMessage


dotenv.load_dotenv()


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY is None:
    raise Exception("GEMINI_API_KEY not found in environment variables")
else:
    gemini_model = init_chat_model(
        "gemini-2.0-flash", model_provider="google_genai", api_key=GEMINI_API_KEY
    )
    print("Gemini model loaded successfully")
