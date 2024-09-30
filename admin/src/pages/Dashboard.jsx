import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { LineChart, Line } from 'recharts'
import { PieChart, Pie, Cell } from 'recharts'
import { Truck, Package, MapPin, Users, TrendingUp } from 'lucide-react'
import MapView from '@/components/map/Map'
import { MarkerF } from "@react-google-maps/api"; // Import MarkerF

// Sample post office data (replace with actual data)
const postOffices = [
  {"id": 1, "lat": 28.7041, "lng": 77.1025}, // Delhi
  {"id": 2, "lat": 19.0760, "lng": 72.8777}, // Mumbai
  {"id": 3, "lat": 13.0827, "lng": 80.2707}, // Chennai
  {"id": 4, "lat": 12.9716, "lng": 77.5946}, // Bangalore
  {"id": 5, "lat": 22.5726, "lng": 88.3639}, // Kolkata
  {"id": 6, "lat": 19.2183, "lng": 84.9635}, // Bhubaneswar
  {"id": 7, "lat": 30.7333, "lng": 76.7794}, // Chandigarh
  {"id": 8, "lat": 26.8467, "lng": 80.9462}, // Lucknow
  {"id": 9, "lat": 25.5941, "lng": 85.1376}, // Patna
  {"id": 10, "lat": 28.5355, "lng": 77.3910}, // Ghaziabad
  {"id": 11, "lat": 21.1458, "lng": 79.0882}, // Nagpur
  {"id": 12, "lat": 17.3850, "lng": 78.4867}, // Hyderabad
  {"id": 13, "lat": 25.4315, "lng": 81.8463}, // Varanasi
  {"id": 14, "lat": 22.3072, "lng": 73.1812}, // Ahmedabad
  {"id": 15, "lat": 26.9124, "lng": 75.7873}, // Jaipur
  {"id": 16, "lat": 10.8505, "lng": 76.2711}, // Kerala
  {"id": 17, "lat": 19.3002, "lng": 84.7911}, // Cuttack
  {"id": 18, "lat": 20.5937, "lng": 78.9629}, // India (central point)
  {"id": 19, "lat": 30.9008, "lng": 75.8573}, // Ludhiana
  {"id": 20, "lat": 23.2599, "lng": 77.4126}, // Bhopal
  {"id": 21, "lat": 21.1458, "lng": 79.0882}, // Nagpur
  {"id": 22, "lat": 27.2046, "lng": 77.4970}, // Agra
  {"id": 23, "lat": 10.8505, "lng": 76.2711}, // Thrissur
  {"id": 24, "lat": 17.6868, "lng": 83.2185}, // Visakhapatnam
  {"id": 25, "lat": 11.0168, "lng": 76.9558}, // Coimbatore
  {"id": 26, "lat": 28.6139, "lng": 77.2090}, // New Delhi
  {"id": 27, "lat": 22.5726, "lng": 88.3639}, // Kolkata
  {"id": 28, "lat": 29.0588, "lng": 76.0856}, // Rohtak
  {"id": 29, "lat": 19.6633, "lng": 75.3257}, // Ahmednagar
  {"id": 30, "lat": 28.7041, "lng": 77.1025}, // Faridabad
  {"id": 31, "lat": 22.7984, "lng": 88.4903}, // North 24 Parganas
  {"id": 32, "lat": 22.8442, "lng": 78.6500}, // Hoshangabad
  {"id": 33, "lat": 21.7650, "lng": 72.9632}, // Valsad
  {"id": 34, "lat": 17.7038, "lng": 78.8837}, // Nalgonda
  {"id": 35, "lat": 20.0250, "lng": 85.7983}, // Berhampur
  {"id": 36, "lat": 19.2183, "lng": 84.9635}, // Bhubaneswar
  {"id": 37, "lat": 22.1542, "lng": 84.7920}, // Jharkhand
  {"id": 38, "lat": 30.3165, "lng": 78.0322}, // Dehradun
  {"id": 39, "lat": 26.4499, "lng": 80.3319}, // Kanpur
  {"id": 40, "lat": 25.8007, "lng": 80.9518}, // Gorakhpur
  {"id": 41, "lat": 27.1767, "lng": 78.0081}, // Agra
  {"id": 42, "lat": 22.6273, "lng": 88.3239}, // Kolkata
  {"id": 43, "lat": 19.2958, "lng": 84.7949}, // Bhubaneswar
  {"id": 44, "lat": 27.4376, "lng": 80.3383}, // Aligarh
  {"id": 45, "lat": 23.5812, "lng": 86.4092}, // Dhanbad
  {"id": 46, "lat": 22.7886, "lng": 75.7922}, // Indore
  {"id": 47, "lat": 22.3612, "lng": 73.7705}, // Surat
  {"id": 48, "lat": 22.3072, "lng": 73.1812}, // Vadodara
  {"id": 49, "lat": 26.0856, "lng": 91.5855}, // Guwahati
  {"id": 50, "lat": 17.4423, "lng": 78.3311}, // Nalgonda
  {"id": 51, "lat": 26.8480, "lng": 80.9452}, // Faizabad
  {"id": 52, "lat": 21.0452, "lng": 79.5305}, // Chandrapur
  {"id": 53, "lat": 26.1500, "lng": 91.7511}, // Assam
  {"id": 54, "lat": 19.0000, "lng": 74.0000}, // Ratnagiri
  {"id": 55, "lat": 28.9784, "lng": 77.5913}, // Delhi
  {"id": 56, "lat": 26.1425, "lng": 91.5868}, // Sivasagar
  {"id": 57, "lat": 20.6447, "lng": 84.7940}, // Ganjam
  {"id": 58, "lat": 25.0447, "lng": 78.1587}, // Dholpur
  {"id": 59, "lat": 26.0784, "lng": 83.1158}, // Buxar
  {"id": 60, "lat": 28.4375, "lng": 77.2180}, // Sonipat
  {"id": 61, "lat": 22.7224, "lng": 72.5788}, // Bhavnagar
  {"id": 62, "lat": 21.5051, "lng": 80.3683}, // Nagpur
  {"id": 63, "lat": 26.1792, "lng": 78.9604}, // Gwalior
  {"id": 64, "lat": 19.8639, "lng": 75.0633}, // Jalna
  {"id": 65, "lat": 17.6522, "lng": 78.5725}, // Hyderabad
  {"id": 66, "lat": 26.4478, "lng": 80.3689}, // Kanpur
  {"id": 67, "lat": 20.6270, "lng": 75.8207}, // Ahmednagar
  {"id": 68, "lat": 23.0889, "lng": 72.6122}, // Kutch
  {"id": 69, "lat": 19.4563, "lng": 75.3394}, // Nashik
  {"id": 70, "lat": 30.7343, "lng": 76.7968}, // Patiala
  {"id": 71, "lat": 20.0860, "lng": 85.7320}, // Rourkela
  {"id": 72, "lat": 19.0490, "lng": 82.9466}, // Berhampur
  {"id": 73, "lat": 25.1583, "lng": 81.7604}, // Jhansi
  {"id": 74, "lat": 22.3134, "lng": 78.0782}, // Vidisha
  {"id": 75, "lat": 20.3082, "lng": 85.8189}, // Bhubaneswar
  {"id": 76, "lat": 22.8978, "lng": 79.5337}, // Chhindwara
  {"id": 77, "lat": 18.9207, "lng": 72.8347}, // Thane
  {"id": 78, "lat": 29.6765, "lng": 75.9985}, // Sikar
  {"id": 79, "lat": 19.7762, "lng": 75.2977}, // Jalna
  {"id": 80, "lat": 22.5890, "lng": 72.3462}, // Anand
  {"id": 81, "lat": 26.7581, "lng": 80.1137}, // Prayagraj
  {"id": 82, "lat": 27.4539, "lng": 78.0884}, // Etah
  {"id": 83, "lat": 19.7683, "lng": 84.9970}, // Cuttack
  {"id": 84, "lat": 30.3267, "lng": 78.0342}, // Haldwani
  {"id": 85, "lat": 29.2402, "lng": 76.6365}, // Rohtak
  {"id": 86, "lat": 22.6703, "lng": 72.7078}, // Surat
  {"id": 87, "lat": 25.3704, "lng": 82.4296}, // Basti
  {"id": 88, "lat": 29.1962, "lng": 76.6922}, // Jind
  {"id": 89, "lat": 25.4133, "lng": 81.7558}, // Unnao
  {"id": 90, "lat": 19.9420, "lng": 75.9702}, // Nagpur
  {"id": 91, "lat": 22.5060, "lng": 77.3586}, // Mandsaur
  {"id": 92, "lat": 30.0524, "lng": 78.8533}, // Bhimtal
  {"id": 93, "lat": 19.0297, "lng": 75.3421}, // Kolhapur
  {"id": 94, "lat": 25.8590, "lng": 81.9396}, // Raebareli
  {"id": 95, "lat": 21.8468, "lng": 75.7474}, // Nanded
  {"id": 96, "lat": 21.1894, "lng": 79.8308}, // Chandrapur
  {"id": 97, "lat": 22.4822, "lng": 72.6313}, // Vadodara
  {"id": 98, "lat": 20.5925, "lng": 85.8310}, // Puri
  {"id": 99, "lat": 28.4382, "lng": 77.0774}, // Bhiwani
  {"id": 100, "lat": 30.3642, "lng": 77.5475}, // Shimla
  {"id": 101, "lat": 21.7936, "lng": 75.8971}, // Ahmednagar
  {"id": 102, "lat": 29.1538, "lng": 75.6704}, // Sonepat
  {"id": 103, "lat": 22.3110, "lng": 78.6658}, // Chhindwara
  {"id": 104, "lat": 28.6452, "lng": 77.3907}, // Meerut
  {"id": 105, "lat": 21.1848, "lng": 79.8513}, // Nagpur
  {"id": 106, "lat": 29.9986, "lng": 76.8687}, // Kaithal
  {"id": 107, "lat": 22.2565, "lng": 75.9804}, // Ujjain
  {"id": 108, "lat": 27.1751, "lng": 78.0421}, // Agra
  {"id": 109, "lat": 19.2980, "lng": 84.7935}, // Bhubaneswar
  {"id": 110, "lat": 21.0874, "lng": 79.0475}, // Yavatmal
  {"id": 111, "lat": 23.3069, "lng": 79.7983}, // Gwalior
  {"id": 112, "lat": 26.7249, "lng": 78.5689}, // Dholpur
  {"id": 113, "lat": 19.1131, "lng": 82.8403}, // Visakhapatnam
  {"id": 114, "lat": 22.7064, "lng": 75.1286}, // Ratlam
  {"id": 115, "lat": 30.6319, "lng": 78.7232}, // Nainital
  {"id": 116, "lat": 21.5271, "lng": 81.6815}, // Durg
  {"id": 117, "lat": 30.1595, "lng": 78.0483}, // Haridwar
  {"id": 118, "lat": 29.9454, "lng": 77.0774}, // Bhiwani
  {"id": 119, "lat": 19.5555, "lng": 84.2152}, // Berhampur
  {"id": 120, "lat": 25.9604, "lng": 80.1137}, // Prayagraj
  {"id": 121, "lat": 23.0802, "lng": 78.5824}, // Betul
  {"id": 122, "lat": 19.7984, "lng": 75.6865}, // Jalgaon
  {"id": 123, "lat": 21.7152, "lng": 79.1235}, // Wardha
  {"id": 124, "lat": 28.3060, "lng": 76.8493}, // Jhajjar
  {"id": 125, "lat": 30.2434, "lng": 77.9091}, // Kinnaur
  {"id": 126, "lat": 22.8969, "lng": 77.8926}, // Burhanpur
  {"id": 127, "lat": 19.1536, "lng": 84.8907}, // Cuttack
  {"id": 128, "lat": 25.8250, "lng": 81.0012}, // Fatehpur
  {"id": 129, "lat": 30.8598, "lng": 78.5353}, // Rudraprayag
  {"id": 130, "lat": 21.2786, "lng": 79.4423}, // Wardha
  {"id": 131, "lat": 20.6842, "lng": 85.8327}, // Berhampur
  {"id": 132, "lat": 20.3525, "lng": 85.7986}, // Khurda
  {"id": 133, "lat": 20.9661, "lng": 85.7520}, // Cuttack
  {"id": 134, "lat": 26.4000, "lng": 80.3288}, // Unnao
  {"id": 135, "lat": 22.8315, "lng": 79.0499}, // Jabalpur
  {"id": 136, "lat": 26.8782, "lng": 81.7260}, // Bahraich
  {"id": 137, "lat": 21.9098, "lng": 75.1487}, // Ahmednagar
  {"id": 138, "lat": 21.2962, "lng": 79.2061}, // Amravati
  {"id": 139, "lat": 22.6772, "lng": 72.7085}, // Surat
  {"id": 140, "lat": 23.7956, "lng": 78.7379}, // Sagar
  {"id": 141, "lat": 30.8501, "lng": 77.1633}, // Ambala
  {"id": 142, "lat": 22.9535, "lng": 78.6737}, // Morena
  {"id": 143, "lat": 19.9340, "lng": 75.2867}, // Jalna
  {"id": 144, "lat": 23.1353, "lng": 78.6844}, // Sehore
  {"id": 145, "lat": 20.4164, "lng": 85.7946}, // Balasore
  {"id": 146, "lat": 23.3138, "lng": 78.6890}, // Sagar
  {"id": 147, "lat": 19.7773, "lng": 85.8205}, // Bhubaneswar
  {"id": 148, "lat": 21.1845, "lng": 79.6577}, // Nagpur
  {"id": 149, "lat": 22.6753, "lng": 75.9202}, // Dewas
  {"id": 150, "lat": 19.2823, "lng": 84.7868}, // Bargarh
  {"id": 151, "lat": 28.5473, "lng": 77.4775}, // Gurugram
  {"id": 152, "lat": 19.7790, "lng": 75.8035}, // Aurangabad
  {"id": 153, "lat": 28.5165, "lng": 77.2338}, // Faridabad
  {"id": 154, "lat": 22.2828, "lng": 73.0134}, // Udaipur
  {"id": 155, "lat": 29.9463, "lng": 78.4084}, // Saharanpur
  {"id": 156, "lat": 25.2735, "lng": 80.1105}, // Kalyan
  {"id": 157, "lat": 29.0814, "lng": 76.9501}, // Jind
  {"id": 158, "lat": 20.7380, "lng": 85.8124}, // Jagatsinghpur
  {"id": 159, "lat": 25.2986, "lng": 81.7363}, // Kanpur
  {"id": 160, "lat": 21.0724, "lng": 79.0652}, // Chandrapur
  {"id": 161, "lat": 20.1237, "lng": 85.6826}, // Jagatsinghpur
  {"id": 162, "lat": 22.3404, "lng": 78.4220}, // Panna
  {"id": 163, "lat": 21.5692, "lng": 79.9342}, // Wardha
  {"id": 164, "lat": 23.7938, "lng": 79.0088}, // Gwalior
  {"id": 165, "lat": 22.3084, "lng": 78.6539}, // Chhindwara
  {"id": 166, "lat": 21.3552, "lng": 75.7124}, // Nashik
  {"id": 167, "lat": 20.2197, "lng": 85.8302}, // Bhubaneswar
  {"id": 168, "lat": 22.5076, "lng": 72.8350}, // Ankleshwar
  {"id": 169, "lat": 22.7056, "lng": 75.8522}, // Khandwa
  {"id": 170, "lat": 20.0660, "lng": 85.3685}, // Bhubaneswar
  {"id": 171, "lat": 29.3778, "lng": 76.8983}, // Hissar
  {"id": 172, "lat": 19.9501, "lng": 75.3706}, // Nashik
  {"id": 173, "lat": 20.6735, "lng": 85.8515}, // Berhampur
  {"id": 174, "lat": 21.2072, "lng": 81.5949}, // Durg
  {"id": 175, "lat": 25.3289, "lng": 80.5568}, // Allahabad
  {"id": 176, "lat": 21.6941, "lng": 75.9080}, // Ahmednagar
  {"id": 177, "lat": 30.0364, "lng": 78.3370}, // Dehradun
  {"id": 178, "lat": 26.2552, "lng": 81.8887}, // Faizabad
  {"id": 179, "lat": 23.1656, "lng": 80.8999}, // Katni
  {"id": 180, "lat": 25.9170, "lng": 80.1017}, // Mau
  {"id": 181, "lat": 26.8503, "lng": 80.7858}, // Hardoi
  {"id": 182, "lat": 22.7004, "lng": 72.6675}, // Surendranagar
  {"id": 183, "lat": 19.8912, "lng": 84.7040}, // Rourkela
  {"id": 184, "lat": 28.5708, "lng": 77.7035}, // Jhajjar
  {"id": 185, "lat": 20.1581, "lng": 85.8265}, // Kendrapara
  {"id": 186, "lat": 21.6623, "lng": 75.8623}, // Amravati
  {"id": 187, "lat": 20.1142, "lng": 85.4711}, // Bhubaneswar
  {"id": 188, "lat": 25.2897, "lng": 81.9005}, // Unnao
  {"id": 189, "lat": 21.9039, "lng": 75.4762}, // Aurangabad
  {"id": 190, "lat": 19.1022, "lng": 85.8277}, // Jajpur
  {"id": 191, "lat": 21.2977, "lng": 75.4874}, // Chandrapur
  {"id": 192, "lat": 22.4780, "lng": 73.0825}, // Anand
  {"id": 193, "lat": 29.0528, "lng": 76.2326}, // Ambala
  {"id": 194, "lat": 23.4426, "lng": 78.1795}, // Sagar
  {"id": 195, "lat": 26.1500, "lng": 81.3005}, // Raebareli
  {"id": 196, "lat": 20.2098, "lng": 85.7402}, // Khurda
  {"id": 197, "lat": 19.6393, "lng": 75.4247}, // Jalna
  {"id": 198, "lat": 20.4662, "lng": 85.8340}, // Khurda
  {"id": 199, "lat": 21.0777, "lng": 78.1699}, // Amravati
  {"id": 200, "lat": 25.0566, "lng": 81.2867}  // Raebareli
]


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
            <MapView>
              {/* Render markers for post offices */}
              {postOffices.map((office) => (
              <MarkerF
                key={office.id}
                position={{ lat: office.lat, lng: office.lng }}
                label={{
                  text: `PO ${office.id}`, // Customize the label text as needed
                  color: 'white', // Set label color to white
                  fontSize: '8px', // Set label font size (adjust as needed)
                }}
              />
            ))}
            </MapView>
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
