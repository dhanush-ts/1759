import  React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
// import Map from '@/components/Maps/MapBus'
import MapView from '@/components/map/Map'
import CardOverview from '@/components/global/OverviewCard'
import { BsBusFront, BsFillFuelPumpDieselFill } from 'react-icons/bs'
import { TbBusStop } from 'react-icons/tb'
import { FaTruck } from "react-icons/fa";
import Status from '@/components/global/ActiveStatus'
// import { getDistanceAndTime } from '@/lib/getDistanceAndTime'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"   
// import Stepper from '@/components/Stepper'
// import MapBusBackTracking from '@/components/Maps/MapBusBackTracking'
import LineChart from '@/components/charts/SingeLine'
import { getBus } from '@/store/reducer/BusReducer'
import Loader from '@/components/global/Loader'
import { Bargraph } from '@/components/charts/Bargraph'

const Bus = () => {
    const bus = useSelector((state) => state.Bus.bus)
    const { id } = useParams()
    const dispatch = useDispatch()
    // const [totalDistance, estimatedTime] = getDistanceAndTime(bus.stops_distance_time)

    useEffect(() => {
      dispatch(getBus(id))
    }, [])

    if (bus && bus.tracker) {
      return (<div className='w-full h-full pb-5 space-y-8'>
        <div className='space-y-5'>
            <div className='h-[700px] w-full relative'>
              <MapView/>
                {/* <Map stops={bus.stops} busPoly={bus.stops_polyline} id={params.id} /> */}
                {/* <div className='absolute bottom-10 left-1/2 -translate-x-1/2 bg-primary p-2 rounded-2xl flex flex-row space-x-6 items-center'>
                    <Status active={bus.status} size={9} />
                    <div className='flex flex-col'>
                        <CardDescription>Speed</CardDescription>
                        <h5 className='text-secondary font-bold text-lg'>50 Km/h</h5>
                    </div>
                    <div className='flex flex-col'>
                        <CardDescription>Total Distance </CardDescription>
                        <h5 className='text-secondary font-bold text-lg'>{totalDistance} Km</h5>
                    </div>
                    <div className='flex flex-col'>
                        <CardDescription>Total Estimated Time</CardDescription>
                        <h5 className='text-secondary font-bold text-lg'>{estimatedTime}</h5>
                    </div>
                </div> */}
            </div>
            <div className='w-full flex flex-row space-x-2'>
                <CardOverview title='Bus' description='Bus Make' value={bus.make} Icon={<BsBusFront />} />
                <CardOverview title='Name' description='Bus Model' value={bus.model} Icon={<BsBusFront />} />
                <CardOverview title='Fuel' description='Type of fuel used' value='CNG' Icon={<BsFillFuelPumpDieselFill />} />
                <CardOverview title='Status' description='Current status of the bus' value={<Status active={bus.status} size={9} />} Icon={<TbBusStop size={20} />} />
            </div>
            <div className='w-full flex flex-row space-x-2'>
                <CardOverview title='Tracker Id' description='Tracker Id' value={bus.trackerId} Icon={<BsBusFront />} />
                <CardOverview title='Fuel' description={"Fuel level of the vehicle"} value={bus.tracker.fuelLevel} />
                <CardOverview title='Total Seat' description={"Total Seat"} value={bus.seat} />
            </div>
        </div>
        <div className="pt-6 space-y-2">
                    <h1 className="text-4xl font-bold border-b-2">Vehicle Stats</h1>
                    <h3 className="text-2xl font-semibold pt-4">Truck Information</h3>
                    <h3 className="text-1xl">Engine Information</h3>
                    <div className="flex flex-row space-x-2">
                        <CardOverview title='HorsePower' description={"Fuel efficiency in kilometers per litre"} value={"230 HP"} Icon={<FaTruck size={20} color="grey"/>} />
                        <CardOverview title='Engine Capacity' description={"Size of the engine in litres"} value={"6.7 L"} />
                        <CardOverview title='Engine Age' description={"Lifespan of the engine"} value={"5 Years"} />
                        <CardOverview title='Emission Standard' description={"The truck complies with emission standards."} value={"BS VI"} />
                    </div>
                    <h3 className="text-1xl">Vehicle Raw Statistics</h3>
                    <div className="flex flex-row space-x-2">
                        <CardOverview title='Engine Temperature' description={"Temperature of the engine"} value={bus.tracker?.engineTemp}  />
                        <CardOverview title='Coolant Temperature' description={"Size of the engine in litres"} value={bus.tracker?.coolantTemp} />
                        <CardOverview title='Transmission Temperature' description={"Lifespan of the engine"} value={bus.tracker?.transmissionTemp} />
                        <CardOverview title='Emission' description={"Carbon emission"} value={bus.tracker?.co2emission} />
                    </div>
      
                    <div className="flex flex-row space-x-2">
                        <CardOverview title='Engine status' description={"Engine current status (on/off)"} value={bus.tracker?.engineStatus ? 'ON' : 'OFF'} Icon={<FaTruck size={20} color="grey"/>} />
                        <CardOverview title='Engine RPM' description={"Engine RPM"} value={bus.tracker?.engineRpm} />
                        <CardOverview title='Torque' description={"Vehicle Producing Torque"} value={bus.tracker.torque} />
                        <CardOverview title='Battery Level' description={"Vehicle Battery Level"} value={bus.tracker.batteryLevel} />
                        <CardOverview title='Voltage' description={"Vehicle Battery Voltage"} value={bus.tracker.batteryVoltage} />
                    </div>
                    
                    {/* <h1 className=" border-b-2 pt-4"></h1> */}
                    <div className="text-3xl font-bold pt-8 border-b-2">Charts</div>
                    <Tabs className="space-y-4">
                        <TabsContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                                    <Card className="col-span-4">
                                    <CardHeader>
                                        <CardTitle>Mileage</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Bargraph/>
                                    </CardContent> 
                                    </Card>
                                    <Card className="col-span-4">
                                    <CardHeader>
                                        <CardTitle>Recent Shipments</CardTitle>
                                        <CardDescription>
                                        <Bargraph/>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                    </CardContent>
                                    </Card>
                                </div>
                                
                             </TabsContent>
                             </Tabs>
                </div>
        <div className='space-y-4'>
            <h3 className='text-4xl font-bold'>Stops</h3>
            <div className='flex flex-row space-x-6 w-full'>
                {/* <Stepper steps={bus.stops} distance_time={bus.stops_distance_time} />
                <div className='flex flex-col space-y-2 w-full'>
                    {
                        bus.stops.map((stop, index) => {
                            return (
                                <Card className='h-full p-4 space-y-1' key={index}>
                                    <div className='flex flex-row justify-between '>
                                        <CardTitle>{index + 1}) {stop.name}</CardTitle>
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
                                            <p className='font-bold'>{(bus.stops_distance_time[index - 1]?.distance / 1000).toFixed(2)} Km</p>
                                            <CardDescription>Estimated duration from prev stop</CardDescription>
                                            <p className='font-bold'>{Math.floor(bus.stops_distance_time[index - 1]?.duration / 60)} min</p>
                                        </div>
                                    )}

                                </Card>)
                        })
                    }
                </div> */}
                <div className='flex flex-col w-1/3 space-y-4'>
                    {/* <Card className='w-full'>
                        <CardHeader>
                            <h3 className='font-bold text-4xl'>Bus Details</h3>
                            <CardDescription>{bus.busName}</CardDescription>
                        </CardHeader>
                        <CardContent className='flex flex-col gap-y-4'>
                            <div className='space-y-1'>
                                <CardTitle>Total Stops</CardTitle>
                                <CardDescription>{bus.stops.length}</CardDescription>
                            </div>
                            <div className='space-y-1'>
                                <CardTitle>Description</CardTitle>
                                <CardDescription>{bus.description}</CardDescription>
                            </div>
                            <div className='space-y-1'>
                                <CardTitle>Origin</CardTitle>
                                <CardDescription>{bus.origin}</CardDescription>
                            </div>
                            <div className='space-y-1'>
                                <CardTitle>Total Seats</CardTitle>
                                <CardDescription>{bus.seats}</CardDescription>
                            </div>
                            <div className='space-y-1'>
                                <CardTitle>AC</CardTitle>
                                <Status active={bus.ac} size={9} />
                            </div>
                        </CardContent>
                    </Card> */}
                    {bus.driver && (<Card className='w-full'>
                        <CardHeader>
                            <h3 className='font-bold text-4xl'>Driver</h3>
                            <CardDescription>{bus.busName}</CardDescription>
                        </CardHeader>
                        <CardContent className='flex flex-row gap-x-4'>
                            <img src={bus.driver.image.url} alt='hello' width={80} height={80} className='rounded-full' />
                            <div className='flex flex-col'>
                                <h3>{bus.driver.name}</h3>
                                <CardDescription>{bus.driver.phoneNumber}</CardDescription>
                            </div>
                        </CardContent>
                    </Card>)}

                </div>
            </div>
        </div>
        <div className='flex flex-col space-y-2'>
            <div className='w-full space-y-2'>
                <h3 className='text-2xl font-bold '>Back Tracking</h3>
                <div className='h-[600px] w-full relative'>
                    {/* <MapBusBackTracking id={bus.tracker} /> */}
                </div>
            </div>
            <div className='w-full space-y-2'>
                <h3 className='text-2xl font-bold '>Speed Graph</h3>
                <div className='h-[800px] w-full'>
                    {/* <LineChart id={bus.tracker} /> */}
                </div>
            </div>
        </div>
    </div>)
    }else {
      <Loader/>
    }
    

}

export default Bus