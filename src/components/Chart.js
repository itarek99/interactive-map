import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const Chart = ({ data }) => {
  let usages = [
    { name: '> $5K', usage_point: 0 },
    { name: '$1K-$5K', usage_point: 0 },
    { name: '$500-$1K', usage_point: 0 },
    { name: '< $500', usage_point: 0 },
  ];

  const totalCoverage = data.reduce((acc, cur) => {
    return acc + (((cur.radius / 1000) * cur.radius) / 1000) * 3.1416;
  }, 0);

  const totalUsages = data.reduce((acc, cur) => {
    return acc + cur.usage;
  }, 0);

  data.forEach((region) => {
    if (region.usage > 5000) {
      return usages[0].usage_point++;
    }
    if (region.usage > 1000) {
      return usages[1].usage_point++;
    }
    if (region.usage > 500) {
      return usages[2].usage_point++;
    }

    return usages[3].usage_point++;
  });

  const COLORS = ['#2E28B7', '#789EFF', '#62b4ff', '#b7e6ff'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className='flex flex-col-reverse sm:flex-row md:flex-col items-center gap-6 md:gap-2'>
      <ResponsiveContainer height={200} width={200}>
        <PieChart>
          <Pie
            data={usages.sort((a, b) => a.usage_point - b.usage_point)}
            cx='50%'
            cy='50%'
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill='#8884d8'
            dataKey='usage_point'
          >
            {usages.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className='mt-6'>
        <div className='flex items-center gap-2'>
          <div className='h-4 w-4 bg-blue-600 rounded-full'></div>
          <p>
            Total Coverage: {totalCoverage.toFixed(0)} km<sup>2</sup>
          </p>
        </div>
        <div className='flex items-center gap-2 mt-2'>
          <div className='h-4 w-4 bg-blue-600 rounded-full'></div>
          <p>Total Usages: {totalUsages}</p>
        </div>
      </div>
    </div>
  );
};
export default Chart;
