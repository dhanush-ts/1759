import React, { useState } from "react";
import { Input } from "@/components/ui/input"; // ShadCN Input component
import { Button } from "@/components/ui/button"; // ShadCN Button component
import { Progress } from "@/components/ui/progress"; // ShadCN Progress component
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // ShadCN Card components

const packagesData = [
  {
    id: "PK432",
    weight: "2 kg",
    transport: "Airplane",
    status: "In Transit",
    trackingHistory: [
      { location: "Delhi", date: "2024-09-25", transport: "Airplane", description: "Shipped from Delhi" },
      { location: "Chennai", date: "2024-09-26", transport: "Train", description: "Arrived at Chennai" },
      { location: "Coimbatore", date: "2024-09-27", transport: "Truck", description: "Delivered to Coimbatore" },
    ],
  },
  {
    id: "PK472",
    weight: "5 kg",
    transport: "Train",
    status: "Delivered",
    trackingHistory: [
      { location: "Mumbai", date: "2024-09-24", transport: "Train", description: "Shipped from Mumbai" },
      { location: "Bangalore", date: "2024-09-25", transport: "Truck", description: "Delivered to Bangalore" },
    ],
  },
  {
    id: "PK232",
    weight: "1.5 kg",
    transport: "Airplane",
    status: "In Transit",
    trackingHistory: [
      { location: "Delhi", date: "2024-09-26", transport: "Airplane", description: "Shipped from Delhi" },
      { location: "Hyderabad", date: "2024-09-27", transport: "Truck", description: "In transit to Hyderabad" },
    ],
  },
  {
    id: "PK4329",
    weight: "3 kg",
    transport: "Ship",
    status: "In Transit",
    trackingHistory: [
      { location: "Mumbai", date: "2024-09-20", transport: "Ship", description: "Shipped from Mumbai" },
      { location: "Chennai", date: "2024-09-22", transport: "Ship", description: "Arrived at Chennai" },
      { location: "Kochi", date: "2024-09-23", transport: "Truck", description: "In transit to Kochi" },
    ],
  },
  {
    id: "PK4325",
    weight: "10 kg",
    transport: "Train",
    status: "Delivered",
    trackingHistory: [
      { location: "Pune", date: "2024-09-21", transport: "Train", description: "Shipped from Pune" },
      { location: "Ahmedabad", date: "2024-09-22", transport: "Truck", description: "Delivered to Ahmedabad" },
    ],
  },
  {
    id: "PK432",
    weight: "7 kg",
    transport: "Airplane",
    status: "In Transit",
    trackingHistory: [
      { location: "Delhi", date: "2024-09-25", transport: "Airplane", description: "Shipped from Delhi" },
      { location: "Kolkata", date: "2024-09-27", transport: "Truck", description: "In transit to Kolkata" },
    ],
  },
  {
    id: "PK4326",
    weight: "4 kg",
    transport: "Truck",
    status: "Delivered",
    trackingHistory: [
      { location: "Bangalore", date: "2024-09-23", transport: "Truck", description: "Shipped from Bangalore" },
      { location: "Mysore", date: "2024-09-24", transport: "Truck", description: "Delivered to Mysore" },
    ],
  },
  {
    id: "8",
    weight: "8 kg",
    transport: "Airplane",
    status: "In Transit",
    trackingHistory: [
      { location: "Delhi", date: "2024-09-28", transport: "Airplane", description: "Shipped from Delhi" },
      { location: "Hyderabad", date: "2024-09-29", transport: "Truck", description: "In transit to Hyderabad" },
    ],
  },
  {
    id: "9",
    weight: "6 kg",
    transport: "Train",
    status: "In Transit",
    trackingHistory: [
      { location: "Chennai", date: "2024-09-20", transport: "Train", description: "Shipped from Chennai" },
      { location: "Coimbatore", date: "2024-09-21", transport: "Truck", description: "In transit to Coimbatore" },
    ],
  },
  {
    id: "10",
    weight: "3.5 kg",
    transport: "Airplane",
    status: "Delivered",
    trackingHistory: [
      { location: "Delhi", date: "2024-09-22", transport: "Airplane", description: "Shipped from Delhi" },
      { location: "Mumbai", date: "2024-09-23", transport: "Truck", description: "Delivered to Mumbai" },
    ],
  },
  {
    id: "11",
    weight: "12 kg",
    transport: "Train",
    status: "In Transit",
    trackingHistory: [
      { location: "Mumbai", date: "2024-09-18", transport: "Train", description: "Shipped from Mumbai" },
      { location: "Pune", date: "2024-09-19", transport: "Truck", description: "In transit to Pune" },
      { location: "Nashik", date: "2024-09-20", transport: "Truck", description: "In transit to Nashik" },
    ],
  },
  {
    id: "12",
    weight: "9 kg",
    transport: "Ship",
    status: "Delivered",
    trackingHistory: [
      { location: "Kochi", date: "2024-09-10", transport: "Ship", description: "Shipped from Kochi" },
      { location: "Mangalore", date: "2024-09-12", transport: "Truck", description: "Delivered to Mangalore" },
    ],
  },
  {
    id: "13",
    weight: "2.5 kg",
    transport: "Airplane",
    status: "In Transit",
    trackingHistory: [
      { location: "Delhi", date: "2024-09-29", transport: "Airplane", description: "Shipped from Delhi" },
      { location: "Lucknow", date: "2024-09-30", transport: "Truck", description: "In transit to Lucknow" },
    ],
  },
  {
    id: "14",
    weight: "4.5 kg",
    transport: "Train",
    status: "Delivered",
    trackingHistory: [
      { location: "Ahmedabad", date: "2024-09-15", transport: "Train", description: "Shipped from Ahmedabad" },
      { location: "Surat", date: "2024-09-16", transport: "Truck", description: "Delivered to Surat" },
    ],
  },
  {
    id: "15",
    weight: "5.5 kg",
    transport: "Ship",
    status: "In Transit",
    trackingHistory: [
      { location: "Chennai", date: "2024-09-28", transport: "Ship", description: "Shipped from Chennai" },
      { location: "Kochi", date: "2024-09-29", transport: "Truck", description: "In transit to Kochi" },
    ],
  },
  {
    id: "16",
    weight: "8 kg",
    transport: "Airplane",
    status: "In Transit",
    trackingHistory: [
      { location: "Delhi", date: "2024-09-26", transport: "Airplane", description: "Shipped from Delhi" },
      { location: "Kolkata", date: "2024-09-27", transport: "Truck", description: "In transit to Kolkata" },
    ],
  },
  {
    id: "17",
    weight: "3 kg",
    transport: "Train",
    status: "Delivered",
    trackingHistory: [
      { location: "Hyderabad", date: "2024-09-22", transport: "Train", description: "Shipped from Hyderabad" },
      { location: "Warangal", date: "2024-09-23", transport: "Truck", description: "Delivered to Warangal" },
    ],
  },
  {
    id: "18",
    weight: "6.5 kg",
    transport: "Airplane",
    status: "In Transit",
    trackingHistory: [
      { location: "Delhi", date: "2024-09-25", transport: "Airplane", description: "Shipped from Delhi" },
      { location: "Mumbai", date: "2024-09-26", transport: "Truck", description: "In transit to Mumbai" },
    ],
  },
  {
    id: "19",
    weight: "2 kg",
    transport: "Train",
    status: "Delivered",
    trackingHistory: [
      { location: "Bangalore", date: "2024-09-24", transport: "Train", description: "Shipped from Bangalore" },
      { location: "Hyderabad", date: "2024-09-25", transport: "Truck", description: "Delivered to Hyderabad" },
    ],
  },
  {
    id: "20",
    weight: "1 kg",
    transport: "Airplane",
    status: "In Transit",
    trackingHistory: [
      { location: "Chennai", date: "2024-09-29", transport: "Airplane", description: "Shipped from Chennai" },
      { location: "Delhi", date: "2024-09-30", transport: "Truck", description: "In transit to Delhi" },
    ],
  },
];


