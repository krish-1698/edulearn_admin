import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

const BarChart = ({ chartData }) => {
  return (
    <div>
      <h2>Course Income </h2>
      <div style={{ height: '400px', width: '600px' }}>
      <Bar
          data={chartData}
          options={{
            scales: {
              x: {
                type: 'category', // Specify scale type as 'category' for the x-axis
              },
              y: {
                type: 'linear', // Specify scale type as 'linear' for the y-axis
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BarChart;
