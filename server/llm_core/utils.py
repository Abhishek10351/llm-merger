from langchain_core.messages import AIMessage, HumanMessage


def message_type(message):
    if message.message_type == "ai":
        return AIMessage(message.content)
    else:
        return HumanMessage(message.content)
