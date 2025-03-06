import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [1200, 1900, 3000, 5000, 2400, 3500],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 8,
    },
  ],
};

const options: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: { display: true },
    title: {
      display: true,
      text: 'Monthly Revenue Trend',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  interaction: {
    mode: 'nearest' as const,
    axis: 'x' as const,
    intersect: false,
  },
};

const LineChart: React.FC = () => {
  return <Line data={data} options={options} />;
};

export default LineChart;
