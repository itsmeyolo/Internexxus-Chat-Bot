import React from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';
import './RecordMessage.css';
import RecordIcon from './RecordIcon';

function RecordMessage({ handleStop }) {
  return (
    <ReactMediaRecorder
      audio
      onStop={handleStop}
      render={({ status, startRecording, stopRecording }) => (
        <div className='record-message-container'>
          <button 
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            className='record-message-button'>
            <RecordIcon 
              classText={status === "recording" ? "recording-icon" : "idle-icon"}
            />
          </button>
          <p className='record-message-text'>
            {status}
          </p>
        </div>
      )}
    />
  );
}

export default RecordMessage;
