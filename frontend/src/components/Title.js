import React, {useEffect, useState} from "react";
import './Title.css';
// import axios from "axios";

function Title( {setMessages} ) {

    const [isResetting, setIsResetting] = useState(false);
    const [status, setStatus] = useState("Click here to Start Interview");


    console.log('Type of setMessages: ', typeof setMessages);

    useEffect(() => {
        console.log('Title of component rendered');
        console.log('Type of setMessages:', typeof setMessages);
        console.log('setMessages:', setMessages);
    }, []);


    //Rest the conversation
    const resetConversation = async () => {
        console.log('setMessages before check: ', setMessages);
        if (typeof setMessages !== 'function') {
            console.error('setMessages is not a function');
            return;
        }

        setIsResetting(true);

        try {
            const response = await fetch('http://localhost:8000/reset');
            console.log("Initial status:", status);
            if(!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        } finally {
            setIsResetting(false);
        }
    };

    return (
        <div className="body">
        <div className="container">
            {/* <div className="italicText"> Rachel</div> */}
                <button 
                    className="button animate-pulse" 
                    onClick={resetConversation} 
                    disabled={isResetting}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="icon"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    {isResetting ? 'Resetting...' : 'Reset Conversation'}
                </button>
        </div>
        </div>
      )
}

export default Title;