import React, { useState, useCallback, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MapView from '@/components/map/Map'; // Ensure the correct import path
import { InfoWindowF, MarkerF } from '@react-google-maps/api'; // Import InfoWindowF

// Expanded mock data for post offices
const postOffices = [
  { id: 1, name: 'Central Post Office', type: 'Head Office', lat: 28.6139, lng: 77.2090, mailsProcessed: 15000, staffCount: 50, revenue: 500000, customerSatisfaction: 4.5, deliveryEfficiency: 92 },
  { id: 2, name: 'North Delhi GPO', type: 'General Post Office', lat: 28.6692, lng: 77.2272, mailsProcessed: 12000, staffCount: 40, revenue: 450000, customerSatisfaction: 4.2, deliveryEfficiency: 88 },
  { id: 3, name: 'South Extension PO', type: 'Sub Office', lat: 28.5730, lng: 77.2233, mailsProcessed: 8000, staffCount: 25, revenue: 300000, customerSatisfaction: 4.0, deliveryEfficiency: 85 },
  { id: 4, name: 'Connaught Place PO', type: 'Head Office', lat: 28.6315, lng: 77.2167, mailsProcessed: 18000, staffCount: 60, revenue: 600000, customerSatisfaction: 4.7, deliveryEfficiency: 95 },
  { id: 5, name: 'Saket PO', type: 'Sub Office', lat: 28.5244, lng: 77.2167, mailsProcessed: 6000, staffCount: 20, revenue: 250000, customerSatisfaction: 3.8, deliveryEfficiency: 82 },
  { id: 6, name: 'Nehru Place PO', type: 'Sub Office', lat: 28.5491, lng: 77.2533, mailsProcessed: 7500, staffCount: 22, revenue: 280000, customerSatisfaction: 4.1, deliveryEfficiency: 86 },
  { id: 7, name: 'Lajpat Nagar PO', type: 'Sub Office', lat: 28.5709, lng: 77.2373, mailsProcessed: 9000, staffCount: 30, revenue: 350000, customerSatisfaction: 4.3, deliveryEfficiency: 89 },
  { id: 8, name: 'Janakpuri PO', type: 'Head Office', lat: 28.6292, lng: 77.0780, mailsProcessed: 11000, staffCount: 35, revenue: 400000, customerSatisfaction: 4.4, deliveryEfficiency: 90 },
  { id: 9, name: 'Dwarka PO', type: 'Sub Office', lat: 28.5921, lng: 77.0460, mailsProcessed: 5500, staffCount: 18, revenue: 220000, customerSatisfaction: 3.9, deliveryEfficiency: 83 },
  { id: 10, name: 'Noida Sector 18 PO', type: 'Head Office', lat: 28.5709, lng: 77.3260, mailsProcessed: 13000, staffCount: 45, revenue: 480000, customerSatisfaction: 4.6, deliveryEfficiency: 93 },
];

const PostOfficeAnalytics = ({ postOffice }) => {
  const data = [
    { name: 'Mails Processed', value: postOffice.mailsProcessed },
    { name: 'Staff Count', value: postOffice.staffCount },
    { name: 'Revenue (₹)', value: postOffice.revenue },
    { name: 'Customer Satisfaction', value: postOffice.customerSatisfaction * 20 },
    { name: 'Delivery Efficiency (%)', value: postOffice.deliveryEfficiency },
  ];

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Analytics for {postOffice.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export const PostOffices = () => {
  const [selectedPostOffice, setSelectedPostOffice] = useState(null);
  const [activeTab, setActiveTab] = useState("details");

  const mapCenter = useMemo(() => ({ lat: 28.6139, lng: 77.2090 }), []);

  const handleMarkerClick = (postOffice) => {
    setSelectedPostOffice(postOffice);
    setActiveTab("details");
  };

  const closeModal = () => {
    setSelectedPostOffice(null);
  };

  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-3xl font-bold p-4">India Post Offices</h1>
      <div className="flex-grow">
        <MapView center={mapCenter}>
          {postOffices.map((po) => (
            <MarkerF
              key={po.id}
              position={{ lat: po.lat, lng: po.lng }}
              onClick={() => handleMarkerClick(po)}
              title={po.name}
            />
          ))}
          {selectedPostOffice && (
            <InfoWindowF
              position={{ lat: selectedPostOffice.lat, lng: selectedPostOffice.lng }}
              onCloseClick={closeModal}
            >
              <div>
                <h2 className="font-bold">{selectedPostOffice.name}</h2>
                <p>{selectedPostOffice.type}</p>
              </div>
            </InfoWindowF>
          )}
        </MapView>
      </div>

      <Dialog open={!!selectedPostOffice} onOpenChange={closeModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedPostOffice?.name}</DialogTitle>
          </DialogHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Post Office Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Type:</strong> {selectedPostOffice?.type}</p>
                    <p><strong>Location:</strong> {selectedPostOffice?.lat.toFixed(4)}, {selectedPostOffice?.lng.toFixed(4)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Mail Processing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Mails Processed:</strong> {selectedPostOffice?.mailsProcessed.toLocaleString()}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics">
              {selectedPostOffice && <PostOfficeAnalytics postOffice={selectedPostOffice} />}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};
