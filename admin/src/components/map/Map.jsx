import React, { useMemo, useRef, useState } from "react";
import { GoogleMap } from '@react-google-maps/api';

export const MapView = ({children, style}) => {
  const mapRef = useRef(null);
  const [position, setPosition] = useState({
    lat: 13.078339,
    lng: 80.180592
  });

  const options = useMemo(() => ({
    mapId: "28fbb85fa828483f",
    disableDefaultUI: true,
    clickableIcons: false
  }), []);

  function handleLoad(map) {
    mapRef.current = map;
  }

  function handleCenter() {
    if (!mapRef.current) return;
    const newPos = mapRef.current.getCenter().toJSON();
    setPosition(newPos);
  }

  return (
    <div className="w-full h-full rounded-md overflow-hidden" style={style}>
      <GoogleMap
        zoom={7}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        onDragEnd={handleCenter}
        onLoad={handleLoad}
        center={position}
        mapContainerClassName="map-container"
        options={options} // Ensuring options are passed correctly
      >
        {children}
      </GoogleMap>
    </div>
  );
};

export default MapView;
