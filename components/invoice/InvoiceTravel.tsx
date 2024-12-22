import React,{useRef,forwardRef} from 'react'

import PassengerInvoice from './PassengerInvoice'
import CompanyInvoice from './CompanyInvoice'
const InvoiceTravel = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>((props,ref) => {

  return (
    <div ref={ref} {...props} className='max-w-[1400px] min-w-[1400px] mb-10 grid grid-cols-5 bg-white rounded-3xl border border-neutral-200 shadow-sm relative'>
        <div className='absolute -top-3 right-[18.8%] h-6 w-6 rounded-full bg-neutral-50 border border-neutral-50'/>
        <div className='absolute z-[99999999999] -top-3 right-[18.8%] h-6 w-6 rounded-full bg-neutral-50 border border-neutral-50'/>
        <div className='absolute z-[99999999999] -bottom-3 right-[18.8%] h-6 w-6 rounded-full bg-neutral-50 border border-neutral-50'/>
                
        <PassengerInvoice/>
        <CompanyInvoice/>
    </div>
  )
}
)

export default InvoiceTravel