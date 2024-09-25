import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MapView from '@/components/map/Map'; // Adjust path if necessary
import { getBus } from '@/store/reducer/BusReducer';

const Dashboard = () => {
  const bus = useSelector((state) => state.Route.routes);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getBus(id));
    }
  }, [id, dispatch]);

  if (!bus || bus.length === 0) {
    return <div>Loading...</div>; // Loading message
  }

  // Extract the first route's polyline data as an example
  const routePolylines = bus[0]?.stops_polyline.map(polyline => ({
    lat: polyline[0],
    lng: polyline[1],
  }));

  console.log(routePolylines);

  return (
    <div className="h-[700px] w-full relative">
      <MapView route={routePolylines} /> {/* Pass route as prop */}
    </div>
  );
};

export default Dashboard;
