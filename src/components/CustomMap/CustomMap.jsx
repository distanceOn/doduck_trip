import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import { List, Select } from "antd";
import { NavLink } from "react-router-dom";
import "leaflet/dist/leaflet.css"; // Импортируем CSS Leaflet

const roads = [
  {
    id: 1,
    name: "Маршрут 1",
    points: [
      { coords: [45.03547, 38.975313], address: "Краснодар", id: 1 },
      { coords: [45.0457, 38.98], address: "Что то", id: 2 },
    ],
  },
  {
    id: 2,
    name: "Маршрут 2",
    points: [
      { coords: [43.03547, 38.975313], address: "DDDD", id: 1 },
      { coords: [45.0457, 38.98], address: "Что то", id: 2 },
    ],
  },
];

export const CustomMap = () => {
  const mapRef = useRef(null);
  const [road, setRoad] = useState(roads[0]);
  const [selectedRouteId, setSelectedRouteId] = useState(1);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const map = mapRef.current;

    // Clear previous markers and polylines
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    // Add new markers and polylines
    road.points.forEach((point) => {
      const marker = new L.marker(point.coords).addTo(map);
      marker.bindPopup(point.address);
    });

    const polyline = new L.polyline(
      road.points.map((point) => point.coords),
      {
        color: "#0000FF",
        weight: 2,
      }
    ).addTo(map);

    // Set map bounds
    map.fitBounds(polyline.getBounds());
  }, [road]);

  const onChangeRoad = (id) => {
    setSelectedRouteId(id);
    setRoad(roads.find((road) => road.id === id));
  };

  return (
    <div className=" z-0 flex flex-col items-center justify-center w-full px-8 relative mt-28 ">
      <MapContainer
        ref={mapRef}
        center={[45.03547, 38.975313]}
        zoom={13}
        style={{
          width: "100%",
          height: "400px",
          borderRadius: "10px",
          zIndex: 1,
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {road.points.map((point) => (
          <Marker key={point.id} position={point.coords}>
            <Popup>
              <NavLink to={"/places/" + point.id}> {point.address}</NavLink>
            </Popup>
          </Marker>
        ))}
        <Polyline
          pathOptions={{ color: "#0000FF", weight: 2 }}
          positions={road.points.map((point) => point.coords)}
        />
      </MapContainer>
      <Select
        defaultValue={selectedRouteId}
        onChange={onChangeRoad}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 1000,
          width: "20%",
          height: "fit-content",
        }}
      >
        {roads.map((road) => (
          <Select.Option key={road.id} value={road.id}>
            {road.name}
          </Select.Option>
        ))}
      </Select>
      <List
        className="p-2"
        itemLayout="horizontal"
        dataSource={road.points}
        renderItem={(item) => (
          <List.Item>
            <NavLink to={"/places/" + item.id}>{item.address}</NavLink>
          </List.Item>
        )}
      />
    </div>
  );
};
