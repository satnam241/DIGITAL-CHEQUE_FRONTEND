// SimpleDoughnutChart.tsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  data: { name: string; cheques: number }[];
}

const SimpleDoughnutChart: React.FC<Props> = ({ data }) => {
  const chartData = {
    labels: data.map(p => p.name),
    datasets: [
      {
        label: "Plans",
        data: data.map(p => p.cheques),
        backgroundColor: ["#667eea", "#764ba2", "#f093fb", "#f5576c", "#4facfe"],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={chartData} />;
};

export default SimpleDoughnutChart;
