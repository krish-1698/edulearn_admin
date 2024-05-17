import React from 'react';
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);


const PieChart = ({ data }) => {
  // Sample data format: { labels: [...], datasets: [{ data: [...] }] }
  
  return (
    <div>
      <Pie  data={data} />
    </div>
  );
};

export default PieChart;