const BusShedulingDashboard = () => {
  const [searchId, setSearchId] = useState("");

  const filteredPackages = packagesData.filter((pkg) => pkg.id.includes(searchId));

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">Package Tracking</h1>
      
      <div className="mb-4 flex justify-center">
        <Input 
          type="text" 
          placeholder="Search Package ID" 
          value={searchId} 
          onChange={(e) => setSearchId(e.target.value)} 
          className="mr-2"
        />
        <Button onClick={() => setSearchId("")}>Reset</Button>
      </div>

      {filteredPackages.length === 0 ? (
        <p className="text-center text-gray-500">No packages found.</p>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Latest Updates</h2>
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className="mb-4">
                <CardHeader>
                  <h3 className="font-semibold">Package ID: {pkg.id}</h3>
                  <p>Status: {pkg.status}</p>
                </CardHeader>
                <CardContent>
                  <p>Weight: {pkg.weight}</p>
                  <p>Transport: {pkg.transport}</p>
                  <Progress value={pkg.status === "Delivered" ? 100 : 50} className="mb-2" />
                  <h4 className="font-semibold">Tracking History:</h4>
                  <ul>
                    {pkg.trackingHistory.map((history, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {history.date} - {history.description} ({history.location} via {history.transport})
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BusShedulingDashboard;

