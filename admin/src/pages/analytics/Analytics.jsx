import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { LineChart, Line } from 'recharts'
import { PieChart, Pie, Cell } from 'recharts'
import { Truck, MapPin, Package, Clock, TrendingUp, Zap, AlertTriangle, ThumbsUp } from 'lucide-react'
import MapView from '@/components/map/Map'

// Enhanced mock data for India Post
const kpiData = [
  { title: "Total Vehicles", value: "5,200", icon: <Truck className="h-5 w-5 text-indigo-600" />, change: "+3.2%" },
  { title: "Active Routes", value: "1,245", icon: <MapPin className="h-5 w-5 text-blue-600" />, change: "+12" },
  { title: "Daily Mail Volume", value: "2.8M", icon: <Package className="h-5 w-5 text-green-600" />, change: "+5.1%" },
  { title: "On-Time Delivery", value: "92%", icon: <Clock className="h-5 w-5 text-yellow-600" />, change: "+2.5%" },
  { title: "Fuel Efficiency", value: "6.8 km/L", icon: <Zap className="h-5 w-5 text-purple-600" />, change: "+0.4 km/L" },
  { title: "Transmission Issues", value: "38", icon: <AlertTriangle className="h-5 w-5 text-red-600" />, change: "-22%" },
  { title: "Customer Satisfaction", value: "4.4/5", icon: <ThumbsUp className="h-5 w-5 text-pink-600" />, change: "+0.2" },
  { title: "Revenue", value: "₹22.5M", icon: <TrendingUp className="h-5 w-5 text-orange-600" />, change: "+6.3%" },
]

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

const routeDetailsData = [
  { id: 1, name: 'Delhi-Mumbai', vehicles: 85, avgVolume: '250,000', efficiency: '94%', satisfaction: '4.5/5' },
  { id: 2, name: 'Mumbai-Chennai', vehicles: 72, avgVolume: '180,000', efficiency: '91%', satisfaction: '4.3/5' },
  { id: 3, name: 'Kolkata-Bangalore', vehicles: 68, avgVolume: '150,000', efficiency: '88%', satisfaction: '4.1/5' },
  { id: 4, name: 'Chennai-Hyderabad', vehicles: 78, avgVolume: '200,000', efficiency: '93%', satisfaction: '4.4/5' },
  { id: 5, name: 'Delhi-Kolkata', vehicles: 82, avgVolume: '220,000', efficiency: '90%', satisfaction: '4.2/5' },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function MailTransmissionDashboard() {
  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">India Post Mail Transmission Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((item, index) => (
          <Card key={index} className="hover:shadow-xl shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{item.value}</div>
              <p className={`text-xs ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {item.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">Route Efficiency vs Mail Volume</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Comparing efficiency scores with average daily mail volume</CardDescription>
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
                <Bar yAxisId="right" dataKey="volume" fill="#82ca9d" name="Avg. Daily Volume" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">Mail Volume Trend and Forecast</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Monthly mail volume with next month forecast</CardDescription>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">Transmission Mode Distribution</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Percentage of mail transmitted by each mode</CardDescription>
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

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">Route Performance Overview</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Key metrics for top-performing routes</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-900 dark:text-gray-100">Route</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">Vehicles</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">Avg. Volume</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">Efficiency</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">Satisfaction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routeDetailsData.map((route) => (
                  <TableRow key={route.id}>
                    <TableCell className="font-medium text-gray-900 dark:text-gray-100">{route.name}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{route.vehicles}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{route.avgVolume}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{route.efficiency}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{route.satisfaction}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Mail Transmission Network Map</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Interactive map of all active mail routes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[500px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <MapView />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}