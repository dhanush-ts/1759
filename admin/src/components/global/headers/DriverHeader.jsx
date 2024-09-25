import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NavigationLink from "../NavigationLink";

const BusHeader = () => {
  return (
    <div className="w-full flex justify-center mb-4">
   <Tabs defaultValue="account" className="w-[300px]">
  <TabsList>
    <TabsTrigger value="all">
    <NavigationLink href={'/driver'}>
            All
        </NavigationLink>
    </TabsTrigger>
    <TabsTrigger value="create">
    <NavigationLink href={'/driver/create'}>
            Create
        </NavigationLink>
    </TabsTrigger>
  </TabsList>
</Tabs>
</div>
  )
}

export default BusHeader