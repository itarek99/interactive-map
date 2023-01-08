import { Circle, MapContainer, Popup, TileLayer } from 'react-leaflet';

const Map = ({ data }) => {
  return (
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
            <p>
              Coverage: {((circle.radius / 1000) * (circle.radius / 1000) * 3.1416).toFixed(0)} km<sup>2</sup>
            </p>
            <p className='m-0 !p-0'>Usages: {circle.usage}</p>
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
};
export default Map;
