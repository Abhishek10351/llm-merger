from .gemini_model import model


def generate_title(prompt):
    """
    Generate a title for the conversation based on the first message.
    """
    if not prompt:
        return None

    prompt = f"Generate a title for the following conversation: `{prompt}`. The title should be short and descriptive. Don't include any special characters or punctuation. The title should be in English and don't try to explain the conversation. Just give a title."
    response = model.invoke(prompt)
    title = response.content.strip()
    return title
