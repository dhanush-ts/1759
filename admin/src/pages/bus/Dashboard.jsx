import React from 'react'
import MapBuses from '@/components/map/MapBuses'

const Dashboard = () => {
    return (
        <div className='flex flex-col space-y-4 h-[calc(100vh-150px)] '>
        <div className='h-full w-full relative'>
          <MapBuses/>
        </div>
        </div>
    )
}

export default Dashboard