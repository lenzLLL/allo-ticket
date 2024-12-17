"use client"
import EventList from "@/components/EventList";
import { useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import img from "@/images/f.png";
import { FilterIcon } from "lucide-react";
import Loading from "./loading";
import Voyages from "@/components/Voyages";
export default function Home() {
  
  const sections = ["é".toUpperCase()+"vénements","Voyages","Explorer"]
  const [active,setActive] = useState("é".toUpperCase()+"vénements")
  const [isPending,startTransition] = useTransition()
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const changeActive = async (s:string) =>{
    startTransition(
      async () => {
        try{
            setIsLoading(true)
            setTimeout(
              ()=>{
                  setActive(s)
                  setIsLoading(false)
              },1000
            )
        }
        catch(error){

        }
      }
    )
  }
  if(isLoading){
    return<div className="w-full h-full flex items-center justify-center mt-20 flex-col"><Loading/>
     <span className="text-blue-700">Chargement veillez patienter</span>
    </div>
  }  

  return (
    <div>
      <div  className="max-w-7xl flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Select  >
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Trier par" />
      </SelectTrigger>
      <SelectContent className="w-auto">
        <SelectGroup>
          <SelectLabel>Agences de voyage</SelectLabel>
          <SelectItem value="ar">Populaires</SelectItem>
          <SelectItem value="bot">Récentes</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>{"é".toUpperCase()}vènements</SelectLabel>
          <SelectItem value="a">Populaires</SelectItem>
          <SelectItem value="b">Suivies</SelectItem>
          <SelectItem value="brt">Nouveaux</SelectItem>
        </SelectGroup>
      </SelectContent>
      </Select>
      <div className="flex items-center justify-center gap-8">
          {
            sections.map(
              (s)=>{
                  return <div onClick={()=>changeActive(s)} className={`cursor-pointer hover:text-blue-800 transition-all duration-75 flex items-center justify-center font-medium text-blue-950 ${active === s && "bg-blue-200 py-2 px-5 rounded-full"}`}                       key={s}>{s}</div> 
              }
            )
          }
      </div>
       <div className="flex items-center text-md py-2 border cursor-pointer px-5 rounded-full border-grey-200 hover:shadow-md">
            <span className="text-sm">filtre</span> <FilterIcon size={12} color="gray"/> 
       </div>  
      </div>
      {active === "é".toUpperCase()+"vénements" && <EventList />}
      {active === "Voyages" && <Voyages />}
    </div>
  );
}
