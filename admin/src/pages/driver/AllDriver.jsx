import React from 'react';
import DataTable  from '../../components/global/DataTable';
import {driverColumns} from '../../lib/columns';
import { useSelector } from 'react-redux';

const Driver = () => {
  const drivers = useSelector((state) => state.Driver.drivers);
  console.log(drivers)
  return (
    <div className='flex flex-col space-y-4'>
      <h1 className='font-medium text-xl'>All Drivers</h1>
      <DataTable columns={driverColumns} data={drivers} />
    </div>
  );
};

export default Driver;