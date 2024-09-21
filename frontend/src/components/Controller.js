import React,{useState} from 'react'
import Title from './Title';
import RecordMessage from './RecordMessage';
import './Controller.css';


function Controller() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  // const [blob, setBlob] = useState("");
  
  console.log('setMessages in Controller:', setMessages);
  
  const createBlobUrl = (data) => {
    const blob = new Blob([data], {type: "audio/mpeg"});
    const url = window.URL.createObjectURL(blob);
    return url;
  };

  const handleStop = async (blobUrl) => {
    setIsLoading(true)

    // Append recorded message to messages
    const myMessage = {sender: "me", blobUrl };
    const messagesArr = [...messages, myMessage];

    // Convert blob url to blob object
    fetch(blobUrl)
      .then((res) => res.blob())
      .then(async (blob) => {
      // Construct audio to send file
      const formData = new FormData();
      formData.append("file", blob, "myFile.wav");

      // Send form data to API endpoint using fetch
      fetch("http://localhost:8000/post-audio", {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "audio/mpeg" },
      })
      .then((res) => res.arrayBuffer())
      .then((data) => {
        const audioBlob = new Blob([data], { type: "audio/mpeg" });
        const audioUrl = createBlobUrl(audioBlob);
        const audio = new Audio();
        audio.src = audioUrl;

        // Append to audio
        const rachelMessage = {sender: "rachel", blobUrl: audio.src};
        messagesArr.push(rachelMessage);
        setMessages(messagesArr);

        // Play Audio
        setIsLoading(false)
        audio.play();
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
    });
    // setBlob(blobUrl);
  };


  return (
    <div className='container'>
      {/* <div>
        <Title setMessages={setMessages}/>
      </div> */}

      {/* <audio src={blob} controls /> */}

      {/* Conversation */}
      <div className = "mt-5 px-5">
        {messages.map((audio, index) => {
          return (
            <div 
              key={index + audio.sender} 
              className={`message ${audio.sender === "rachel" ? "rachel-message" : "me-message"}`}
            >
              {/* Sender */}
              <div className="mt-4">
                <p className={audio.sender === "rachel" ? "rachel-sender" : "me-sender"}>
                  {audio.sender}
                </p>

                {/* Audio Message */}
                <audio src={audio.blobUrl} className="audio-message" controls />
              </div>

            </div>
          );
        })}

        {messages.length == 0 && !isLoading && (
          <div className="no-messages">Send Rachel a message...</div>
        )}

        {isLoading && (
          <div className="loading">Give me a few seconds...</div>
        )}
      </div>

      {/* Recorder */}
      <div className="recorder">
        <RecordMessage handleStop={handleStop}/>
      </div>
    </div>
    // <div>Controller</div>
  )
}

export default Controller