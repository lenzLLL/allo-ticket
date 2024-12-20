import Link from 'next/link'
import React from 'react'
import BusSeat from './BusSeat'

export default function DetailsTravel() {

 return (
    <div className='w-full space-y-12 pb-16'>
        <div className='w-full space-y-8'>
            <div className="bg-blue-50 border m-10 border-blue-100 rounded-lg p-6">
                  <h3 className="text-md font-semibold text-blue-900 mb-2">
                    Informations sur le voyage
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li>• Veuillez noter que chaque utilisateur ne peut pas commander plus de 10 billets de voyage à la fois. Si vous avez besoin de plus de billets, merci de passer plusieurs commandes séparées.</li>
                    <li>• Billet non remboursable</li>
                    {/* <li>• Age restriction: 18+</li> */}
                  </ul>
                </div>
           <BusSeat/>

        </div>
        <div className='w-full flex items-center justify-center flex-col'>
            
        </div>    
    </div>
  )
}
