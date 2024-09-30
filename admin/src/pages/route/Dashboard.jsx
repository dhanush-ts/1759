import React, { useState, useCallback } from "react";
import { MarkerF, PolylineF, InfoWindowF } from "@react-google-maps/api";
import MapView from "@/components/map/Map"; // Adjust path if necessary

const Dashboard = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [activeMarker, setActiveMarker] = useState(null); // State for active marker

  // Static coordinates for demonstration purposes
  const sampleOrigin = { lat: 13.0827, lng: 80.2707 }; // Chennai
  const sampleDestination = { lat: 12.9716, lng: 77.5946 }; // Bangalore
  console.log(sampleOrigin)

  // Static encoded PolylineFs for two routes
  const optimalRoutePath = [
    { lat: 13.0827, lng: 80.2707 },
    { lat: 12.9716, lng: 77.5946 }
  ];

  const alternativeRoutePath = [
    { lat: 13.0827, lng: 80.2707 },
    { lat: 12.5, lng: 78.2 },
    { lat: 12.9716, lng: 77.5946 }
  ];

  const handleOptimizeRoute = useCallback(() => {
    // This function will trigger the display of the static routes
    // In a dynamic setup, this is where the Google Directions API would be called
  }, []);

  const handleMarkerClick = useCallback((marker) => {
    setActiveMarker(marker);
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setActiveMarker(null);
  }, []);

  return (
    <div className="w-full h-full p-4 space-y-6">
      <h2 className="text-3xl font-bold mb-4">Route Optimization</h2>

      {/* Input for Origin and Destination */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="origin" className="block text-lg font-medium mb-2">
            Origin
          </label>
          <input
            type="text"
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="Enter origin location"
          />
        </div>
        <div>
          <label htmlFor="destination" className="block text-lg font-medium mb-2">
            Destination
          </label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="Enter destination location"
          />
        </div>
      </div>

      <button
        onClick={handleOptimizeRoute}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Optimize Route
      </button>

      {/* Map Section */}
      <div className="w-full h-[500px] mt-4">
        <MapView
          style={{ height: "100%" }}
          // center={{ lat: 12.5, lng: 79.0 }} // Centering between the two cities
          // zoom={7} // Adjust zoom level to ensure both markers and routes are visible
        >
          {/* Static MarkerFs for origin and destination */}
          <MarkerF
            position={sampleOrigin}
            label="A"
            onClick={() => handleMarkerClick('origin')}
          />
          <MarkerF
            position={sampleDestination}
            label="B"
            onClick={() => handleMarkerClick('destination')}
          />

          {/* InfoWindow for the origin marker */}
          {activeMarker === 'origin' && (
            <InfoWindowF
              position={sampleOrigin}
              onCloseClick={handleInfoWindowClose}
            >
              <div>
                <h4>Origin: Chennai</h4>
                <p>Lat: 13.0827, Lng: 80.2707</p>
              </div>
            </InfoWindowF>
          )}

          {/* InfoWindow for the destination marker */}
          {activeMarker === 'destination' && (
            <InfoWindowF
              position={sampleDestination}
              onCloseClick={handleInfoWindowClose}
            >
              <div>
                <h4>Destination: Bangalore</h4>
                <p>Lat: 12.9716, Lng: 77.5946</p>
              </div>
            </InfoWindowF>
          )}

          {/* Render the Optimal Route (Bright) */}
          <PolylineF
            path={optimalRoutePath}
            options={{
              strokeColor: "#0000FF", // Bright Blue
              strokeOpacity: 1,
              strokeWeight: 5,
            }}
          />

          {/* Render the Alternative Route (Dim) */}
          <PolylineF
            path={alternativeRoutePath}
            options={{
              strokeColor: "#808080", // Dim Gray
              strokeOpacity: 0.6,
              strokeWeight: 4,
            }}
          />
        </MapView>
      </div>

      {/* Route Details */}
      <div className="mt-4">
        <h3 className="text-2xl font-bold">Route Details</h3>
        <p>Optimal Route Distance: 350 km</p>
        <p>Optimal Route Duration: 5 hours 30 mins</p>
        <p>Alternative Route Distance: 400 km</p>
        <p>Alternative Route Duration: 6 hours</p>
      </div>
    </div>
  );
};

export default Dashboard;
