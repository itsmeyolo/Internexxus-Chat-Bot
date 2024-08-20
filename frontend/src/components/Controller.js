import {useState} from 'react'
import Title from './Title';
import RecordMessage from './RecordMessage';

function Controller() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  

  const createBlobUrl = (data) => {};

  const handleStop = async () => {};


  return (
    <div className="h-screen overflow-y-hidden">
      <div>
        <Title setMessages={setMessages}/>
      </div>
      <div className="flex flex-col justify-between h-full overflow-y-scroll pb-96">
        <RecordMessage handleStop={handleStop}/>
      </div>
    </div>
    // <div>Controller</div>
  )
}

export default Controller