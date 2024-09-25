import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { LineChart, Line } from 'recharts'
import { PieChart, Pie, Cell } from 'recharts'
import { Truck, Package, MapPin, Users, TrendingUp } from 'lucide-react'
import MapView from '@/components/map/Map'

const CardOverview = ({ title, value, description, icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
)

const routeEfficiencyData = [
  { name: 'Delhi-Mumbai', efficiency: 94, volume: 250000 },
  { name: 'Mumbai-Chennai', efficiency: 91, volume: 180000 },
  { name: 'Kolkata-Bangalore', efficiency: 88, volume: 150000 },
  { name: 'Chennai-Hyderabad', efficiency: 93, volume: 200000 },
  { name: 'Delhi-Kolkata', efficiency: 90, volume: 220000 },
]

const mailVolumeTrendData = [
  { month: 'Jan', actual: 2600000, forecast: 2550000 },
  { month: 'Feb', actual: 2700000, forecast: 2650000 },
  { month: 'Mar', actual: 2800000, forecast: 2750000 },
  { month: 'Apr', actual: 2900000, forecast: 2850000 },
  { month: 'May', actual: 3000000, forecast: 2950000 },
  { month: 'Jun', actual: 2950000, forecast: 3000000 },
]

const transmissionModeData = [
  { name: 'Road', value: 45 },
  { name: 'Rail', value: 30 },
  { name: 'Air', value: 20 },
  { name: 'Sea', value: 5 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">India Post Dashboard</h1>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-8">
          <div className="w-full h-[400px] mb-8">
            <MapView />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <CardOverview 
              title="Vehicles" 
              value="5,200" 
              description="Total number of vehicles in service" 
              icon={<Truck className="h-4 w-4 text-muted-foreground" />}
            />
            <CardOverview 
              title="Daily Mail Volume" 
              value="2.8M" 
              description="Average daily mail processed" 
              icon={<Package className="h-4 w-4 text-muted-foreground" />}
            />
            <CardOverview 
              title="Post Offices" 
              value="155,015" 
              description="Total number of post offices" 
              icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
            />
            <CardOverview 
              title="Staff" 
              value="423,000" 
              description="Total number of postal employees" 
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
            />
            <CardOverview 
              title="Revenue" 
              value="₹12,730 Cr" 
              description="Annual revenue (FY 2022-23)" 
              icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Route Efficiency vs Mail Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={routeEfficiencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="efficiency" fill="#8884d8" name="Efficiency (%)" />
                    <Bar yAxisId="right" dataKey="volume" fill="#82ca9d" name="Mail Volume" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Mail Volume Trend and Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mailVolumeTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual Volume" />
                    <Line type="monotone" dataKey="forecast" stroke="#82ca9d" name="Forecast" strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Transmission Mode Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={transmissionModeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {transmissionModeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}