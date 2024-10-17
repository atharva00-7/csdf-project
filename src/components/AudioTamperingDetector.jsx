import React from 'react';

const AudioTamperingDetector = ({ channelData }) => {
  const analyzeTampering = (data) => {
    const threshold = 0.1;
    let suspiciousChanges = 0;
    for (let i = 1; i < data.length; i++) {
      const amplitudeDifference = Math.abs(data[i] - data[i - 1]);
      if (amplitudeDifference > threshold) {
        suspiciousChanges++;
      }
    }
    const tamperingProbability = suspiciousChanges / data.length;
    return tamperingProbability > 0.01 
      ? 'This audio file may have been tampered with.'
      : 'No obvious signs of tampering detected.';
  };

  const result = analyzeTampering(channelData);

  return (
    <div className="mt-4 p-2 bg-blue-100 border border-blue-300 rounded">
      <h2 className="font-bold">Tampering Analysis:</h2>
      <p>{result}</p>
    </div>
  );
};

export default AudioTamperingDetector;