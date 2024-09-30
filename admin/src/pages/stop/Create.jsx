import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import MapMarker from '@/components/map/MapAddress';
import { useToast } from "@/components/ui/use-toast";
import { createStop } from '@/store/reducer/StopReducer';
import { useDispatch } from 'react-redux';

const FormSchema = z.object({
  senderAddress: z.string().min(2, 'Sender address should be more than 2 characters'),
  receiverAddress: z.string().min(2, 'Receiver address should be more than 2 characters'),
  mailType: z.string().min(1, 'Please select a mail type'),
  transportMode: z.string().min(1, 'Please select a transport mode'),
  isUrgent: z.boolean(),
});

export default function Create() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState({ address: '', placeId: '' });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      senderAddress: '',
      receiverAddress: '',
      mailType: '',
      transportMode: '',
      isUrgent: false,
    },
  });

  const onSubmit = () => {
    const body = {
      address: address.address,
      location: {
        type: 'Point',
        coordinate: [coords.lng, coords.lat],
      },
      name: `${data.mailType} from ${data.senderAddress} to ${data.receiverAddress}`,
      mailType: data.mailType,
      transportMode: data.transportMode,
      isUrgent: data.isUrgent,
    };

    if (address.address.length > 3) {
      dispatch(createStop(body))
        .then(() => {
          if (!state.error) {
            toast({
              title: "Mail Route Created",
              description: "Created a new mail route",
              variant: 'default',
            });
            form.reset();
            setAddress({ address: '', placeId: '' });
            setCoords({ lat: 0, lng: 0 });
          } else {
            throw new Error('Failed to create mail route');
          }
        })
        .catch(() => {
          toast({
            title: "Error",
            description: `An error occurred: ${error.message}`,
            variant: 'destructive',
          });
        });
    } else {
      toast({
        title: "Error",
        description: "Please provide a valid address",
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='flex flex-col gap-y-4 mb-10'>
      <div className='h-[400px] w-full'>
        <MapMarker setAddress={setAddress} getCoord={setCoords} />
      </div>
      <p className='text-sm text-muted-foreground'>Current Location: Lat: {coords.lat.toFixed(6)}, Lng: {coords.lng.toFixed(6)}</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="senderAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sender Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter sender's address" {...field} />
                </FormControl>
                <FormDescription>Please enter the complete sender address</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="receiverAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Receiver Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter receiver's address" {...field} />
                </FormControl>
                <FormDescription>Please enter the complete receiver address</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mailType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mail Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mail type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="letter">Letter</SelectItem>
                    <SelectItem value="parcel">Parcel</SelectItem>
                    <SelectItem value="gift">Gift</SelectItem>
                    <SelectItem value="medicine">Medicine</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Choose the type of mail being sent</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="transportMode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Transport Mode</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transport mode" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="road">Road</SelectItem>
                    <SelectItem value="rail">Rail</SelectItem>
                    <SelectItem value="air">Air</SelectItem>
                    <SelectItem value="ship">Ship</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select the preferred mode of transport</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isUrgent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Urgent Delivery</FormLabel>
                  <FormDescription>
                    Mark this if the mail requires urgent delivery
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Create Mail Route</Button>
        </form>
      </Form>
    </div>
  );
}