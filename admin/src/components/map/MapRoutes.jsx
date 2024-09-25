import React, { useMemo, useRef, useState } from "react";
import { GoogleMap, Polyline } from '@react-google-maps/api';

const MapView = (props) => {
  const mapRef = useRef(null);
  const [position, setPosition] = useState({
    lat: 13.078339,
    lng: 80.180592,
  });

  const options = useMemo(() => ({
    mapId: "28fbb85fa828483f",
    disableDefaultUI: true,
    clickableIcons: false,
  }), []);

  // Adjust the map bounds to fit the polyline
  const fitBoundsToPolyline = () => {
    if (mapRef.current && props.route && props.route.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      props.route.forEach(coord => bounds.extend(coord));
      mapRef.current.fitBounds(bounds);  // Automatically adjust zoom and position to fit the polyline
    }
  };

  function handleLoad(map) {
    mapRef.current = map;
    fitBoundsToPolyline();  // Fit bounds when the map loads
  }

  function handleCenter() {
    if (!mapRef.current) return;
    const newPos = mapRef.current.getCenter().toJSON();
    setPosition(newPos);
  }

  return (
    <div className="w-full h-full rounded-md overflow-hidden" style={props.style}>
      <GoogleMap
        zoom={14}  // Higher zoom level for better visibility
        mapContainerStyle={{ width: '100%', height: '100%' }}
        onDragEnd={handleCenter}
        onLoad={handleLoad}
        center={position}
        mapContainerClassName="map-container"
        options={options}
      >
        {/* Display the route using Polyline */}
        {props.route && (
          <Polyline
            path={props.route} // Pass the route array of coordinates
            options={{
              strokeColor: "#FF0000", // Red color for better visibility
              strokeOpacity: 1.0,
              strokeWeight: 4, // Increase stroke weight for better visibility
            }}
          />
        )}

        {props.children}
      </GoogleMap>
    </div>
  );
};

export default MapView;
