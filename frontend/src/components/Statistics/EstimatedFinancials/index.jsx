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

import * as Analysis from "analysis"

import './style.scss';

const EstimatedFinancials = (props) => {
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
  let result = Analysis.determineSpendingAndRevenue(exampleInput)
  console.log(result)
  
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
      data[j].spending = result.spending[j]
      data[j].revenue = result.revenue[j]
  }

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
