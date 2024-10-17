import React from 'react';

const AudioMetadata = ({ audioData }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Audio Metadata</h2>
      <ul className="list-disc list-inside">
        <li>Duration: {audioData.duration ? `${audioData.duration.toFixed(2)} seconds` : 'N/A'}</li>
        <li>Sample Rate: {audioData.sampleRate || 'N/A'} Hz</li>
        <li>Size: {(audioData.size / (1024 * 1024)).toFixed(2)} MB</li>
        <li>Type: {audioData.type || 'N/A'}</li>
      </ul>
    </div>
  );
};

export default AudioMetadata;