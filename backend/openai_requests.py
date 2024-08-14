import os
import openai 
from dotenv import load_dotenv
load_dotenv()

# import coustom functions
from database import get_recent_messages

# Retrive Environment Varibales 
openai.organization= os.getenv("OPEN_AI_ORG")
openai.api_key = os.getenv("OPEN_AI_KEY")

# var1 = os.getenv("OPEN_AI_KEY")
# var2 =  os.getenv("OPEN_AI_ORG")

# print(var1)
# print(var2)

# Open AI - Whisper
#Convert audio to text 
def convert_audio_to_text(audio_file):
    try:
        transcript = openai.Audio.transcribe("whisper-1", audio_file)
        message_text = transcript["text"]
        return message_text
    except Exception as e:
        print(e)
        return

# Open AI - Chat GPT
# get response to our mesasages
def get_chat_response(message_input):

    messages = get_recent_messages()
    print(message_input)
    user_message = {"role": "user", "content": message_input}
    messages.append(user_message)
    print(messages)

    try:
        response = openai.ChatCompletion.create(
          model = "gpt-4",
          messages = messages
        )
        # message_text = response["choices"][0]["messages"]["content"]
        message_text = response.choices[0].message.content
        return message_text
    except Exception as e:
        print(e)
        return