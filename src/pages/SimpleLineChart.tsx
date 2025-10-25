// SimpleLineChart.tsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  data: { createdAt: string; amount: number }[];
}

const SimpleLineChart: React.FC<Props> = ({ data }) => (
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={data}>
      <XAxis dataKey="createdAt" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="amount" stroke="#0B7456" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
);

export default SimpleLineChart;
