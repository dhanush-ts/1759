import RouteHeader from '@/components/global/headers/RouteHeader'
import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Dashboard from './Dashboard'
import Create from './Create'
import AllRoute from './AllRoute'

const Index = () => {
  return (
    <div className='w-full h-full mt-4'>
        <RouteHeader/>
        <Routes>
          <Route element={<Dashboard/>} path='/'/>
          <Route element={<Create/>} path='/create'/>
          <Route element={<AllRoute/>} path='/all'/>
        </Routes>
    </div>
  )
}

export default Index