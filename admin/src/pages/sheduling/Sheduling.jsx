import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bus, Clock, MapPin, Users } from "lucide-react"

export default function BusSchedulingDashboard() {
  const routes = [
    {
      id: 1,
      name: "Route 1",
      stops: 6,
      duration: "5h 00m",
      distance: "120 km",
      vehicle: "Truck 1",
      driver: "John Doe",
      startTime: "8:00 AM",
      endTime: "1:00 PM",
      schedule: [
        { time: "8:00", stop: "Stop 1" },
        { time: "9:00", stop: "Stop 2" },
        { time: "10:00", stop: "Stop 3" },
        { time: "11:00", stop: "Stop 4" },
        { time: "12:00", stop: "Stop 5" },
        { time: "13:00", stop: "Stop 6" },
      ],
    },
    {
      id: 2,
      name: "Route 2",
      stops: 6,
      duration: "5h 00m",
      distance: "120 km",
      vehicle: "Truck 2",
      driver: "Jane Smith",
      startTime: "9:00 AM",
      endTime: "2:00 PM",
      schedule: [
        { time: "9:00", stop: "Stop 1" },
        { time: "10:00", stop: "Stop 2" },
        { time: "11:00", stop: "Stop 3" },
        { time: "12:00", stop: "Stop 4" },
        { time: "13:00", stop: "Stop 5" },
        { time: "14:00", stop: "Stop 6" },
      ],
    },
  ]

  const colors = [
    "bg-pink-200 dark:bg-pink-700",
    "bg-blue-200 dark:bg-blue-700",
    "bg-yellow-200 dark:bg-yellow-700",
    "bg-green-200 dark:bg-green-700",
    "bg-purple-200 dark:bg-purple-700",
    "bg-orange-200 dark:bg-orange-700",
  ]

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-64 bg-white dark:bg-gray-800 p-4 border-r dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Route Layers</h2>
        <div className="space-y-2">
          {["Route", "Stops", "Time Windows", "Vehicle Capacity"].map((layer) => (
            <div key={layer} className="flex items-center">
              <Checkbox id={layer} />
              <label htmlFor={layer} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                {layer}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bus Scheduling Dashboard</h1>
          <Button>Optimize</Button>
        </div>

        {routes.map((route) => (
          <Card key={route.id} className="mb-6 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">{route.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-2 mb-4">
                {route.schedule.map((stop, index) => (
                  <div key={index} className={`p-2 rounded ${colors[index % colors.length]}`}>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {`${route.id}-${String.fromCharCode(65 + index)}`}
                    </div>
                    <div className="text-xs text-gray-700 dark:text-gray-300">{stop.time}</div>
                    <div className="text-xs text-gray-700 dark:text-gray-300">{stop.stop}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="w-80 bg-white dark:bg-gray-800 p-4 border-l dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Route Details</h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {routes.map((route) => (
            <Card key={route.id} className="mb-4 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">{route.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-900 dark:text-gray-200" />
                    <span className="text-sm text-gray-900 dark:text-gray-200">Stops: {route.stops}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-900 dark:text-gray-200" />
                    <span className="text-sm text-gray-900 dark:text-gray-200">Duration: {route.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-900 dark:text-gray-200" />
                    <span className="text-sm text-gray-900 dark:text-gray-200">Distance: {route.distance}</span>
                  </div>
                  <div className="flex items-center">
                    <Bus className="w-4 h-4 mr-2 text-gray-900 dark:text-gray-200" />
                    <span className="text-sm text-gray-900 dark:text-gray-200">Vehicle: {route.vehicle}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-gray-900 dark:text-gray-200" />
                    <span className="text-sm text-gray-900 dark:text-gray-200">Driver: {route.driver}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-900 dark:text-gray-200" />
                    <span className="text-sm text-gray-900 dark:text-gray-200">
                      Time: {route.startTime} - {route.endTime}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </div>
    </div>
  )
}
