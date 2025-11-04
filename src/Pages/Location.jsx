import React from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapContainer } from '../components/UI';

const Location = () => {
  return (
    <>
      <title>Location | SQL Rentals</title>
      <MapContainer>
        <Map
          mapboxAccessToken="pk.eyJ1IjoiamFja2lld2ViZGV2IiwiYSI6ImNsdjFoeWlzdzA1NWIydGxkNDZnM2V6NGcifQ.ob63OSXlq8HcLLTYHRirbw"
          initialViewState={{
            longitude: -81.693867,
            latitude: 41.499861,
            zoom: 11,
          }}
          style={{ width: '100vw', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <Marker
            className="hover:scale-150 cursor-pointer relative "
            longitude={-81.693867}
            latitude={41.499861}
            anchor="bottom"
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/collab-checklist.appspot.com/o/media%2FFaviconDiviMap.png?alt=media&token=1bd25b4d-6df9-4f32-a951-ee989c365bbe"
              alt="giraffe"
              className="w-16 animate-bounce"
            />
          </Marker>
        </Map>
      </MapContainer>
    </>
  );
};

export default Location;
