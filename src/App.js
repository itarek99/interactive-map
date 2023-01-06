import { Circle, MapContainer, Popup, TileLayer } from 'react-leaflet';

function App() {
  const circles = [
    {
      center: [51.508, -0.11],
      radius: 300000,
      color: 'red',
    },
    {
      center: [51.5, -100.09],
      radius: 500000,
      color: '#2E28B7',
    },
    {
      center: [22.08, 78.88],
      radius: 500000,
      color: '#2E28B7',
    },
    {
      center: [45.08, 78.88],
      radius: 500000,
      color: '#2E28B7',
    },
    {
      center: [69.08, 78.88],
      radius: 500000,
      color: '#2E28B7',
    },
  ];

  return (
    <div className='h-screen flex justify-center items-center container mx-auto px-2'>
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

        {circles.map((circle, index) => (
          <Circle key={index} center={circle.center} radius={circle.radius} color={circle.color} weight={0.5}>
            <Popup>
              <p>{circle.radius}</p>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
