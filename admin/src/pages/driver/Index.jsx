import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DriverHeader from '@/components/global/headers/DriverHeader'
import AllDriver from './AllDriver'
import Create from './Create'

const Index = () => {
  return (
    <div className='w-full h-full mt-4'>
        <DriverHeader/>
        <Routes>
            <Route element={<AllDriver/>} path='/'/>
            <Route element={<Create/>} path='/create'/>
        </Routes>
    </div>
  )
}

export default Index