from gemini_model import *
from deepseek_model import *

if __name__ == "__main__":
    from blessed import Terminal

    term = Terminal()
    prompt = input("Enter your message: ")
    chat = []
    while not prompt == "exit":

        message = HumanMessage(prompt)
        chat.append(message)
        response = deepseek_model.invoke(chat)
        model_response = AIMessage(response.content)
        chat.append(model_response)
        print(f"{term.green("DeepSeek:")} {term.cyan(model_response.content)}")
        prompt = input("Enter your message: ")
