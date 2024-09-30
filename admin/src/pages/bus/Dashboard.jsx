import React, { useState } from 'react'
import { Bus, Ship, Train, MoreVertical, AlertTriangle, Fuel, RefreshCw, Layers } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from "@/components/ui/card"

// Card component to display each transport vehicle's info
const TransportCard = ({ transport }) => {
  const navigate = useNavigate()
  return (
    <Card className="cursor-pointer" onClick={() => {
      navigate(`${transport.id}`)
    }}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold">Transport {transport.id}</span>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Status:</span>
            <span className={`font-semibold ${transport.status === 'On Route' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
              {transport.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Route:</span>
            <span>{transport.route}</span>
          </div>
          <div className="flex justify-between">
            <span>Driver:</span>
            <span>{transport.driver}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Fuel:</span>
            <div className="flex items-center">
              <Fuel className="h-4 w-4 mr-1" />
              <Progress value={transport.fuel} className="w-20" />
            </div>
          </div>
          <div className="flex justify-between">
            <span>Next Stop:</span>
            <span>{transport.nextStop}</span>
          </div>
          <div className="flex justify-between">
            <span>ETA:</span>
            <span>{transport.eta}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Main dashboard component for managing the transport system
function TransportFleetDashboard() {
  const [selectedType, setSelectedType] = useState('all')
  const transports = [
    { id: 2001, type: 'Bus', status: 'On Route', route: 'Route A', driver: 'John Doe', fuel: 75, nextStop: 'Central Hub', eta: '10:30 AM' },
    { id: 2002, type: 'Bus', status: 'On Route', route: 'Route B', driver: 'Jane Smith', fuel: 60, nextStop: 'District Post Office', eta: '10:45 AM' },
    { id: 2003, type: 'Ship', status: 'In Maintenance', route: 'N/A', driver: 'N/A', fuel: 100, nextStop: 'N/A', eta: 'N/A' },
    { id: 2004, type: 'Airplane', status: 'On Route', route: 'Route C', driver: 'Bob Johnson', fuel: 85, nextStop: 'Local Airport', eta: '11:00 AM' },
    { id: 2005, type: 'Bus', status: 'On Route', route: 'Route A', driver: 'Alice Brown', fuel: 50, nextStop: 'Suburban Hub', eta: '11:15 AM' },
    { id: 2006, type: 'Ship', status: 'On Route', route: 'Route D', driver: 'Charlie Wilson', fuel: 70, nextStop: 'Marina', eta: '11:30 AM' },
    { id: 2007, type: 'Airplane', status: 'On Route', route: 'Route E', driver: 'Emily Davis', fuel: 90, nextStop: 'International Airport', eta: '11:45 AM' },
    { id: 2008, type: 'Train', status: 'On Route', route: 'Route F', driver: 'David Smith', fuel: 80, nextStop: 'Main Station', eta: '11:50 AM' },
  ]

  // Filter transports based on selected type
  const filteredTransports = selectedType === 'all' ? transports : transports.filter(t => t.type === selectedType);

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-1/4 p-4 border-r border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Transport Overview</h2>
          <Button variant="outline" size="icon">
            <Layers className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="space-y-4">
            {[ 
              { label: 'Total Transports', value: transports.length },
              { label: 'Active Transports', value: transports.filter(t => t.status === 'On Route').length },
              { label: 'In Maintenance', value: transports.filter(t => t.status === 'In Maintenance').length },
              { label: 'Idle', value: transports.filter(t => t.status === 'Idle').length },
            ].map((item) => (
              <Card key={item.label}>
                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <span>{item.label}</span>
                    <span className="font-bold">{item.value}</span>
                  </div>
                  <Progress value={(item.value / transports.length) * 100} className="mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <Select onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Transport Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Bus">Buses</SelectItem>
                <SelectItem value="Ship">Ships</SelectItem>
                <SelectItem value="Airplane">Airplanes</SelectItem>
                <SelectItem value="Train">Rails</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh
            </Button>
          </div>
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTransports.map((transport) => (
              <TransportCard key={transport.id} transport={transport} />
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="w-1/4 p-4 border-l border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4">Alerts</h2>
        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="space-y-4">
            {[ 
              { type: 'Delay', message: 'Transport 2002 is running 20 minutes late on Route B' },
              { type: 'Maintenance', message: 'Transport 2003 requires immediate maintenance check' },
              { type: 'Route Change', message: 'Route C diverted due to road work on Main Street' },
              { type: 'Weather', message: 'Heavy rain expected, prepare for potential delays' },
              { type: 'Overcrowding', message: 'Transport 2005 reporting overcrowding on Route A' },
            ].map((alert, index) => (
              <Card key={index} className="cursor-pointer">
                <CardContent className="p-3 flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">{alert.type}</h3>
                    <p className="text-sm">{alert.message}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default TransportFleetDashboard
