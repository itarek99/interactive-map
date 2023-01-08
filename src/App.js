import { Circle, MapContainer, Popup, TileLayer } from 'react-leaflet';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

function App() {
  let usages = [{ usage_point: 0 }, { usage_point: 0 }, { usage_point: 0 }, { usage_point: 0 }];

  const data = [
    {
      center: [51.508, -0.11],
      radius: 300000,
      color: '#2E28B7',
      usage: 6000,
    },
    {
      center: [51.5, -100.09],
      radius: 500000,
      color: '#789EFF',
      usage: 4000,
    },
    {
      center: [22.08, 78.88],
      radius: 500000,
      color: '#789EFF',
      usage: 3000,
    },
    {
      center: [45.08, 78.88],
      radius: 500000,
      color: '#62b4ff',
      usage: 900,
    },
    {
      center: [69.08, 78.88],
      radius: 500000,
      color: '#b7e6ff',
      usage: 400,
    },
    {
      center: [55.08, 88.88],
      radius: 500000,
      color: '#b7e6ff',
      usage: 400,
    },
    {
      center: [60.08, 50.88],
      radius: 500000,
      color: '#b7e6ff',
      usage: 400,
    },
    {
      center: [23.8, 90.4],
      radius: 200000,
      color: '#2E28B7',
      usage: 6000,
    },
  ];

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

  const totalCoverage = data.reduce((acc, cur) => {
    return acc + cur.radius;
  }, 0);
  const totalUsages = data.reduce((acc, cur) => {
    return acc + cur.usage;
  }, 0);

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
    <div className='h-screen flex justify-center items-center container mx-auto px-2 gap-12'>
      <div>
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
            <div className='h-4 w-4 bg-blue-800'></div>
            <p>
              Total Coverage: {(totalCoverage / 1000).toFixed(0)} km<sup>2</sup>
            </p>
          </div>
          <div className='flex items-center gap-2 mt-2'>
            <div className='h-4 w-4 bg-blue-800'></div>
            <p>Total Usages: {totalUsages}</p>
          </div>
        </div>
      </div>

      <MapContainer
        zoomControl={false}
        attributionControl={false}
        className='h-72 md:h-[350px] w-full max-w-lg'
        center={[42.5, -0.0]}
        zoom={1}
        scrollWheelZoom={true}
        dragging={true}
        touchZoom={false}
      >
        <TileLayer url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png' noWrap={true} />

        {data.map((circle, index) => (
          <Circle
            fillOpacity={0.4}
            key={index}
            center={circle.center}
            radius={circle.radius}
            color={circle.color}
            weight={0.5}
          >
            <Popup>
              <p>{((((circle.radius / 1000) * circle.radius) / 1000) * 3.1416).toFixed(0)}</p>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
