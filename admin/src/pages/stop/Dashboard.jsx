import React, { useState, useCallback } from "react";
import { MarkerF, PolylineF, InfoWindowF } from "@react-google-maps/api";
import axios from 'axios';
import MapView from "@/components/map/Map"; // Adjust path if necessary

const Dashboard = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [activeMarker, setActiveMarker] = useState(null);
  const [routes, setRoutes] = useState([]); // State to hold all routes
  const [info, setInfo] = useState(null); // State to hold timing info for clicked point

  const apiKey = "AIzaSyAaCWjzUJ1XziqSuWycOTNorOmfe2swDIc"; // Replace with your Google Maps API key

  const handleOptimizeRoute = useCallback(async () => {
    if (!origin || !destination) return;

    try {
      const response = await axios.get(
        `/api/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}&alternatives=true`
      );

      if (response.data.status === "OK") {
        const allRoutes = response.data.routes;
        setRoutes(allRoutes);
      } else {
        console.error("Error fetching directions:", response.data.status);
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  }, [origin, destination, apiKey]);

  const handleMarkerClick = useCallback((marker) => {
    setActiveMarker(marker);
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setActiveMarker(null);
    setInfo(null); // Close the info window for timing as well
  }, []);

  const handlePolylineClick = (event, route, index) => {
    const leg = route.legs[0];
    const totalTime = leg.duration.text; // Get total duration
    const point = event.latLng.toJSON(); // Get clicked point

    // Show timing info
    setInfo({
      position: point,
      time: `Estimated travel time from ${origin} to ${destination} is ${totalTime}.`,
      label: `Route ${index + 1}`, // Label for the clicked route
    });
  };

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
          center={{ lat: 12.5, lng: 79.0 }} // Centering between the two cities
          zoom={7}
        >
          {/* Static MarkerFs for origin and destination */}
          <MarkerF
            position={{ lat: parseFloat(origin.split(',')[0]), lng: parseFloat(origin.split(',')[1]) }}
            label="A"
            onClick={() => handleMarkerClick('origin')}
          />
          <MarkerF
            position={{ lat: parseFloat(destination.split(',')[0]), lng: parseFloat(destination.split(',')[1]) }}
            label="B"
            onClick={() => handleMarkerClick('destination')}
          />

          {/* InfoWindow for the origin marker */}
          {activeMarker === 'origin' && (
            <InfoWindowF
              position={{ lat: parseFloat(origin.split(',')[0]), lng: parseFloat(origin.split(',')[1]) }}
              onCloseClick={handleInfoWindowClose}
            >
              <div>
                <h4>Origin: {origin}</h4>
              </div>
            </InfoWindowF>
          )}

          {/* InfoWindow for the destination marker */}
          {activeMarker === 'destination' && (
            <InfoWindowF
              position={{ lat: parseFloat(destination.split(',')[0]), lng: parseFloat(destination.split(',')[1]) }}
              onCloseClick={handleInfoWindowClose}
            >
              <div>
                <h4>Destination: {destination}</h4>
              </div>
            </InfoWindowF>
          )}

          {/* Render the Routes (Polylines) */}
          {routes.length > 0 && (
            <>
              {/* Render other routes in gray first */}
              {routes.slice(1).map((route, index) => {
                const path = route.legs[0].steps.map(step => ({
                  lat: step.start_location.lat,
                  lng: step.start_location.lng,
                }));

                return (
                  <PolylineF
                    key={index}
                    path={path}
                    options={{
                      strokeColor: "#808080", // Gray for other routes
                      strokeOpacity: 1,
                      strokeWeight: 5,
                    }}
                    onClick={(event) => handlePolylineClick(event, route, index + 1)} // Adjust index for display
                  />
                );
              })}

              {/* Render the best route in blue last */}
              <PolylineF
                path={routes[0].legs[0].steps.map(step => ({
                  lat: step.start_location.lat,
                  lng: step.start_location.lng,
                }))}
                options={{
                  strokeColor: "#0000FF", // Blue for best route
                  strokeOpacity: 1,
                  strokeWeight: 5,
                }}
                onClick={(event) => handlePolylineClick(event, routes[0], 1)} // Best route
              />
            </>
          )}

          {/* InfoWindow for timing info */}
          {info && (
            <InfoWindowF
              position={info.position}
              onCloseClick={handleInfoWindowClose}
            >
              <div>
                <h4>{info.label}</h4>
                <p>{info.time}</p>
              </div>
            </InfoWindowF>
          )}
        </MapView>
      </div>
    </div>
  );
};

export default Dashboard;
