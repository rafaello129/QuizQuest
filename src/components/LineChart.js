// src/components/LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const LineChart = ({ data }) => {
  return <Line data={data} />;
};

export default LineChart;
