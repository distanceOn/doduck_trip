import { useEffect, useRef } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import { List } from "antd";
import { NavLink } from "react-router-dom";
import "leaflet/dist/leaflet.css"; // Импортируем CSS Leaflet

const points = [
  { coords: [45.03547, 38.975313], address: "Краснодар", id: 1 },
  { coords: [45.0457, 38.98], address: "Что то", id: 2 },
];

export const CustomMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const map = mapRef.current;

    // Добавление точек на карту
    points.forEach((point) => {
      const marker = new L.marker(point.coords).addTo(map);
      marker.bindPopup(point.address);
    });

    // Построение маршрута
    const polyline = new L.polyline(
      points.map((point) => point.coords),
      {
        color: "#0000FF",
        weight: 2,
      }
    ).addTo(map);

    // Устанавливаем границы карты
    map.fitBounds(polyline.getBounds());
  }, []);

  return (
    <div className=" z-0 flex flex-col items-center justify-center w-full px-8 ">
      <MapContainer
        center={[45.03547, 38.975313]}
        zoom={13}
        style={{ width: "100%", height: "400px", borderRadius: "10px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {points.map((point) => (
          <Marker key={point.id} position={point.coords}>
            <Popup>{point.address}</Popup>
          </Marker>
        ))}
        <Polyline
          pathOptions={{ color: "#0000FF", weight: 2 }}
          positions={points.map((point) => point.coords)}
        />
      </MapContainer>
      <List
        className="p-2"
        itemLayout="horizontal"
        dataSource={points}
        renderItem={(item) => (
          <List.Item>
            <NavLink to={"/places/" + item.id}>{item.address}</NavLink>
          </List.Item>
        )}
      />
    </div>
  );
};
