import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Truck, Package, BarChart, MapPin } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import MapView from '@/components/map/Map'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import AgencyTable from "./Create"

// Mocked data for the dashboard
const logisticsData = [
  { id: 1, name: "FastTrack Logistics", packages: 1250, type: "Express", location: "Delhi" },
  { id: 2, name: "SecureShip Co.", packages: 980, type: "Secure", location: "Chennai" },
  { id: 3, name: "EcoDelivery", packages: 750, type: "Eco-friendly", location: "Nagpur" },
  { id: 4, name: "BulkMove Inc.", packages: 2100, type: "Bulk", location: "Bangalore" },
  { id: 5, name: "SwiftParcel", packages: 1600, type: "Express", location: "Hosur" },
]

const packageTypes = [
  { name: 'Letters', value: 4012 },
  { name: 'Parcels', value: 2534 },
  { name: 'Large Packages', value: 1512 },
  { name: 'Pallets', value: 887 },
]

const COLORS = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12']

export default function Index() {
  const [activeHandlers] = useState(logisticsData.length)
  const totalPackages = logisticsData.reduce((sum, handler) => sum + handler.packages, 0)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Postal Transportation Agency Hub Dashboard</h1>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">All Page</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {/* All Page Content */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Handlers</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeHandlers}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPackages.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Package Types</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{packageTypes.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Locations</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{new Set(logisticsData.map(d => d.location)).size}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Third-Party Logistics Handlers</CardTitle>
                <CardDescription>Overview of active handlers and their current load</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Packages</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logisticsData.map((handler) => (
                      <TableRow key={handler.id}>
                        <TableCell className="font-medium">{handler.name}</TableCell>
                        <TableCell>{handler.packages.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{handler.type}</Badge>
                        </TableCell>
                        <TableCell>{handler.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Package Type Distribution</CardTitle>
                <CardDescription>Breakdown of different package types being handled</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={packageTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {packageTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Handler Locations</CardTitle>
              <CardDescription>Geographical distribution of logistics handlers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full bg-muted flex items-center justify-center">
                <MapView />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          {/* Details Content */}
          <Card>
            <CardHeader>
              <CardTitle>Logistics Details</CardTitle>
              <CardDescription>Detailed information about logistics operations.</CardDescription>
            </CardHeader>
            <CardContent>
                <AgencyTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
