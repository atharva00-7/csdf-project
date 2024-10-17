import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, CategoryScale, Filler } from 'chart.js';

ChartJS.register(LinearScale, PointElement, LineElement, CategoryScale, Filler);

const AudioWaveform = ({ waveform }) => {
  const data = {
    labels: Array.from({ length: waveform.length }, (_, i) => i),
    datasets: [
      {
        label: 'Audio Waveform',
        data: waveform,
        fill: true,
        backgroundColor: 'rgba(74, 144, 226, 0.2)',
        borderColor: 'rgba(74, 144, 226, 1)',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="waveform-container mt-4">
      <h2 className="text-lg font-bold">Waveform:</h2>
      <div className="flex items-center justify-center">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default AudioWaveform;