import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { Link } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Search,
  Download,
  Eye,
} from "lucide-react";

// Enhanced mock data for agencies
const agencies = [
  {
    id: 1,
    name: "FastTrack Logistics",
    status: "Active",
    schedules: 150,
    contactPerson: "John Doe",
    email: "john@fasttrack.com",
    phone: "+1 (555) 123-4567",
    address: "123 Speedy Lane, Quickville, QT 12345",
    performanceRating: 4.8,
    onTimeDeliveryRate: 98.5,
  },
  {
    id: 2,
    name: "SecureShip Co.",
    status: "Active",
    schedules: 120,
    contactPerson: "Jane Smith",
    email: "jane@secureship.com",
    phone: "+1 (555) 987-6543",
    address: "456 Safe Street, Guardtown, GT 67890",
    performanceRating: 4.6,
    onTimeDeliveryRate: 97.8,
  },
  {
    id: 3,
    name: "EcoDelivery",
    status: "Inactive",
    schedules: 0,
    contactPerson: "Sam Green",
    email: "sam@ecodelivery.com",
    phone: "+1 (555) 246-8135",
    address: "789 Sustainable Ave, Greenville, GV 13579",
    performanceRating: 4.2,
    onTimeDeliveryRate: 95.0,
  },
  // ... Add more agencies with detailed information
];

function AgencyTable() {
  const [data, setData] = useState(agencies);
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    status: true,
    schedules: true,
    performanceRating: true,
    onTimeDeliveryRate: true,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const sortData = (key) => {
    const newData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return sortOrder === "asc" ? -1 : 1;
      if (a[key] > b[key]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setData(newData);
    setSortKey(key);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filteredData = agencies.filter(
      (agency) =>
        agency.name.toLowerCase().includes(term.toLowerCase()) ||
        agency.status.toLowerCase().includes(term.toLowerCase()) ||
        agency.contactPerson.toLowerCase().includes(term.toLowerCase())
    );
    setData(filteredData);
    setCurrentPage(1);
  };

  const toggleColumn = (column) => {
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  const exportToCSV = () => {
    const headers = Object.keys(visibleColumns).filter((key) => visibleColumns[key]);
    const csvContent = [
      headers.join(','),
      ...data.map((agency) => headers.map((header) => agency[header]).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'agencies_export.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const pageCount = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Postal Agencies Overview</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agencies..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-8"
          />
        </div>
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {Object.entries(visibleColumns).map(([key, value]) => (
                <DropdownMenuCheckboxItem
                  key={key}
                  className="capitalize"
                  checked={value}
                  onCheckedChange={() => toggleColumn(key)}
                >
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.name && (
                <TableHead className="w-[200px]">
                  <Button
                    variant="ghost"
                    onClick={() => sortData("name")}
                    className="font-bold"
                  >
                    Agency Name
                    {sortKey === "name" ? (
                      sortOrder === "asc" ? (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      )
                    ) : (
                      <ChevronsUpDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
              )}
              {visibleColumns.status && (
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => sortData("status")}
                    className="font-bold"
                  >
                    Status
                    {sortKey === "status" ? (
                      sortOrder === "asc" ? (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      )
                    ) : (
                      <ChevronsUpDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
              )}
              {visibleColumns.schedules && (
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => sortData("schedules")}
                    className="font-bold"
                  >
                    Postal Schedules
                    {sortKey === "schedules" ? (
                      sortOrder === "asc" ? (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      )
                    ) : (
                      <ChevronsUpDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
              )}
              {visibleColumns.performanceRating && (
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => sortData("performanceRating")}
                    className="font-bold"
                  >
                    Performance Rating
                    {sortKey === "performanceRating" ? (
                      sortOrder === "asc" ? (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      )
                    ) : (
                      <ChevronsUpDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
              )}
              {visibleColumns.onTimeDeliveryRate && (
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => sortData("onTimeDeliveryRate")}
                    className="font-bold"
                  >
                    On-Time Delivery Rate
                    {sortKey === "onTimeDeliveryRate" ? (
                      sortOrder === "asc" ? (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      )
                    ) : (
                      <ChevronsUpDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((agency) => (
              <TableRow key={agency.id} >
                {visibleColumns.name && (
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="link">{agency.name}</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{agency.name}</DialogTitle>
                          <DialogDescription>
                            <p>Status: {agency.status}</p>
                            <p>Contact Person: {agency.contactPerson}</p>
                            <p>Email: {agency.email}</p>
                            <p>Phone: {agency.phone}</p>
                            <p>Address: {agency.address}</p>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                )}
                {visibleColumns.status && (
                  <TableCell>
                    <Badge variant={agency.status === "Active" ? "success" : "destructive"}>
                      {agency.status}
                    </Badge>
                  </TableCell>
                )}
                {visibleColumns.schedules && (
                  <TableCell className="text-right">{agency.schedules}</TableCell>
                )}
                {visibleColumns.performanceRating && (
                  <TableCell className="text-right">
                    {agency.performanceRating.toFixed(1)}
                  </TableCell>
                )}
                {visibleColumns.onTimeDeliveryRate && (
                  <TableCell className="text-right">
                    {agency.onTimeDeliveryRate.toFixed(1)}%
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
            Previous
          </PaginationPrevious>
          {Array.from({ length: pageCount }, (_, index) => (
            <PaginationItem
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={index + 1 === currentPage ? "active" : ""}
            >
              {index + 1}
            </PaginationItem>
          ))}
          <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}>
            Next
          </PaginationNext>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default AgencyTable;
