import {
  Legend,
  Tooltip,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

// Income or Spend or Transfer or Balance

const data = [
  {
    type: "Income",
    tnxCount: 110,
    fullMark: 150,
  },
  {
    type: "Spend",
    tnxCount: 130,
    fullMark: 150,
  },
  {
    type: "Transfer",
    tnxCount: 130,
    fullMark: 150,
  },
  {
    type: "Balance",
    tnxCount: 100,
    fullMark: 150,
  },
];

const ChartRadarBar = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart outerRadius={120} width={500} height={400} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="type" />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar
          name="Tnx Count"
          dataKey="tnxCount"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.6}
        />
        <Tooltip
          labelStyle={{ fontSize: "0.8rem" }}
          contentStyle={{ fontSize: "0.8rem" }}
        />
        <Legend
          content={<p className="text-center mt-2 font-semibold">Type</p>}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default ChartRadarBar;
