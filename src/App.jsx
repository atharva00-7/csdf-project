import React from 'react';
import AudioUpload from './components/AudioUpload';

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Audio Waveform Visualizer and Analyzer</h1>
      <AudioUpload />
    </div>
  );
};

export default App;