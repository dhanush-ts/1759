import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardOverview from '@/components/global/OverviewCard';
import { MdLocalPostOffice, MdOutlineLocalShipping, MdSpeed } from 'react-icons/md';
import { TbRoute } from 'react-icons/tb';
import { FaBox } from "react-icons/fa";
import Status from '@/components/global/ActiveStatus';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart, Bar } from 'recharts';

// Mock data for multiple mail routes
const mockMailRoutes = [
    {
      id: 2001,
      name: 'Route A Express',
      type: 'Intra-City',
      status: true,
      transportMode: 'Bus',
      tracker: {
        lastUpdated: '2024-09-30T10:15:00Z',
        estimatedArrival: '2024-09-30T10:30:00Z',
        delayStatus: 'On Time',
      },
      mailCapacity: 5000, // in kg
      totalDistance: 50, // km
      nextMaintenance: '2024-12-01',
      maintenanceHistory: [
        { date: '2024-08-01', type: 'Vehicle Service', cost: 3000 },
        { date: '2024-06-15', type: 'Route Optimization', cost: 1500 },
        { date: '2024-04-10', type: 'Equipment Upgrade', cost: 4000 },
      ],
      routePerformance: {
        onTimePercentage: 95,
        averageDelay: 10, // minutes
        mostDelayedStop: 'Central Hub',
      },
      mailAnalytics: {
        averageOccupancy: 80, // percentage
        peakHours: ['08:00', '17:00'],
        totalMailProcessedToday: 4000, // kg
      },
      efficiencyData: [
        { date: '2024-01', efficiency: 88 },
        { date: '2024-02', efficiency: 90 },
        { date: '2024-03', efficiency: 89 },
        { date: '2024-04', efficiency: 92 },
        { date: '2024-05', efficiency: 93 },
        { date: '2024-06', efficiency: 91 },
      ],
      routePerformanceData: [
        { date: '2024-01', onTime: 93, delay: 12 },
        { date: '2024-02', onTime: 95, delay: 10 },
        { date: '2024-03', onTime: 92, delay: 15 },
        { date: '2024-04', onTime: 94, delay: 10 },
        { date: '2024-05', onTime: 96, delay: 8 },
        { date: '2024-06', onTime: 95, delay: 10 },
      ],
      mailVolumeData: [
        { time: '00:00', volume: 2000 },
        { time: '06:00', volume: 3000 },
        { time: '12:00', volume: 2500 },
        { time: '18:00', volume: 3500 },
        { time: '23:59', volume: 1500 },
      ],
    },
    {
      id: 2002,
      name: 'Route B Express',
      type: 'Intra-City',
      status: true,
      transportMode: 'Bus',
      tracker: {
        lastUpdated: '2024-09-30T10:30:00Z',
        estimatedArrival: '2024-09-30T10:45:00Z',
        delayStatus: 'On Time',
      },
      mailCapacity: 4000,
      totalDistance: 45,
      nextMaintenance: '2024-11-15',
      maintenanceHistory: [
        { date: '2024-07-10', type: 'Vehicle Service', cost: 2000 },
        { date: '2024-05-20', type: 'Route Optimization', cost: 1200 },
        { date: '2024-03-15', type: 'Equipment Upgrade', cost: 3500 },
      ],
      routePerformance: {
        onTimePercentage: 90,
        averageDelay: 20,
        mostDelayedStop: 'District Post Office',
      },
      mailAnalytics: {
        averageOccupancy: 75,
        peakHours: ['09:00', '19:00'],
        totalMailProcessedToday: 3500,
      },
      efficiencyData: [
        { date: '2024-01', efficiency: 80 },
        { date: '2024-02', efficiency: 82 },
        { date: '2024-03', efficiency: 81 },
        { date: '2024-04', efficiency: 85 },
        { date: '2024-05', efficiency: 86 },
        { date: '2024-06', efficiency: 84 },
      ],
      routePerformanceData: [
        { date: '2024-01', onTime: 87, delay: 22 },
        { date: '2024-02', onTime: 88, delay: 20 },
        { date: '2024-03', onTime: 85, delay: 25 },
        { date: '2024-04', onTime: 90, delay: 20 },
        { date: '2024-05', onTime: 91, delay: 15 },
        { date: '2024-06', onTime: 89, delay: 20 },
      ],
      mailVolumeData: [
        { time: '00:00', volume: 1000 },
        { time: '06:00', volume: 2500 },
        { time: '12:00', volume: 2000 },
        { time: '18:00', volume: 3000 },
        { time: '23:59', volume: 1000 },
      ],
    },
    {
      id: 2005,
      name: 'Route A Suburban Service',
      type: 'Intra-City',
      status: true,
      transportMode: 'Bus',
      tracker: {
        lastUpdated: '2024-09-30T11:00:00Z',
        estimatedArrival: '2024-09-30T11:15:00Z',
        delayStatus: 'On Time',
      },
      mailCapacity: 4500,
      totalDistance: 60,
      nextMaintenance: '2024-12-10',
      maintenanceHistory: [
        { date: '2024-08-20', type: 'Vehicle Service', cost: 2500 },
        { date: '2024-06-05', type: 'Route Optimization', cost: 1400 },
        { date: '2024-04-18', type: 'Equipment Upgrade', cost: 3800 },
      ],
      routePerformance: {
        onTimePercentage: 92,
        averageDelay: 15,
        mostDelayedStop: 'Suburban Hub',
      },
      mailAnalytics: {
        averageOccupancy: 78,
        peakHours: ['08:30', '18:30'],
        totalMailProcessedToday: 3600,
      },
      efficiencyData: [
        { date: '2024-01', efficiency: 83 },
        { date: '2024-02', efficiency: 85 },
        { date: '2024-03', efficiency: 84 },
        { date: '2024-04', efficiency: 86 },
        { date: '2024-05', efficiency: 87 },
        { date: '2024-06', efficiency: 85 },
      ],
      routePerformanceData: [
        { date: '2024-01', onTime: 90, delay: 20 },
        { date: '2024-02', onTime: 92, delay: 18 },
        { date: '2024-03', onTime: 89, delay: 22 },
        { date: '2024-04', onTime: 93, delay: 15 },
        { date: '2024-05', onTime: 94, delay: 12 },
        { date: '2024-06', onTime: 92, delay: 15 },
      ],
      mailVolumeData: [
        { time: '00:00', volume: 1500 },
        { time: '06:00', volume: 2800 },
        { time: '12:00', volume: 2300 },
        { time: '18:00', volume: 3200 },
        { time: '23:59', volume: 1300 },
      ],
    },
  ];
  

