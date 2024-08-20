import React from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';
import RecordIcon from './RecordIcon';

function RecordMessage( {handleStop} ) {
  return (
    <ReactMediaRecorder
        audio
        onStop = {handleStop}
        render = {({status, startRecording, stopRecording}) => (
            <div className='mt-2'>
                <button 
                onMouseDown={startRecording}
                onMouseUp={stopRecording}> 
                    ICON
                </button>
                <p>
                    {status}
                </p>
            </div>
        )}
    />
  );
}

export default RecordMessage