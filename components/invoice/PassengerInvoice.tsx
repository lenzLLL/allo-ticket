import React from 'react'
import bus from "@/images/bus-assets/bus.png"
import Image from 'next/image'
import {FaCheck, FaPhone} from "react-icons/fa"
import { CheckCircle } from 'lucide-react'
import Qr from "@/images/bus-assets/qrcode.jpg"
export default function PassengerInvoice() {
  return (
    <div className='w-full col-span-4  rounded-3xl relative'>
        <div className='w-full flex items-center justify-between bg-blue-600 px-6 py-3 rounded-tl-3xl'>
            <div className='flex items-center gap-x-3'>
                <Image width={50} src = {bus} alt ="" className='w-auto  object-cover object-center' />
                <h1 className='text-xl text-neutral-50 font-bold uppercase tracking-wider pt-1'>Gxr Deluxe</h1>
            </div>
            <div className='flex items-center gap-x-2'>
                <p className='text-xl text-neutral-50 font-bold'>
                    <span className='text-lg'>(Bus No)</span> Ba. 2 Kha 9704
                </p>
            </div>
        </div>
        <div className='w-full grid grid-cols-5 gap-8 items-center px-5 py-7 mb-7'>
            <div className='col-span-4 space-y-3.5'>
            <div className='w-full flex items-center justify-between border-dashed border-b-2 border-neutral-200 pb-3'>
                <p className='text-base text-neutral-500 font-normal'>Billet No: 444</p>
                <p className='text-base text-neutral-500 font-normal'>NPR 1600 <span className='text-base text-neutral-500 font-normal'>/Seat</span></p>
                <p className='text-base text-neutral-500 font-normal'>Date: <span className='text-base text-neutral-500 font-normal'>2022-12-12</span></p>
            </div>
            <div className='w-full flex items-center justify-between'>
                <div className='space-y-1.5'>
                    <p className='text-base text-neutral-600 font-normal'>
                        Nom du passager: <span className='font-medium'>Lenz Younda</span>
                    </p>
                    <p className='text-base text-neutral-600 font-normal'>
                        Total Seat No: <span className='font-medium'>A1, A2, A3</span>
                    </p>
                    <p className='text-base text-neutral-600 font-normal'>
                        Pick Up Station: <span className='font-medium'>Jouvence, Cameroun</span>
                    </p>
                </div>
                <div className='space-y-4 flex items-center justify-center flex-col'>
                <div className='space-y-1 text-center'>
                    <p className='text-base text-neutral-600 font-normal'>
                        Prix Total: <span className='font-bold'>23000 xaf</span>
                    </p>
                </div>
                <div className='w-fit py-2  px-3 rounded-full border bg-green-500/5 border-green-600 text-green-600 text-sm font-medium flex items-center justify-center gap-2 '>
                    <CheckCircle size={16}/>
                    <span>Billet payé</span>
                </div>
                </div>
            </div>
            <div className='w-full flex items-center justify-between border-dashed border-t-2 border-neutral-200 pt-3'>
                <p className='text-base text-neutral-500 font-normal'>
                    Yaoundé <span className='text-neutral-400'>---------</span> Douala
                </p>
                <p className='text-base text-neutral-600 font-normal'>Arrive at 05:45 pm</p>
                <p className='text-base text-neutral-600 font-normal'>Departure at 05:45 pm</p>
            </div>   
            </div>
            <div className='col-span-1 border border-neutral-200 rounded-xl shadow-sm p-1'>
                <Image src = {Qr} alt  ="" className='w-full aspect-square object-cover object-center rounded-xl'/>
            </div>
        </div>
        <div className='w-full bg-blue-600 asolute bottom-0 left-0 rounded-bl-3xl flex items-center justify-between'>
            <p className='text-xs text-neutral-100 font-light px-5'>
                Note: 40% charge for cancellation price 24 hours of programme
            </p>
            <div className='flex items-center gap-x-2 p-2 px-5'>
                <FaPhone className='text-neutral-100'/>
                <p className='text-sm text-neutral-100 font-light'>
                    +237 671434007, +237 89943333
                </p>
            </div>
        </div>
    </div>
  )
}
