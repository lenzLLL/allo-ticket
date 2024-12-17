import React from 'react'
import {XCircle} from "lucide-react"
import TopSearch from './TopSearch'
import SearchTravel from './SearchTravel'
export default function FilterTravel({onClick}:{onClick:(a:boolean)=>void}) {
  return (
    <div className='fixed top-0 p-y-10  bottom-0 left-0 right-0 bg-black bg-opacity-20 flex items-start justify-center'>
        <div className='bg-white my-10 p-5 min-w-[50vw] rounded-md border-2 border-blue-50 w-auto relative'>
            <span onClick={()=>onClick(false)} className='cursor-pointer text-neutral-400 absolute top-5 right-5'><XCircle /></span>
            <h1 className='font-bold text-2xl mb-10'>Filtre</h1>
            <SearchTravel show={false}/>
        </div>
    </div>
  )
}
