import React from 'react'
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom"
import {
  HomeIcon,
  TruckIcon,
  MapIcon,
  MapPinIcon,
  UsersIcon,
  CalendarIcon,
  BarChartIcon,
  PackageIcon,
  SettingsIcon
} from "lucide-react"

const NavigationLink = ({ href, className, children, isActiveClass = '' }) => {
  const location = useLocation()
  const isActive = href === "/" ? location.pathname === href : location.pathname.startsWith(href)
  return (
    <Link to={href} className={`${className} ${isActive ? isActiveClass : ''}`}>
      {children}
    </Link>
  )
}

export default function SidebarContent() {
  return (
    <div className="flex min-h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="flex flex-col w-full">
        <div className="flex h-16 items-center border-b border-gray-200 dark:border-gray-800 px-6">
          <NavigationLink href="/" className="flex items-center gap-2 font-semibold text-xl text-primary">
            <PackageIcon className="h-6 w-6" />
            <span>UNFAZED</span>
          </NavigationLink>
        </div>
        <nav className="flex-1 px-4 pt-4">
          <NavigationLink
            href="/"
            isActiveClass="bg-gray-100 dark:bg-gray-800 text-primary"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors mb-1"
          end>
            <HomeIcon className="h-5 w-5" />
            Dashboard
          </NavigationLink>
          <NavigationLink
            href="/bus"
            isActiveClass="bg-gray-100 dark:bg-gray-800 text-primary"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors mb-1"
          >
            <TruckIcon className="h-5 w-5" />
            Vehicles
          </NavigationLink>
          <NavigationLink
            href="/stop"
            isActiveClass="bg-gray-100 dark:bg-gray-800 text-primary"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors mb-1"
          >
            <MapIcon className="h-5 w-5" />
            Routes
          </NavigationLink>
          <NavigationLink
            href="/post-offices"
            isActiveClass="bg-gray-100 dark:bg-gray-800 text-primary"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors mb-1"
          >
            <MapPinIcon className="h-5 w-5" />
            Post Offices
          </NavigationLink>
          {/* <NavigationLink
            href="/driver"
            isActiveClass="bg-gray-100 dark:bg-gray-800 text-primary"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors mb-1"
          >
            <UsersIcon className="h-5 w-5" />
            Staff
          </NavigationLink>
          <NavigationLink
            href="/scheduling"
            isActiveClass="bg-gray-100 dark:bg-gray-800 text-primary"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors mb-1"
          >
            <CalendarIcon className="h-5 w-5" />
            Scheduling
          </NavigationLink> */}
          <NavigationLink
            href="/analytics"
            isActiveClass="bg-gray-100 dark:bg-gray-800 text-primary"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors mb-1"
          >
            <BarChartIcon className="h-5 w-5" />
            Analytics
          </NavigationLink>
        </nav>
        <div className="border-t border-gray-200 dark:border-gray-800 p-4">
          <NavigationLink
            href="/settings"
            isActiveClass="bg-gray-100 dark:bg-gray-800 text-primary"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
          >
            <SettingsIcon className="h-5 w-5" />
            Settings
          </NavigationLink>
        </div>
      </div>
    </div>
  )
}