import { FireExtinguisherIcon, Search } from 'lucide-react'
import React from 'react'
import {TbArrowsExchange} from "react-icons/tb"
export default function SearchTravel() {
  return (
    <div className="w-full p-5 flex justify-center items-center max-w-4xl mx-auto gap-3 border-2 rounded-xl bg-blue-50">
    
    
      <div className='w-[60%]  relative flex items-center gap-5'>
      <input
        type="text"
        placeholder="Recherchez un évènement..."
        className="w-full py-3 px-12 bg-white rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />
      <input
        type="text"
        itemScope
        placeholder="Recherchez un évènement..."
        className="w-full py-3 px-12 bg-white rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />
          <button
        type="submit"
        className="absolute flex items-center justify-center  -ml-7 left-1/2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 hover:from-blue-600  to-purple-600 hover:to-purple-700 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
      >
        <TbArrowsExchange size={20}/>
      </button>
      </div>
      <div className='flex-1'></div>
      <div className='flex items-center gap-5 h-10  flex-1'>
          <div className='flex-3 gap-10 h-full border border-neutral-300 bg-white/70 text-base text-neutral-700 font-medium px-5 flex items-center rounded-lg'>
              <input type='date' className='flex-2 border-none h-full outline-none bg-transparent' />

          </div>
          <button
        type="submit"
        className="bg-gradient-to-r w-auto flex items-start justify-center from-blue-500 hover:from-blue-600  to-purple-600 hover:to-purple-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
      >
        <Search/>
      </button>
      </div>
      {/* <input
        type="text"
        placeholder="Recherchez un évènement..."
        className="w-full py-3 px-4 pl-12 bg-white rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 hover:from-blue-600  to-purple-600 hover:to-purple-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
      >
        Rechercher
      </button> */}
    
  </div>
  )
}
