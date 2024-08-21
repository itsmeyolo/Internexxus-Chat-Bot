import React,{useState} from 'react'
import Title from './Title';
import RecordMessage from './RecordMessage';
import './Controller.css';


function Controller() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  
  console.log('setMessages in Controller:', setMessages);
  
  const createBlobUrl = (data) => {};

  const handleStop = async () => {};


  return (
    <div className='container'>
      <div>
        <Title setMessages={setMessages}/>
      </div>
      <div className="content">
        <RecordMessage handleStop={handleStop}/>
      </div>
    </div>
    // <div>Controller</div>
  )
}

export default Controller