import React, { useState } from 'react';
import AudioWaveform from './AudioWaveform';
import AudioMetadata from './AudioMetadata';
import AudioTamperingDetector from './AudioTamperingDetector';

const AudioUpload = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [audioMetadata, setAudioMetadata] = useState(null);
  const [waveform, setWaveform] = useState(null);
  const [channelData, setChannelData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const arrayBuffer = e.target.result;

        try {
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          const channelData = audioBuffer.getChannelData(0);
          setChannelData(channelData);

          const waveformLength = 300;
          const step = Math.ceil(channelData.length / waveformLength);
          const waveformPoints = [];
          for (let i = 0; i < channelData.length; i += step) {
            const slice = channelData.slice(i, i + step);
            const avg = slice.reduce((sum, value) => sum + Math.abs(value), 0) / slice.length;
            waveformPoints.push(avg);
          }

          setWaveform(waveformPoints);
          setAudioFile(file);
          setAudioMetadata({
            name: file.name,
            size: file.size,
            type: file.type,
            duration: audioBuffer.duration,
            sampleRate: audioBuffer.sampleRate,
          });
        } catch (error) {
          console.error('Error analyzing audio:', error);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="mb-4 border border-gray-300 p-2 rounded"
      />
      {audioFile && (
        <audio controls src={URL.createObjectURL(audioFile)} className="mb-4" />
      )}
      {audioMetadata && <AudioMetadata audioData={audioMetadata} />}
      {waveform && <AudioWaveform waveform={waveform} />}
      {channelData && <AudioTamperingDetector channelData={channelData} />}
    </div>
  );
};

export default AudioUpload;