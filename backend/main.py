#uvicorn main:app
#uvicorn main:app --reload

# Main Imports
from fastapi import FastAPI, File, UploadFile, HTTPException # type:ignore
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
#from decouple import config 
#import openai 

# Coustom Function Imports
from database import store_messages
from openai_requests import convert_audio_to_text,  get_chat_response

# Initiate App
app = FastAPI()

# CORS -Origins 
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4173",
    "http://localhost:4174",
    "http://localhost:3000",
]

# CORS - Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Check Health
@app.get("/health")
async def check_health():
    return {"message": "healthy"}

# Get audio
@app.post("/post-audio-get/")
async def get_audio():

    #Get saved audio
    audio_input = open("voice.mp3", "rb")

    #Decode audion
    message_decoded = convert_audio_to_text(audio_input)

    # guard: ensure message decoded
    if not message_decoded:
        return HTTPException(status_code = 400, detail = "Faileds to decode audio")
    
    # get Chat response 
    print(message_decoded)
    chat_response = get_chat_response(message_decoded)

    # store messages
    store_messages(message_decoded, chat_response)

    print(chat_response)

    return "Done"

# Post bot response 
# Nodte: Not playing in browser when using post request 
# @app.post("/post-audio/")
# async def post_audio(file: UploadFile = File(...)):

#     print("hello")