import React from 'react'
import {motion} from "framer-motion"
import hero from "../images/bus-assets/herobg.png"
import Image from 'next/image'
import SearchTravel from './SearchTravel'
export default function Voyages() {
  const variant = {
    hidden:{opacity:0,y:-800},
    visible:{opacity:1,y:0}
  }
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <motion.div className={`w-full z-[-3000]  h-screen fixed bg-cover bg-top bg-no-repeat top-0 right-0 left-0 bg-[url('../images/bus-assets/herobg.png')]`}>
        </motion.div>
        <div className=''>
            <h3 className='text-center text-blue-400'>Get your bus ticket</h3>
            <h1 className='text-5xl mb-10 text-gray-900 font-bold capitalize text-center'>Find Best Bus For You</h1>
            <SearchTravel/>
        </div>  
    </div>
  )
}