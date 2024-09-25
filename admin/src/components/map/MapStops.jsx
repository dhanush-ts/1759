import React from 'react'
import Map from './Map'

import { Polyline } from '@react-google-maps/api'
import { useSelector } from 'react-redux'
import StopMarker from './StopMark'
import { Badge } from "@/components/ui/badge"
import { CardDescription } from '../ui/card'


const MapStops = () => {
    const { stops } = useSelector((state) => state.Stop)
    const { buses } = useSelector((state) => state.Bus)

    return (
        <Map zoom={12}>
            {
                stops.map((stop, index) => {
                    const coords = stop.location.coordinate
                    const stopsBus = stop.busId.map((bus) => buses.find((a) => a.id === bus))
                    
                    return <StopMarker position={{ lat: coords[1], lng: coords[0] }} stop={stop} type={2} key={index}>
                        {stop.busId.length > 0 && (
                            <>
                                <h1 className='text-lg font-bold text-black'>Buses: </h1>
                        <div className='flex flex-row space-x-5'>
                                    {stopsBus.map((bus, index) => {
                                        if (bus) {
                                            return (
                                                <Badge variant="secondary" className='text-md font-bold flex flex-col items-start' key={index}>
                                            <CardDescription>{bus?.busNumber} / {bus?.busSet}
                                            </CardDescription>
                                            <CardDescription>{bus?.busName}
                                            </CardDescription>
                                            </Badge>)
                                        }
                                    })}
                        </div>
                            </>
                        )
                        }
                    </StopMarker>
                })
            }
            {
                buses.map((bus) => {
                    const polyLine = bus.stops_polyline.map((poly) => ({lat: poly[0], lng: poly[1]}))
                    return (
                          <Polyline
                            path={polyLine}
                            options={{
                            strokeColor:'#F94C10',
                                strokeOpacity: 1,
                                strokeWeight:3,
                        }}/>
                    )
                })
            }
                    <div className='absolute bottom-10 left-1/2 -translate-x-1/2 bg-primary px-4 py-2 rounded-2xl flex flex-row space-x-6 items-center'>
                        <div className='flex flex-col'>
                        <CardDescription>Total Stops</CardDescription>
                    <h5 className='text-secondary font-bold text-lg'>{stops.length}</h5>
                        </div>
                        <div className='flex flex-col'>
                        <CardDescription>Total number of routes</CardDescription>
                    <h5 className='text-secondary font-bold text-lg'>{buses.length}</h5>
                        </div>
                    </div>
        </Map>
    )
}

export default MapStops