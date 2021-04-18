import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import './style.scss';

const data = [
  {
    name: 'Spring 2021',
    water: 500,
    yield: 800,
  },
  {
    name: 'Summer 2021',
    water: 980,
    yield: 800,
  },
  {
    name: 'Fall 2021',
    water: 400,
    yield: 800,
  },
  {
    name: 'Winter 2021',
    water: 400,
    yield: 2200,
  },
];

const EnvironmentalStrain = (props) => {
  return (
    <div className="EnvironmentalStrain">
      <h3 className="stat-title">Environmental Strain</h3>
      <p className="sub-title">Recommendation based off nutrient levels</p>
      <ResponsiveContainer width="99%" aspect={1.5}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            allowDataOverflow={true}
            tick={{ fontSize: 10 }}
            interval={0}
          />
          <YAxis unit="t" />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="water"
            stackId="1"
            stroke="#4091DC"
            fill="#4091DC"
          />
          <Area
            type="monotone"
            dataKey="yield"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnvironmentalStrain;
