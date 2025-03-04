import os
import dotenv
from blessed import Terminal

term = Terminal()
dotenv.load_dotenv()

from langchain.chat_models import init_chat_model
import langchain.chat_models as chat_models
from langchain_core.messages import AIMessage, HumanMessage

GROQ_API_KEY = os.getenv("GROQ_API_KEY")


if GROQ_API_KEY is None:
    raise Exception("GROQ_API_KEY not found in environment variables")
else:
    model = init_chat_model(
        "llama3-8b-8192", model_provider="groq", api_key=GROQ_API_KEY
    )

prompt = input("Enter your message: ")
chat = []
while not prompt == "exit":

    message = HumanMessage(prompt)
    chat.append(message)
    response = model.invoke(chat)
    model_response = AIMessage(response.content)
    chat.append(model_response)
    print(f"{term.green("Groq:")} {term.cyan(model_response.content)}")
    prompt = input("Enter your message: ")
