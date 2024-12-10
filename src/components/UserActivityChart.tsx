'use client';

import React from 'react';
import { Card } from 'react-bootstrap';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface UserData {
  name: string;
  registrationDate: string;
  hours: number;
  role?: string;
}

interface UserActivityChartProps {
  data: UserData[];
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div
      className="custom-tooltip"
      style={{
        backgroundColor: 'white',
        padding: '10px',
        border: '1px solid #ccc',
      }}
    >
      <p><strong>{label}</strong></p>
      <p>
        User:
        {payload[0].payload.name}
      </p>
      <p>
        Registration Date:
        {payload[0].payload.registrationDate}
      </p>
      <p>
        Total Hours:
        {payload[0].value}
      </p>
      <p>
        Role:
        {payload[0].payload.role}
      </p>
    </div>
  );
};

const UserActivityChart: React.FC<UserActivityChartProps> = ({ data }) => {
  console.log('Chart received data:', data);

  return (
    <Card>
      <Card.Header>
        <Card.Title>User Registration & Hours Overview</Card.Title>
      </Card.Header>
      <Card.Body>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 70,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                label={{
                  value: 'Total Hours',
                  angle: -90,
                  position: 'insideLeft',
                }}
              />
              <Tooltip content={CustomTooltip} />
              <Legend />
              <Bar
                dataKey="hours"
                name="Total Hours"
                fill="#8884d8"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserActivityChart;
