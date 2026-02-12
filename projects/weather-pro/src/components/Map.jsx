import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 10);
  return null;
}

function Map({ lat, lon }) {
  return (
    <div className="mt-8 rounded-lg overflow-hidden h-[300px] w-full relative z-0">
      <MapContainer center={[lat, lon]} zoom={10} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <ChangeView center={[lat, lon]} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[lat, lon]}>
          <Popup>
            Location
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
