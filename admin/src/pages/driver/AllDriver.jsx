import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, PhoneCall, Mail, Truck, Package, BarChart, Clock, Calendar } from "lucide-react"

// Mock data for the agency
const agencyData = {
  id: 1,
  name: "FastTrack Logistics",
  status: "Active",
  logo: "/placeholder.svg?height=100&width=100",
  description: "FastTrack Logistics is a leading provider of express shipping and logistics solutions. With a focus on speed and reliability, we ensure your packages reach their destination quickly and safely.",
  contactPerson: "John Doe",
  email: "john@fasttrack.com",
  phone: "+1 (555) 123-4567",
  address: "123 Speedy Lane, Quickville, QT 12345",
  performanceRating: 4.8,
  onTimeDeliveryRate: 98.5,
  totalShipments: 15780,
  averageShippingTime: "2.3 days",
  customerSatisfaction: 4.7,
}

const recentShipments = [
  { id: "SH001", destination: "New York, NY", status: "Delivered", date: "2023-07-01" },
  { id: "SH002", destination: "Los Angeles, CA", status: "In Transit", date: "2023-07-02" },
  { id: "SH003", destination: "Chicago, IL", status: "Processing", date: "2023-07-03" },
  { id: "SH004", destination: "Houston, TX", status: "Delivered", date: "2023-07-01" },
  { id: "SH005", destination: "Phoenix, AZ", status: "In Transit", date: "2023-07-02" },
]

export const AllDriver = () => {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <Avatar className="h-20 w-20 mr-4">
            <AvatarImage src={agencyData.logo} alt={`${agencyData.name} logo`} />
            <AvatarFallback>{agencyData.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{agencyData.name}</h1>
            <Badge variant={agencyData.status === "Active" ? "default" : "secondary"} className="mt-2">
              {agencyData.status}
            </Badge>
          </div>
        </div>
        <Button>Contact Agency</Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Agency Overview</CardTitle>
          <CardDescription>{agencyData.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{agencyData.address}</span>
            </div>
            <div className="flex items-center">
              <PhoneCall className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{agencyData.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{agencyData.email}</span>
            </div>
            <div className="flex items-center">
              <Truck className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{agencyData.totalShipments.toLocaleString()} Total Shipments</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Performance Overview</TabsTrigger>
          <TabsTrigger value="shipments">Recent Shipments</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Performance Rating</span>
                    <span>{agencyData.performanceRating.toFixed(1)} / 5.0</span>
                  </div>
                  <Progress value={agencyData.performanceRating * 20} className="h-2" />
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">On-Time Delivery Rate</span>
                    <span>{agencyData.onTimeDeliveryRate}%</span>
                  </div>
                  <Progress value={agencyData.onTimeDeliveryRate} className="h-2" />
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Customer Satisfaction</span>
                    <span>{agencyData.customerSatisfaction.toFixed(1)} / 5.0</span>
                  </div>
                  <Progress value={agencyData.customerSatisfaction * 20} className="h-2" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Average Shipping Time</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{agencyData.averageShippingTime}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{agencyData.totalShipments.toLocaleString()}</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="shipments">
          <Card>
            <CardHeader>
              <CardTitle>Recent Shipments</CardTitle>
              <CardDescription>Overview of the latest shipments handled by {agencyData.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shipment ID</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentShipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">{shipment.id}</TableCell>
                      <TableCell>{shipment.destination}</TableCell>
                      <TableCell>
                        <Badge variant={shipment.status === "Delivered" ? "default" : "secondary"}>
                          {shipment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{shipment.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}