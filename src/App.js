import { useEffect, useState } from 'react';
import Chart from './components/Chart';
import Map from './components/Map';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('./data.json')
      .then((res) => res.json())
      .then((result) => setData(result));
  }, []);

  return (
    <div className='h-screen flex flex-col md:flex-row justify-center items-center container mx-auto px-2 gap-12'>
      <Chart data={data} />
      <Map data={data} />
    </div>
  );
}

export default App;
