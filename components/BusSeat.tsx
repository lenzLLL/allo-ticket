"use client"
import Link from 'next/link'
import React,{useState} from 'react'
import { GiReceiveMoney, GiSteeringWheel } from 'react-icons/gi'
import {MdOutlineChair} from "react-icons/md"
import {RiMoneyRupeeCircleLine} from "react-icons/ri"
import { Input } from './ui/input'
export default function BusSeat() {
 type TicketSchema = {
    ticketId:string
    status:string
 }
 const [tickets,setTickets] = useState<TicketSchema[]>([
    {
        ticketId:"3o",
        status:"BOOKIN"
    },
    {
        ticketId:"4c",
        status:"BOOKIN"
    },
    {
        ticketId:"5c",
        status:"BOOKING"
    },
    {
        ticketId:"6c",
        status:"BOOKIN"
    },
    {
        ticketId:"7c",
        status:"BOOKING"
    },
    {
        ticketId:"8c",
        status:"BOOKIN"
    },
    {
        ticketId:"9c",
        status:"BOOKIN"
    },
    {
        ticketId:"1c",
        status:"BOOKING"
    },
    {
        ticketId:"2c",
        status:"BOOKIN"
    },
    {
        ticketId:"3c",
        status:"BOOKING"
    },
    {
        ticketId:"3m",
        status:"BOOKIN"
    },
    {
        ticketId:"4w",
        status:"BOOKIN"
    },
    {
        ticketId:"5w",
        status:"BOOKING"
    },
    {
        ticketId:"6w",
        status:"BOOKIN"
    },
    {
        ticketId:"7w",
        status:"BOOKING"
    },
    {
        ticketId:"8w",
        status:"BOOKIN"
    },
    {
        ticketId:"9w",
        status:"BOOKIN"
    },
    {
        ticketId:"1w",
        status:"BOOKING"
    },
    {
        ticketId:"2w",
        status:"BOOKIN"
    },
    {
        ticketId:"3w",
        status:"BOOKING"
    },
 ])
 const [selectedSeats,setSelectedSeats] =  useState<string[]>([])
 const handleSeat = (seatId:string) => {
     const selectedSeat = tickets.find((t)=>t.ticketId === seatId)
     if(selectedSeat?.status === "BOOKING"){
         return    
     }
     if(selectedSeats.length === 10){
        return
     }
     if(selectedSeats.includes(seatId)){
        return
     }
     setSelectedSeats((state:string[])=>[...state,seatId])
 }
 const getSeatName = (seat:TicketSchema) => {
     if(seat.status === "BOOKING"){
         return "text-amber-700 cursor-not-allowed"
     }
     else if(selectedSeats.includes(seat.ticketId)){
         return "text-amber-500 cursor-pointer"
     }
     return "text-neutral-500 cursor-pointer"
 }
 return (
    <div className='w-full grid  grid-cols-5 gap-10 px-10'>
        <div style={{boxShadow:"0 0 2px black"}} className='col-span-3 w-full flex items-center justify-center  rounded-xl p-4 border border-neutral-200'>
            <div className='w-full space-y-7'>
                <p className='text-base text-neutral-600 font-medium text-center'>
                Cliquez sur les sièges disponibles pour réserver votre place.
                </p>
                <div className='w-full flex items-stretch gap-x-1.5'>
                    <div className='w-10 h-fit'>
                        <GiSteeringWheel className='text-3xl mt-7 text-amber-700  -rotate-90'/>
                    </div>
                    <div className='flex flex-col items-center border-l-2 border-dashed pl-7'>
                        <div className='felx-1 space-y-5'>
                            <div className='w-full h-auto grid grid-cols-9 gap-x-5 justify-end'>
                                {
                                    tickets.slice(0,9).map(
                                        (ticket:TicketSchema)=>{
                                            return <div key={ticket.ticketId} className='flex items-center gap-x-0' onClick={()=>handleSeat( ticket.ticketId)}>
                                               <h6 className='text-base text-neutral-600 font-bold'>{ticket.ticketId}</h6>
                                               <MdOutlineChair className={`text-3xl -rotate-90 ${getSeatName(ticket)}`}/>    
                                            </div>
                                        }
                                    )
                                }
                            </div>
                            <div className='w-full h-auto grid grid-cols-9 gap-x-5 justify-end'>
                                {
                                    tickets.slice(9,18).map(
                                        (ticket:TicketSchema)=>{
                                            return <div key={ticket.ticketId} className='flex items-center gap-x-0' onClick={()=>handleSeat( ticket.ticketId)}>
                                               <h6 className='text-base text-neutral-600 font-bold'>{ticket.ticketId}</h6>
                                               <MdOutlineChair className={`text-3xl -rotate-90 ${getSeatName(ticket)}`}/>    
                                            </div>
                                        }
                                    )
                                }
                            </div>
                            <div style={{justifyItems:"end !important"}} className='w-full flex justify-end'>
                                {
                                    tickets.slice(18,19).map(
                                        (ticket:TicketSchema)=>{
                                            return <div key={ticket.ticketId} className='flex items-center gap-x-0' onClick={()=>handleSeat( ticket.ticketId)}>
                                               <h6 className='text-base text-neutral-600 font-bold'>{ticket.ticketId}</h6>
                                               <MdOutlineChair className={`text-3xl -rotate-90 ${getSeatName(ticket)}`}/>    
                                            </div>
                                        }
                                    )
                                }
                            </div>
                            <div className='w-full h-auto grid grid-cols-9 gap-x-5 justify-end'>
                                {
                                    tickets.slice(0,9).map(
                                        (ticket:TicketSchema)=>{
                                            return <div key={ticket.ticketId} className='flex items-center gap-x-0' onClick={()=>handleSeat( ticket.ticketId)}>
                                               <h6 className='text-base text-neutral-600 font-bold'>{ticket.ticketId}</h6>
                                               <MdOutlineChair className={`text-3xl -rotate-90 ${getSeatName(ticket)}`}/>    
                                            </div>
                                        }
                                    )
                                }
                            </div>
                            <div className='w-full h-auto grid grid-cols-9 gap-x-5 justify-end'>
                                {
                                    tickets.slice(9,18).map(
                                        (ticket:TicketSchema)=>{
                                            return <div key={ticket.ticketId} className='flex items-center gap-x-0' onClick={()=>handleSeat( ticket.ticketId)}>
                                               <h6 className='text-base text-neutral-600 font-bold'>{ticket.ticketId}</h6>
                                               <MdOutlineChair className={`text-3xl -rotate-90 ${getSeatName(ticket)}`}/>    
                                            </div>
                                        }
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex items-center justify-center gap-6 border-t pt-5 border-neutral-200'>
                    <div className='flex items-center gap-x-2'>
                        <MdOutlineChair className='text-3xl text-neutral-500 -rotate-90'/>
                        <p className='text-sm text-neutral-500 font-medium'>Disponible</p>
                    </div>    
                    <div className='flex items-center gap-x-2'>
                        <MdOutlineChair className='text-3xl text-amber-500 -rotate-90'/>
                        <p className='text-sm text-neutral-500 font-medium'>Selectionné</p>
                    </div> 
                    <div className='flex items-center gap-x-2'>
                        <MdOutlineChair className='text-3xl text-amber-900 -rotate-90'/>
                        <p className='text-sm text-neutral-500 font-medium'>Indisponible</p>
                    </div> 
                    <div className='flex items-center gap-x-2'>
                        <RiMoneyRupeeCircleLine className='text-3xl text-neutral-500 -rotate-90'/>
                        <p className='text-sm text-neutral-500 font-medium'>ClassV2</p>
                    </div> 
                </div>
            </div>
        </div>
        <div className='col-span-2 px-10 w-full space-y-5 bg-neutral-50 rounded-xl py-4  border border-neutral-200 shadow-sm '>
            <div className='w-full space-y-2'>
                <div className='w-full flex items-center justify-between'>
                    <h1 className='text-lg text-neutral-600 font-medium'>
                        Votre Destination
                    </h1> 
                    <Link href ="/?section=travel" className='text-sm text-blue-500 font-normal'>Changez de destination</Link>

                </div>
                <div className='space-y-0.5 w-full'>
                    <div className='w-full flex items-center justify-between gap-x-5'>
                        <p className='text-sm text-neutral-400 font-normal'>De <span className='text-xs'>(Douala)</span></p>
                        <p className='text-sm text-neutral-400 font-normal'>Vers <span className='text-xs'>(Yaoundé)</span></p>
                    </div>
                    <div className='w-full flex items-center justify-between gap-x-4'>
                        <h1 className='text-sm text-neutral-600 font-normal'>
                            Jouvence <span className='font-medium'>(06:15 pm)</span>
                        </h1>
                        <div className='flex-1 border-dashed border border-neutral-300'/>
                        <h1 className='text-sm text-neutral-600 font-normal'>
                            
                            Eloundem <span className='font-medium'>(06:15 pm)</span> 
                        </h1>
                    </div>
                </div>

            </div>    
            <div className='w-full space-y-2'>
                <div className='w-full flex items-center justify-between'>
                    <h1 className='text-lg text-neutral-600 font-medium'>
                        Selected Seats
                    </h1>
                    <div className='bg-red-300 rounded-lg py-2.5 px-2.5 text-xs text-neutral-600 font-normal uppercase'>
                        Non-refundable
                    </div>
                </div>
                {
                    selectedSeats.length > 0 ? <div className='w-full flex items-center gap-x-3'>
                        {
                            selectedSeats.map(
                                (seat)=>{
                                    return <div key = {seat} className='w-9 h-9 bg-neutral-200/80 rounded-lg flex items-center justify-center text-lg text-neutral-700 font-semibold' >
                                        {seat}
                                    </div>    
                                }
                            )
                        }
                    </div>:<div className='w-full flex items-center justify-between'>
                         <h3 className='text-sm text-neutral-500 font-medium'>No Seat Selected</h3>
                    </div> 
                }
            </div>    
            <div className='w-full space-y-2'>
                <h1 className='text-lg text-neutral-600 font-medium'>
                    Fare details
                </h1>
                <div className='w-full flex items-center justify-between border-dashed border-l-[1.5px] pl-2 border-neutral-400 '>
                    <h3 className='text-sm text-neutral-500 font-medium'>
                        Basic Fare
                    </h3>
                    <p className='text-sm text-neutral-600 font-medium '>Nfr</p>
                </div>
                <div className='flex items-center justify-between gap-x-4'>
                    <div className='flex gap-y-0 5 flex-col '>
                        <h3 className='text-base text-neutral-500 font-medium'>
                            Total Price:
                        </h3>
                        <span className='text-xs text-neutral-500 font-normal'>
                            (Including All Taxes)
                        </span>
                    </div>
                    <p className='text-base text-neutral-600 font-semibold'>
                        NPR {" "}
                        {
                            selectedSeats.reduce(
                                (total:number,seatId:string)=>{
                                    const seat = tickets.find((t)=>t.ticketId === seatId)
                                    return total + (seat ? 1000:0)
                                }
                            ,0)
                        }
                    </p>
                </div>
            </div>    
            <div className='w-full flex items-center flex-col gap-4 justify-center'>
            <Input placeholder='Entrez votre cni'/>
            <button
            
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-md flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Acheter le ticket
        </button> 
            </div>    
        </div>
    </div>
  )
}
