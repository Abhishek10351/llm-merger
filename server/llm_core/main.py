import os

import dotenv

from langchain.chat_models import init_chat_model
from langchain_core.messages import AIMessage, HumanMessage


dotenv.load_dotenv()


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY is None:
    raise Exception("GEMINI_API_KEY not found in environment variables")
else:
    model = init_chat_model(
        "gemini-2.0-flash", model_provider="google_genai", api_key=GEMINI_API_KEY
    )
    print("Using Gemini model")

if __name__ == "__main__":
    from blessed import Terminal

    term = Terminal()
    prompt = input("Enter your message: ")
    chat = []
    while not prompt == "exit":

        message = HumanMessage(prompt)
        chat.append(message)
        response = model.invoke(chat)
        model_response = AIMessage(response.content)
        chat.append(model_response)
        print(f"{term.green("Gemini:")} {term.cyan(model_response.content)}")
        prompt = input("Enter your message: ")
