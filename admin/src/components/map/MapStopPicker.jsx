import { useEffect, useState, memo, useRef } from 'react'
import Map from './Map'
import { useSelector } from 'react-redux'
import StopMarker from './StopMark'
import { DirectionsRenderer } from '@react-google-maps/api'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ImCancelCircle } from 'react-icons/im'
import polyline from '@mapbox/polyline'


const MapStop = ({ setSelectedStop, selectedStop }) => {
    const stops = useSelector((state) => state.Stop.stops)
    const [mapRef, setMapRef] = useState(null)
    const DirectionRef = useRef()
    const [selected, setSelected] = useState([])
    const [direction, setDirection] = useState(null)
    const [distanceAndDuration, setDistanceAndDuration] = useState([])

    useEffect(() => {
        DirectionRef.current = new google.maps.DirectionsService()
    }, [])

    useEffect(() => {
        const helper = async () => {
            if (selected.length > 1) {
                const request = {
                    origin: { lat: selected[0].location.coordinate[1], lng: selected[0].location.coordinate[0] },
                    waypoints: selected.slice(1, -1).map((stop, index) => {
                        return { location: { lat: stop.location.coordinate[1], lng: stop.location.coordinate[0] }, stopover: true }
                    }),
                    destination: { lat: selected[selected.length - 1].location.coordinate[1], lng: selected[selected.length - 1].location.coordinate[0] },
                    travelMode: 'DRIVING',

                }

                const res = await DirectionRef.current.route(request)
                setDirection(res)
                setDistanceAndDuration(res.routes[0].legs)
                const poly = res.routes[0].overview_polyline
                const poly_decode = polyline.decode(poly)
                const distanceAndDuration = res.routes[0].legs.map((leg) => ({
                    distance: leg.distance.value,
                    duration: leg.duration.value
                }))
                setSelectedStop({ stops: selected, poly_decode, distanceAndDuration })
            }
        }
        helper()
    }, [selected])

    useEffect(() => {
        if (selectedStop === null) {
            setSelected([])
            setDirection(null)
            setDistanceAndDuration([])
        }
    }, [selectedStop])

    const onLoad = (map) => {
        setMapRef(map)
    }

    const handleMarkerClick = (stop) => {
        if (selected.find((e) => e.id === stop.id)) {
            setSelected((state) => state.filter((e) => e.id !== stop.id))
        } else {
            setSelected((state) => ([...state, stop]))
        }
    }

    const handleRemove = (id) => {
        setSelected((state) => state.filter((e) => e.id !== id))
    }

    return (
        <div className='space-y-2'>
            <div className='h-[700px] w-full'>
                <Map onLoad={onLoad} >
                    {direction && <DirectionsRenderer directions={direction} />}
                    {stops.map((stop, index) => {
                        if (stop.location) {
                            return (
                                <StopMarker position={{ lat: stop.location.coordinate[1], lng: stop.location.coordinate[0] }} key={index} onClick={() => {
                                    handleMarkerClick(stop)
                                }} stop={stop} type={1}>
                                </StopMarker>
                            )
                        }
                    })}
                </Map>
            </div>
            <Card className="h-full p-2 w-full">
                <CardHeader>
                    <CardTitle>Stops</CardTitle>
                    <CardDescription>Select the stops in the order required from the  map</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col space-y-2'>
                        {
                            selected.map((stop, index) => {
                                return (
                                    <Card className='h-full p-4 space-y-1' key={index}>
                                        <div className='flex flex-row justify-between '>
                                            <CardTitle>{index + 1}) {stop.name}</CardTitle>
                                            <ImCancelCircle size={22} className='cursor-pointer' onClick={() => handleRemove(stop.id)} />
                                        </div>
                                        <CardDescription>{stop.address}</CardDescription>
                                        {index === 0 && (
                                            <div className='py-2'>
                                                <CardDescription>Starting Stop</CardDescription>
                                            </div>
                                        )}
                                        {index >= 1 && (
                                            <div className='py-2'>
                                                <CardDescription>Estimated distance from prev stop</CardDescription>
                                                <p className='font-bold'>{distanceAndDuration[index - 1]?.distance?.text}</p>
                                                <CardDescription>Estimated duration from prev stop</CardDescription>
                                                <p className='font-bold'>{distanceAndDuration[index - 1]?.duration?.text}</p>
                                            </div>
                                        )}

                                    </Card>)
                            })
                        }
                    </div>
                    {distanceAndDuration.lenth > 0 && (
                        <div className='py-2'>
                            <CardDescription>Total Distance</CardDescription>

                            <CardDescription>Total Estimated Time</CardDescription>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>

    )
}

export default memo(MapStop)