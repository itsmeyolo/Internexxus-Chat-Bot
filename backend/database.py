import json
import random

# get recent messges 
def get_recent_messages():

    # define the file name and learn instruction 
    file_name = "stored_data.json"
    learn_instruction = {
        "role": "assistant",
        "content": "You are interviewing the user for a job as a cook. Ask short questions taht are relevant to the junior position. Your name is Rachel. This user is called Sai. Keep your answers to under 30 words."
    }

    # initialize messages 
    message = []

    # add a random element 
    x = random.uniform(0, 1)
    if x < 0.5:
        learn_instruction["content"] = learn_instruction["content"] + " Your response will include some dry humour."
    else:
        learn_instruction["content"] = learn_instruction["content"] + " Your response will include a rather challenging question."

    # append insturction to message 
    message.append(learn_instruction)

    # get last messages 

    try:
        with open(file_name) as user_files:
            data = json.load(user_files)

            # append the last five items of data 
            if data:
                if len(data) < 5: 
                    for item in data:
                        message.append(item)
                else:
                    for item in data[-5:]:
                        message.append(item)

    except Exception as e: 
        print(e)
        pass

    # return
    return message

# store messages 
def store_messages(request_mesage, reponse_mesage):

    # define the file name 
    file_name = "stored_data.json"

    #get recent messages 
    messages = get_recent_messages()[1:]

    # add messages to data 
    user_message = {"role": "user", "content": request_mesage}
    assistant_message = {"role": "assistant", "content": reponse_mesage}
    messages.append(user_message)
    messages.append(assistant_message)

    # save the updated file 
    with open(file_name, "w") as f: 
        json.dump(messages, f)