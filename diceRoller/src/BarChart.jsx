import { Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function ResultsBarChart({result, damage}) {
if (!result)
  return null;

  const data = [
    {name: "Hits", value: result.avgHits},
    {name: "Lethal Hits", value: result.avgLethalHits},
    {name: "Devastating Wounds", value: result.avgDevastatingWounds},
    {name: "Total Wounds", value: result.avgWounds},
    {name: "Total Saves", value: result.avgSaves},
    {name: "Failed Saves", value: result.avgFailedSaves},
    {name: "Total Damage", value: result.avgModelsKilled * damage},
    {name: "Models Killed", value: result.avgModelsKilled}
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <Bar dataKey="value" fill="green" barSize={30} />
        <XAxis dataKey="name" stroke="red" />
        <YAxis stroke="red" />
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      </BarChart>
    </ResponsiveContainer>
  );

}