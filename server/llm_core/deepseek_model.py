import os

import dotenv

from langchain.chat_models import init_chat_model
from langchain_core.messages import AIMessage, HumanMessage

dotenv.load_dotenv()

DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")

if DEEPSEEK_API_KEY is None:
    raise Exception("DEEPSEEK_API_KEY not found in environment variables")
else:
    deepseek_model = init_chat_model(
        "deepseek-chat", model_provider="deepseek", api_key=DEEPSEEK_API_KEY
    )
