import requests
# from decouple import config 
import os
from dotenv import load_dotenv
load_dotenv()

ELEVEN_LABS_API_KEY = os.getenv("ELEVEN_LABS_API_KEY")
OUTPUT_PATH = "output.mp3"  # Path to save the output audio file
CHUNK_SIZE = 1024  # Size of chunks to read/write at a time


# eleven labs 
# convert text to speech 
def convert_text_to_speech(message):

    # define data (body)
    body = {
        "text": message,
        "model_id": "eleven_multilingual_v2", #added
        "voice_settings":{
            "stability": 0, 
            "similarity_boost": 0,
             "style": 0.0, #added
             "use_speaker_boost": True #added
        }
    }

    # define voice
    voice_rachel = "jsCqWAovK2LkecY7zXl4"


    # constructing headers and endpoint 
    headers = {
    "Accept": "application/json",
    "xi-api-key": ELEVEN_LABS_API_KEY
    }

   # headers = {"xi-api-key": ELEVEN_LABS_API_KEY, "Content-Type": "application/json", "accept": "audio/mpeg"}
    endpoint = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_rachel}/stream"

    # send request 
    response = requests.post(endpoint, json=body, headers = headers, stream=True)
    # Check if the request was successful
    if response.ok:
        # Open the output file in write-binary mode
        with open(OUTPUT_PATH, "wb") as f:
            # Read the response in chunks and write to the file
            for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
                f.write(chunk)
        # Inform the user of success
        print("Audio stream saved successfully.")
    else:
        # Print the error message if the request was not successful
        print(response.text)

    # try:
    #     response = requests.post(endpoint, json=body, headers = headers, stream=True)
    # except Exception as e: 
    #     return 

    # # handel response 
    # if response.status_code == 200:
    #     return response.content
    # else:
    #     return 