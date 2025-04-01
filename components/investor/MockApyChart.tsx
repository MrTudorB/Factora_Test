'use client';

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

// Mock data for the last 12 months
const mockData = [
  { name: 'Jan', apy: 4.2 },
  { name: 'Feb', apy: 4.5 },
  { name: 'Mar', apy: 4.8 },
  { name: 'Apr', apy: 4.6 },
  { name: 'May', apy: 5.1 },
  { name: 'Jun', apy: 5.3 },
  { name: 'Jul', apy: 5.0 },
  { name: 'Aug', apy: 5.4 },
  { name: 'Sep', apy: 5.6 },
  { name: 'Oct', apy: 5.8 },
  { name: 'Nov', apy: 5.5 },
  { name: 'Dec', apy: 5.7 },
];

export default function MockApyChart() {
  return (
    <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Historical APY Performance</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={mockData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name"
              tick={{ fill: '#6B7280' }}
              tickLine={{ stroke: '#6B7280' }}
            />
            <YAxis
              tick={{ fill: '#6B7280' }}
              tickLine={{ stroke: '#6B7280' }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '0.375rem',
              }}
              formatter={(value: number) => [`${value.toFixed(1)}%`, 'APY']}
            />
            <defs>
              <linearGradient id="apyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="apy"
              stroke="#3B82F6"
              fill="url(#apyGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          Historical APY performance over the last 12 months. Past performance does not guarantee future results.
        </p>
      </div>
    </div>
  );
} 