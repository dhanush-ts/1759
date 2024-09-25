'use client'

import React, { useState } from 'react'
import { Marker, InfoWindow } from '@react-google-maps/api'
import { useNavigate } from 'react-router-dom'

const BusMarker = (props) => {
    const bus = props.bus
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const image = {
        url: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-bus-vacation-planning-girls-trip-flaticons-lineal-color-flat-icons-2.png',
        size: new google.maps.Size(64, 72),
        anchor: new google.maps.Point(10, 30),
        scaledSize: new google.maps.Size(50, 50),
    }

    const clickHandler = () => {
        if (bus) {
            navigate(`/bus/${bus.id}`)
        }
    }

    return (
        <Marker {...props} animation={window.google.maps.Animation.DROP} onMouseOver={() => {
            if (bus)
                setIsOpen(true)
        }} onMouseOut={() => {
            if (bus)
                setIsOpen(false)
        }} options={{
            icon: image,
            className: 'icon'
        }} onClick={clickHandler}>
            {isOpen && bus &&
                <InfoWindow >
                    <div className='flex flex-col gap-y-1  w-full h-full rounded-sm '>
                        {props.children && props.children}
                        <h3 className='text-black'>{bus.onBusRoute}</h3>
                        <p className='text-black'>{bus.onBusName}</p>
                    </div>
                </InfoWindow>
            }
        </Marker>
    )
}

export default BusMarker