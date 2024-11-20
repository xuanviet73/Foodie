import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function AboutSection({ restaurant }) {
  const { location, aboutUs } = restaurant;

  return (
    <div>
      <h2 className="font-bold mt-2 text-xl">Giới thiệu về địa điểm</h2>
      <p className="mt-5">{aboutUs}</p>

      {location && (
        <div className="map-container">
          <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[location.latitude, location.longitude]}>
              <Popup>{restaurant.name}</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
}

export default AboutSection;
