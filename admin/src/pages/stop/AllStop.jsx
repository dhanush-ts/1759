import React from "react";
import  DataTable from '../../components/global/DataTable';
import { stopColumn } from "@/lib/columns";
import { useSelector } from "react-redux";


const AllStops = () => {
    const stops = useSelector(state => state.Stop.stops)
   
    return (
        <div>
            <h1>Stops</h1>
            <DataTable columns={stopColumn} data={stops} filterColumn='address'/>
        </div>
    )
}

export default AllStops;