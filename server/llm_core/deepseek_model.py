"""Initialize and configure the DeepSeek LLM model."""
import os

import dotenv
from langchain.chat_models import init_chat_model

dotenv.load_dotenv()

DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")

if not DEEPSEEK_API_KEY:
    raise EnvironmentError(
        "DEEPSEEK_API_KEY not found in environment variables. "
        "Please set it in your .env file."
    )

deepseek_model = init_chat_model(
    "deepseek-chat",
    model_provider="deepseek",
    api_key=DEEPSEEK_API_KEY,
)
