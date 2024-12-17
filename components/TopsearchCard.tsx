import React from 'react'
import {FaMoneyBill, FaMoneyCheck, FaWifi} from "react-icons/fa"
import {GiPayMoney, GiWaterBottle} from "react-icons/gi"
import {IoMdTv} from "react-icons/io"
import {GiCharging} from "react-icons/gi"
import { AlarmClock, ArrowRight, Bus, Ticket } from 'lucide-react'
export default function TopsearchCard({timeDuration,price,link,routeFrom,routeTo,date,is_cancelled,isPastTravel}:{is_cancelled:Boolean,isPastTravel:Boolean, routeTo:string,routeFrom:string,date:string,timeDuration:string,price:number,link:string}) {
  return (
    <div className='w-full cursor-pointer rounded-xl p-5 border-2 border-neutral-300 space-y-10'>
        <div className='space-y-3.5 w-full'>
            <div className='space-y-0'>
                <div className='flex items-center justify-between'>
                <p className='text-xs text-neutral-400 font-normal '>De</p>
                <p className='text-xs text-neutral-400 font-normal '>Vers</p>
                </div>
            <div className='w-full flex items-center justify-between gap-x-3'>
                <h1 className='text-xl text-neutral-600 font-semibold'>{routeFrom}</h1>
                <div className='flex-1  border-dashed border border-neutral-400 relative'>
                    <div className='w-full absolute top-0 bottom-0 flex items-center justify-center right-0 left-0'>
                    <p className='w-fit px-3 h-6 top-1/2 left-1/2 bg-neutral-50 rounded-full flex items-center justify-center text-sm text-neutral-500 font-normal border-dashed border border-neutral-400'>
                        {timeDuration}
                    </p>
                    </div>
                </div>
                <h1 className='text-xl text-neutral-600 font-semibold'>{routeTo}</h1>
                
            </div>
            </div>
            <div className='w-full flex items-center justify-between gap-3'>
                 <div className='flex items-center gap-x-1'>
                     <FaWifi className='w-5 h-5 text-neutral-500'/>
                     <p className='text-xs text-neutral-600 font-normal'>
                         Internet
                     </p> 
                 </div>
                 <div className='flex items-center gap-x-1'>
                     <GiWaterBottle className='w-5 h-5 text-neutral-500'/>
                     <p className='text-xs text-neutral-600 font-normal'>
                         Collations
                     </p> 
                 </div>
                 <div className='flex items-center gap-x-1'>
                     <IoMdTv className='w-5 h-5 text-neutral-500'/>
                     <p className='text-xs text-neutral-600 font-normal'>
                         Télévision
                     </p> 
                 </div>
                 <div className='flex items-center gap-x-1'>
                     <GiCharging className='w-5 h-5 text-neutral-500'/>
                     <p className='text-xs text-neutral-600 font-normal'>
                         Prise
                     </p> 
                 </div>
            </div>
            <div className='w-full flex items-center justify-between gap-3'>
                 <div className='flex items-center gap-x-1'>
                 <AlarmClock className='w-5 h-5 text-neutral-500'/>
                     <p className='text-xs text-neutral-600 font-normal'>
                         {date}
                     </p> 
                 </div>
                 <div className='flex items-center gap-x-1'>
                     <Ticket className='w-5 h-5 text-neutral-500'/>
                     <p className='text-xs text-neutral-600 font-normal'>
                         22/22 tickets
                     </p> 
                 </div>
                 <div className='flex items-center gap-x-1'>
                     <Bus  className='w-5 h-5 text-neutral-500'/>
                     <p className='text-xs text-neutral-600 font-normal'>
                         Rs1200
                     </p> 
                 </div>

            </div>
        </div>
        <div className='w-full flex items-center justify-between'>
        <span
              className={`px-4 py-1.5 font-semibold rounded-full ${
                isPastTravel
                  ? "bg-gray-50 text-gray-500"
                  : "bg-green-50 text-green-700"
              }`}
            >
              {price.toFixed(2)}xaf
            </span>
            <button  className="bg-gradient-to-r shadow-md shadow-purple-100 hover:shadow-lg from-purple-500 hover:from-blue-600  to-purple-600 hover:to-purple-700 text-white px-3 py-1.5 text-sm rounded-full  transition duration-75">
                  Buca voyage
            </button>        
        </div>
         
    </div>
  )
}