const EnhancedBusDashboard = () => {
    const { id } = useParams(); 
    const mailRoute = mockMailRoutes.find(route => route.id == id) || {};
    console.log(id);

    if (!id) {
        return <div>Vehicle not found for ID {id}</div>;
    }

    return (
        <div className="w-full h-full pb-5 space-y-8">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <CardOverview title="Route" description="Mail Route Name" value={mailRoute.name || "N/A"} Icon={<TbRoute />} />
                <CardOverview title="Type" description="Route Type" value={mailRoute.type || "N/A"} Icon={<MdLocalPostOffice />} />
                <CardOverview title="Transport" description="Mode of Transport" value={mailRoute.transportMode || "N/A"} Icon={<MdOutlineLocalShipping />} />
                <CardOverview title="Status" description="Current Status" value={<Status active={mailRoute.status} size={9} />} Icon={<MdSpeed size={20} />} />
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CardOverview title="Tracker ID" description="Mail Route Tracker ID" value={mailRoute.id || "N/A"} Icon={<MdLocalPostOffice />} />
                <CardOverview title="Last Updated" description="Tracker Last Updated" value={mailRoute.tracker?.lastUpdated ? new Date(mailRoute.tracker.lastUpdated).toLocaleString() : "N/A"} />
                <CardOverview title="ETA" description="Estimated Time of Arrival" value={mailRoute.tracker?.estimatedArrival ? new Date(mailRoute.tracker.estimatedArrival).toLocaleString() : "N/A"} />
            </div>

            {/* Route Stats Section */}
            <div className="pt-6 space-y-6">
                <h2 className="text-3xl font-bold border-b-2">Route Stats</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <CardOverview title="Mail Capacity" description="Total Capacity (kg)" value={`${mailRoute.mailCapacity || 0} kg`} Icon={<FaBox size={20} color="grey" />} />
                    <CardOverview title="Total Distance" description="Route Length (km)" value={`${mailRoute.totalDistance || 0} km`} />
                    <CardOverview title="Delay Status" description="Current Delay Status" value={mailRoute.tracker?.delayStatus || "N/A"} />
                    <CardOverview title="Next Maintenance" description="Scheduled Maintenance" value={mailRoute.nextMaintenance || "N/A"} />
                </div>
            </div>

            {/* Efficiency Section */}
            <div className="pt-6 space-y-4">
                <h2 className="text-3xl font-bold border-b-2">Route Efficiency</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Efficiency</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">{mailRoute.efficiencyData?.[mailRoute.efficiencyData.length - 1]?.efficiency || "N/A"}%</div>
                            <Progress value={mailRoute.efficiencyData?.[mailRoute.efficiencyData.length - 1]?.efficiency || 0} className="mt-2" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Efficiency Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={mailRoute.efficiencyData || []}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="efficiency" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Maintenance Section */}
            <div className="pt-6 space-y-4">
                <h2 className="text-3xl font-bold border-b-2">Maintenance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Next Maintenance</CardTitle>
                            <CardDescription>Upcoming Maintenance</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{mailRoute.nextMaintenance || "N/A"}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Maintenance History</CardTitle>
                            <CardDescription>Recent Maintenance Records</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Cost (₹)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mailRoute.maintenanceHistory?.map((entry, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{entry.date || "N/A"}</TableCell>
                                            <TableCell>{entry.type || "N/A"}</TableCell>
                                            <TableCell>{entry.cost || "N/A"}</TableCell>
                                        </TableRow>
                                    )) || <TableRow><TableCell colSpan={3}>No maintenance history available</TableCell></TableRow>}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Performance Section */}
            <div className="pt-6 space-y-4">
                <h2 className="text-3xl font-bold border-b-2">Route Performance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>On-Time Percentage</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">{mailRoute.routePerformance?.onTimePercentage || 0}%</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Average Delay</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">{mailRoute.routePerformance?.averageDelay || 0} mins</div>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={mailRoute.routePerformanceData || []}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="onTime" fill="#82ca9d" />
                                    <Bar dataKey="delay" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Additional sections like delivery records or more performance metrics can go here */}
        </div>
    );
};

export default EnhancedBusDashboard;
