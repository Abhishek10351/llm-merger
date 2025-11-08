from .gemini_model import gemini_model
from .deepseek_model import deepseek_model
from conversations.models import Message
from langchain_core.messages import AIMessage, HumanMessage


def generate_title(prompt):
    """
    Generate a title for the conversation based on the first message.
    """
    if not prompt:
        return None

    prompt = f"Generate a title for the following conversation: `{prompt}`. The title should be short and descriptive. Don't include any special characters or punctuation. The title should be in English and don't try to explain the conversation. Just give a title."
    response = gemini_model.invoke(prompt)
    title = response.content.strip()
    return title


def generate_response(messages: list[Message], user_prompt, model_provider="deepseek"):
    model = gemini_model if model_provider == "gemini" else deepseek_model
    chat = []
    for index, msg in enumerate(messages):
        if msg.user_content:
            chat.append(HumanMessage(msg.user_content))

        # Get AI content based on model provider
        if model_provider == "gemini":
            ai_content = msg.gemini_content
        elif model_provider == "deepseek":
            ai_content = msg.deepseek_content
        else:
            ai_content = None

        # Only add AI message if content exists
        if ai_content:
            chat.append(AIMessage(ai_content))

    chat.append(HumanMessage(user_prompt))

    response = model.invoke(chat)
    return response.content


def merge_llm_responses(messages: list[Message], user_prompt):
    """
    Merge the content of both LLMs (Gemini and DeepSeek) into a third response.
    """
    gemini_chat = []
    deepseek_chat = []

    # Prepare chats for both LLMs
    for msg in messages:
        if msg.user_content:
            gemini_chat.append(HumanMessage(msg.user_content))
            deepseek_chat.append(HumanMessage(msg.user_content))
        if msg.gemini_content:
            gemini_chat.append(AIMessage(msg.gemini_content))
        if msg.deepseek_content:
            deepseek_chat.append(AIMessage(msg.deepseek_content))

    # Add the user prompt to both chats
    gemini_chat.append(HumanMessage(user_prompt))
    deepseek_chat.append(HumanMessage(user_prompt))

    # Get responses from both LLMs
    gemini_response = gemini_model.invoke(gemini_chat).content
    deepseek_response = deepseek_model.invoke(deepseek_chat).content

    # Merge the responses into a single prompt for a third LLM
    merge_prompt = (
        f"Combine the following responses into a single coherent response:\n\n"
        f"Response 1 (Gemini): {gemini_response}\n\n"
        f"Response 2 (DeepSeek): {deepseek_response}\n\n"
        f"The combined response should be concise, clear, and avoid repetition."
    )

    # Use Gemini to generate the merged response
    merged_response = gemini_model.invoke(merge_prompt).content

    return merged_response


def merge_all_responses(messages: list[Message], user_prompt):
    """
    Merge all previous messages in the conversation and include the user prompt.
    """
    chat = []

    # Add a system message to explain the task
    chat.append(HumanMessage("Merge the following responses by two different LLMs. Use the previous messages to get chat history, just use the last message to generate the text. Return the text directly without any extra formatting. Don't add Gemini:\{answer\} type result"))

    # Add all previous messages to the chat
    for msg in messages:
        if msg.user_content:
            chat.append(HumanMessage(f"User: {msg.user_content}"))
        if msg.gemini_content:
            chat.append(AIMessage(f"Gemini: {msg.gemini_content}"))
        if msg.deepseek_content:
            chat.append(AIMessage(f"DeepSeek: {msg.deepseek_content}"))

    # Add the user prompt to the chat
    chat.append(HumanMessage(f"User: {user_prompt}"))

    # Generate the merged response
    merge_prompt = (
        "Combine all the previous responses into a single coherent response. "
        "Ensure the response is concise, clear, and avoids repetition."
    )
    # chat.append(HumanMessage(merge_prompt))

    # Use Gemini to generate the final merged response
    merged_response = gemini_model.invoke(chat).content

    return merged_response
