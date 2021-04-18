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
import * as Analysis from "analysis"
import './style.scss';


const EnvironmentalStrain = (props) => {
  const exampleInput = [
      {
        crop: "Corn",
        acre: 120
      },
      {
        crop: "Strawberry",
        acre: 30
      },
      {
        crop: "Rice",
        acre: 60
      },
      {
        crop: "Wheat",
        acre: 54
      },
    ];
  const result = Analysis.determineWaterUsageAndYield(exampleInput)
  const data = [
    {
      name: 'Spring 2021',
    },
    {
      name: 'Summer 2021',
    },
    {
      name: 'Fall 2021',
    },
    {
      name: 'Winter 2021',
    },
  ];

  for (let j = 0; j < data.length; j++) {
      data[j].water = result.waterUsage[j].toFixed(2)
      data[j].yield = result.yield[j].toFixed(2) / 10000
  }

  return (
    <div className="EnvironmentalStrain">
      <h3 className="stat-title">Environmental Strain</h3>
      <p className="sub-title">Plotted on 2 key metrics</p>
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
