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
  BarElement,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { monthlyProgress } from '../../data/userData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ProgressChartProps {
  variant?: 'line' | 'doughnut';
}

const ProgressChart: React.FC<ProgressChartProps> = ({ variant = 'line' }) => {
  const lineChartData = {
    labels: monthlyProgress.map(item => item.month),
    datasets: [
      {
        label: 'Total Score',
        data: monthlyProgress.map(item => item.score),
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const doughnutData = {
    labels: ['Correct', 'Incorrect'],
    datasets: [
      {
        data: [68, 32],
        backgroundColor: ['#22c55e', '#ef4444'],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    cutout: '70%',
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4">
        {variant === 'line' ? 'Performance Over Time' : 'Quiz Accuracy'}
      </h3>
      <div className="h-60">
        {variant === 'line' ? (
          <Line data={lineChartData} options={lineOptions} />
        ) : (
          <Doughnut data={doughnutData} options={doughnutOptions} />
        )}
      </div>
    </div>
  );
};

export default ProgressChart;