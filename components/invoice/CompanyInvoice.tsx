import React from 'react'
import { FaPhone } from 'react-icons/fa'

export default function CompanyInvoice() {
  return (
    <div className='w-full h-full col-span-1 border-dashed border-l-2 border-neutral-400 relative'>
        <div className='w-full  bg-blue-600 px-4 py-[15.5px] rounded-tr-3xl'>
            <h1 className='w-full text-2xl text-neutral-50 font-bold text-center'>Billet De Bus</h1>
        </div>
        <div className='w-full px-4 py-7 space-y-[8.3px]'>
            <p className='text-sm text-neutral-600 font-normal'>
                Bill No: 455
            </p>
            <p className='text-sm text-neutral-600 font-normal'>
                Date: 2024-10-31
            </p>
            <p className='text-sm text-neutral-600 font-normal'>
                De <span className='text-xs'>Doula</span>
            </p>
            <p className='text-sm text-neutral-600 font-normal'>
                Vers <span className='text-xs'>Yaoundé</span>
            </p>
            <p className='text-sm text-neutral-600 font-normal'>
                Dept. Time: 06:15 pm
            </p>
            <p className='text-sm text-neutral-600 font-normal'>
                Seat No: A2, A3, A4
            </p>
            <p className='text-sm text-neutral-600 font-normal'>
                Passagers: 12
            </p>
            <p className='text-sm text-neutral-600 font-normal'>
                Prix Total: 15000 xaf
            </p>
        </div>
        <div className='w-full bg-blue-600 asolute bottom-0 left-0 rounded-br-3xl flex items-center justify-between'>
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
