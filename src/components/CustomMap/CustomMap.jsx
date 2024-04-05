import { Map } from "@pbe/react-yandex-maps";
import { useEffect, useState } from "react";

export const CustomMap = () => {
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    getUserLocation()
      .then((location) => setUserLocation(location))
      .catch((error) => console.error("Error getting location:", error));
  }, []);

  if (!userLocation) {
    return <div>Получение местоположения...</div>;
  }

  return (
    <Map
      defaultState={{
        center: [userLocation.latitude, userLocation.longitude],
        zoom: 9,
      }}
    />
  );
};
