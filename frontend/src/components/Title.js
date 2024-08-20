import React, {useEffect, useState} from "react";
// import axios from "axios";

function Title( {setMessages} ) {

    const [isResetting, setIsResetting] = useState(false);

    //Rest the conversation
    const resetConversation = async () => {
        setIsResetting(true);

        try {
            const response = await fetch('http://localhost:8000/reset');
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
        <div>
            <button onClick={resetConversation} disabled={isResetting}>
                {isResetting ? 'Resetting...' : 'Reset Conversation'}
            </button>
        </div>
      )
}

export default Title