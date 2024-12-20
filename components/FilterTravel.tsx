import React,{useState} from 'react'
import {XCircle} from "lucide-react"
import TopSearch from './TopSearch'
import Select from "react-select"
import makeAnimated from 'react-select/animated';
import SearchTravel from './SearchTravel'
import { Input } from './ui/input';
export default function FilterTravel({onClick}:{onClick:(a:boolean)=>void}) {
  const [filter,setFilter] = useState<FilterSchema>({agences:[],minPrice:0,maxPrice:0,class:[]})
  type FilterSchema = {
    agences:string[],
    minPrice?:number,
    maxPrice?:number,
    class:string[]
  }
  const setNewAgence = (data:string[]) => {
      setFilter({...filter,agences:data})
  }
  const setClassAgence = (data:string[]) => {
    setFilter({...filter,class:data})
}
  const animatedComponents = makeAnimated();
  return (
    <div className='fixed top-0 p-y-10  bottom-0 left-0 right-0 bg-black bg-opacity-20 flex items-start justify-center'>
        <div className='bg-white my-10 p-5 min-w-[50vw] rounded-md border-2 border-blue-50 w-auto relative'>
            <span onClick={()=>onClick(false)} className='cursor-pointer text-neutral-400 absolute top-5 right-5'><XCircle /></span>
            <h1 className='font-bold text-2xl mb-10'>Filtre</h1>
            <SearchTravel show={false}/>
            <Select
          onChange={(data:any)=>setNewAgence(data)}
          className="w-full mt-5"
          getOptionLabel ={(agence:{name:string,id:string})=>agence.name}
          getOptionValue={(agence:{name:string,id:string})=>agence.id}
          placeholder={"Selectionnez une ou plusieurs agences de voyage"}   
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
            //  defaultValue={finalClassData}
          options={[{name:"Buca voyage",id:"dsf"},{name:"Express Voyage",id:"fs"}]}
         />

        <Select
          onChange={(data:any)=>setClassAgence(data)}
          className="w-full mt-5"
          getOptionLabel ={(agence:{id:string})=>agence.id}
          getOptionValue={(agence:{id:string})=>agence.id}
          placeholder={"Class"}   
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
            //  defaultValue={finalClassData}
          options={[{id:"VIP"},{id:"SEMI-VIP"},{id:"BUSINESS-CLASS"},{id:"CLASSIQUE"}]}
         />
         <div className='mt-5 flex items-center gap-3 justify-between'>
             <Input className='' type='number' placeholder='montant minimum' onChange={(e)=>setFilter({...filter,minPrice:parseInt(e.target.value)})}/>
             <Input className='' type='number' placeholder='montant maximum' onChange={(e)=>setFilter({...filter,maxPrice:parseInt(e.target.value)})}/>
         </div>
         <button
          type="submit"
          className="mt-5 bg-gradient-to-r from-blue-500 hover:from-blue-600  to-purple-600 hover:to-purple-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
        >
          Appliquer le filtre
        </button>
        </div>
    </div>
  )
}
