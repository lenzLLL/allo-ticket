"use client"
import Link from 'next/link'
import React,{useState,useEffect} from 'react'
import { GiReceiveMoney, GiSteeringWheel } from 'react-icons/gi'
import {MdOutlineChair} from "react-icons/md"
import {RiMoneyRupeeCircleLine} from "react-icons/ri"
import { Input } from './ui/input'
import { useParams } from 'next/navigation'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import {useCookies} from "next-client-cookies"
import { AlignJustify, AlignVerticalSpaceAround, Armchair, CircleArrowRight, LoaderCircle, Ticket, XCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Button } from './ui/button'
import JoinQueueTravel from './JoinQueuTravel'
import PurchaseTicketTravel from './PurchaseTicketTravel'
export default function BusSeat() {

   const params = useParams()
   const cookies = useCookies()
   const id = cookies.get("auth")
   const user = useQuery(api.users.getUserById, { userId:id? id:'' });
   type ticket = {
          _id:Id<"ticketst">,
          amount:number, 
          is_cancelled:boolean,
          num:string
   }
 const queuePosition = useQuery(api.WaitingListT.getQueuePosition, {
    travelId:params.id as Id<"travel">,
    userId: user?.userId ?? "",
  });
 const [selectedSeats,setSelectedSeats] =  useState<string[]>([])
 const [addedClass,setAddedClass] = useState<string>("")
 const [isFixed,setIsFixed] = useState<boolean>(false)
 const [tickets,setTickets] = useState<any[]>([])
 const [total,setTotal] = useState(0)
 const availability = useQuery(api.travel.getTravelAvailability, { travelId: params.id as Id<"travel"> });
 const {toast} = useToast()

 const handleSeat = (seatId:string) => {
    let T: any[] | void = reponse?.tickets 
    ? reponse.tickets.map((t: any) => ({
        _id: t._id,
        num: t.num,
        amount: t.amount,
        is_cancelled: t.is_cancelled
    })) 
    : [];    
    if(T?.length ===0)

     {
        toast({
            variant: "destructive",
            title: "Uh oh! Une Erreur s'est produite.",
            description: "Aucun ticket disponible.",
          });
        return
     }
     if(selectedSeats.length === 10){
        toast({
            variant: "destructive",
            title: "Uh oh! Une Erreur s'est produite.",
            description: "Veuillez noter que chaque utilisateur ne peut pas commander plus de 10 billets de voyage à la fois. Si vous avez besoin de plus de billets, merci de passer plusieurs commandes séparées.",
          });
        return
     }
     if(selectedSeats.includes(seatId)){
        setSelectedSeats((state)=>[...state.filter(s=>s!==seatId)])
        setTickets(tickets.filter((s:ticket)=>s.num !== seatId))
        return
     }
     
     setSelectedSeats((state:string[])=>[...state,seatId])
     setTickets((state:ticket[])=>[...state,...T.filter((t:ticket)=>t.num === seatId)])
 

 }
 useEffect(
    ()=>{
        if(isFixed){
            return
        }
        if(reponse?.bus?.cols === 8){
            setAddedClass("grid-cols-8")
        }
        else if(reponse?.bus?.cols === 9){
            setAddedClass("grid-cols-9")
        }
        else if(reponse?.bus?.cols === 10){
            setAddedClass("grid-cols-10")
        }
        else{
            setAddedClass("grid-cols-11")
        }
        setIsFixed(true)
    },[]
 )
 const getSeatName = (seat:string) => {
     let status = ""
     let length = reponse?.tickets.length||0
     for(let i = 0;i<length;i++){
        if(reponse?.tickets[i].num === seat){
            status = reponse?.tickets[i].status 
        }
     }
     if(status === "used" || status === "valid"){
         return "text-amber-700 cursor-not-allowed"
     }
         let isvalidticket = false
    /* vérifions maintenant si le ticket existe*/
    length = reponse?.tickets?.length || 0
    for(let i = 0;i<length;i++){
        if(reponse?.tickets[i].num === seat)
        {
            isvalidticket = true
            break
        }
    }
    if(!isvalidticket){
         return "text-amber-700 cursor-not-allowed"
    }
    if(selectedSeats.includes(seat)){
         return "text-amber-500 cursor-pointer"
     }
     return "text-neutral-500 cursor-pointer"
 }
 const checkSeat = (row:number,col:number) => {
    const legnth1:number =  reponse?.bus?.cols ||0
    const legnth2:number =  reponse?.bus?.rows ||0
    const seatLength:number = reponse?.seats.length||0
    let founded = ''
    for(let i = 0;i<legnth2;i++){
        for(let k = 0;k<legnth1;k++){
            for(let j = 0;j<seatLength;j++){
                if(reponse?.seats[j]?.col == col.toString() && reponse?.seats[j]?.row == row.toString()){
                    founded = reponse.seats[j]?.num
                    break;
                }
                if(founded){
                    break;
                }
            }
            if(founded){
                break;
            } 
        }
    }
    return founded
 }
 const reponse = useQuery(api.travel.getSeats, { travelId:params.id as Id<"travel">, });
 const renderQueuePosition = () => {
    if (!queuePosition || queuePosition.status !== "waiting") return null;
    let purchased = availability?.purchasedCount? availability?.purchasedCount:0
    let T = availability?.totalTickets? availability?.totalTickets:0
    if (purchased >= T) {
      return (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Ticket className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-gray-600">Touts les billets ont été vendus</span>
          </div>
        </div>
      );
    }

    if (queuePosition.position === 2) {
      return (
        <div className="flex flex-col lg:flex-row items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100">
          <div className="flex items-center">
            <CircleArrowRight className="w-5 h-5 text-amber-500 mr-2" />
            <span className="text-amber-700 font-medium">
              Vous êtes le prochain dans la file d'attente ! (Position:{" "})
              {queuePosition.position}
            </span>
          </div>
          <div className="flex items-center">
            <LoaderCircle className="w-4 h-4 mr-1 animate-spin text-amber-500" />
            <span className="text-amber-600 text-sm">En attente de billet</span>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-center">
          <LoaderCircle className="w-4 h-4 mr-2 animate-spin text-blue-500" />
          <span className="text-blue-700">Position dans la file d'attente</span>
        </div>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
          #{queuePosition.position}
        </span>
      </div>
    );
  };
 const renderTicketStatus = () => {
    if (!user) return null;
    if (queuePosition) {
      return (
        <div className="mt-4">
          {queuePosition.status === "offered" && (
             <PurchaseTicketTravel travelId={params.id as Id<"travel">} />
          )}
          {renderQueuePosition()}
          {queuePosition.status === "expired" && (
            <div className="p-3 bg-red-50 rounded-lg border border-red-100">
              <span className="text-red-700 font-medium flex items-center">
                <XCircle className="w-5 h-5 mr-2" />
                Offre expirée
              </span>
            </div>
          )}
        </div>
      );
    }
    return null
  }
 return (
    <div className='w-full grid  grid-cols-5 gap-10 px-10'>
        <div className='col-span-3'>
        <div style={{boxShadow:"0 0 2px black"}} className='w-full flex items-center justify-center  rounded-xl p-4 border border-neutral-200'>
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
                        {Array.from({ length: reponse?.bus?.rows || 0 }).map((_, i) =>{

                            return (
                                <div key = {i} className={'w-full h-auto grid '+addedClass+' gap-x-5 justify-end'}>
                                {
                                    Array.from({length:reponse?.bus?.cols||0}).map((_,k)=>(

                                        <div key = {k}>
                                   {    checkSeat(i,k) &&<div key={k} className='flex items-center gap-x-0' onClick={()=>handleSeat(checkSeat(i,k))}>
                                               <MdOutlineChair className={`text-3xl -rotate-90 ${getSeatName(checkSeat(i,k))}`}/>    
                                        </div> }
                                    {
                                        !checkSeat(i,k) && <AlignVerticalSpaceAround className='text-gray-500' />
                                    }

                                        </div>
                                    ))
                                }
                            </div>
                            )
                        })}
                           
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
                        <AlignVerticalSpaceAround className='text-3xl text-neutral-500'/>
                        <p className='text-sm text-neutral-500 font-medium'>vide</p>
                    </div> 
                </div>
            </div>
        </div>
        </div>
        <div className='col-span-2'>
        <div className='px-10 w-full space-y-5 bg-neutral-50 rounded-xl py-4  border border-neutral-200 shadow-sm '>
            <div className='w-full space-y-2'>
                <div className='w-full flex items-center justify-between'>
                    <h1 className='text-lg text-neutral-600 font-medium'>
                        Votre Destination
                    </h1> 
                    <Link href ="/?section=travel" className='text-sm text-blue-500 font-normal'>Changez de destination</Link>

                </div>
                <div className='space-y-0.5 w-full'>
                    <div className='w-full flex items-center justify-between gap-x-5'>
                        <p className='text-sm text-neutral-400 font-normal'>De <span className='text-xs'>({reponse?.travel.from})</span></p>
                        <p className='text-sm text-neutral-400 font-normal'>Vers <span className='text-xs'>({reponse?.travel?.to})</span></p>
                    </div>
                    <div className='w-full flex items-center justify-between gap-x-4'>
                        <h1 className='text-sm text-neutral-600 font-normal'>
                            <span className='font-medium'>({reponse?.travel?.depart && (new Date(reponse.travel.depart)).toLocaleString()})</span>
                        </h1>
                        <div className='flex-1 border-dashed border border-neutral-300'/>
                        <h1 className='text-sm text-neutral-600 font-normal'>
                            
                            <span className='font-medium'>({(new Date(reponse?.travel.arrivate||4444444)).toLocaleString()})</span> 
                        </h1>
                    </div>
                </div>

            </div>    
            <div className='w-full space-y-2'>
                <div className='w-full flex items-center justify-between'>
                    <h1 className='text-lg text-neutral-600 font-medium'>
                        Sièges Sélectionnés
                    </h1>
                    <div className='bg-red-300 rounded-lg py-2.5 px-2.5 text-xs text-neutral-600 font-normal uppercase'>
                        Non-remboursable
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
                         <h3 className='text-sm text-neutral-500 font-medium'>Aucun Siège Sélectionné</h3>
                    </div> 
                }
            </div>    
            <div className='w-full space-y-2'>
                {/* <h1 className='text-lg text-neutral-600 font-medium'>
                    Fare details
                </h1>
                <div className='w-full flex items-center justify-between border-dashed border-l-[1.5px] pl-2 border-neutral-400 '>
                    <h3 className='text-sm text-neutral-500 font-medium'>
                        Basic Fare
                    </h3>
                    <p className='text-sm text-neutral-600 font-medium '>Nfr</p>
                </div> */}
                <div className='flex items-center justify-between gap-x-4'>
                    <div className='flex gap-y-0 5 flex-col '>
                        <h3 className='text-base text-neutral-500 font-medium'>
                            Prix Total:
                        </h3>
                        {/* <span className='text-xs text-neutral-500 font-normal'>
                            (Including All Taxes)
                        </span> */}
                    </div>
                    <p className='text-base text-neutral-600 font-semibold'>
                        {" "}
                        {
                            tickets.reduce(
                                (total:number,ticket:ticket)=>{
                                    return total + ticket.amount
                                }
                            ,0)
                        }
                        XAF
                    </p>
                </div>
            </div>    
            <div className='w-full flex items-center flex-col gap-4 justify-center'>
            <Input placeholder='Entrez votre cni'/>
            {user ? (
                     <JoinQueueTravel
                       travelId={params.id as Id<"travel">}
                       userId={user.userId}
                       num={selectedSeats}
                     />
                    
                  ) : (
                    
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                        Connectez-vous pour acheter des billets.
                      </Button>
                    
                  )}

            </div>
            {
                renderTicketStatus()
            }    
        </div>
        </div>
    </div>
  )
}
