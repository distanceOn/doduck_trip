import { useYMaps } from "@pbe/react-yandex-maps";
import { List } from "antd";
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const points = [
  { coords: [45.03547, 38.975313], address: "Краснодар", id: 1 },
  { coords: [45.0457, 38.98], address: "Что то", id: 2 },
];

export const CustomMap = () => {
  const mapRef = useRef(null);
  const ymaps = useYMaps(["Map", "Placemark", "Polyline"]);

  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }

    const map = new ymaps.Map(mapRef.current, {
      center: [45.03547, 38.975313],
      zoom: 10,
    });

    points.forEach((point) => {
      const placemark = new ymaps.Placemark(point.coords, {
        balloonContent: point.address,
      });
      map.geoObjects.add(placemark);
    });

    const route = new ymaps.Polyline(
      points.map((point) => point.coords),
      {
        strokeColor: "#0000FF",
        strokeWidth: 2,
      }
    );
    map.geoObjects.add(route);
  }, [ymaps]);
  return (
    <div>
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "300px",
        }}
      ></div>
      <List
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
