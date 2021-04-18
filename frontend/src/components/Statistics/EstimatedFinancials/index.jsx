import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

import './style.scss';

const data = [
  {
    name: 'Spring 2021',
    spending: -4000,
    revenue: 2400,
  },
  {
    name: 'Summer 2021',
    spending: -5000,
    revenue: 2400,
  },
  {
    name: 'Fall 2021',
    spending: -4000,
    revenue: 2400,
  },
  {
    name: 'Winter 2021',
    spending: -4000,
    revenue: 2400,
  },
];

const EstimatedFinancials = (props) => {
  return (
    <div className="EstimatedFinancials">
      <h3 className="stat-title">Estimated Financials</h3>
      <p className="sub-title">Recommendation based off nutrient levels</p>
      <ResponsiveContainer width="99%" aspect={1.5}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            allowDataOverflow={true}
            tick={{ fontSize: 10 }}
            interval={0}
          />
          <YAxis unit="$" />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="spending" fill="#FF1F1F" />
          <Bar dataKey="revenue" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EstimatedFinancials;
