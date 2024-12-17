import React from 'react'
import TopsearchCard from './TopsearchCard'

export default function TopSearch() {
  return (
    <div className='space-y-12 mt-24'>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Voyages {'à'.toUpperCase()} Venir</h1>
          <p className="mt-2 text-gray-600">
              Réservez des billets pour vos voyages en famille.
          </p>
        </div>
        <div className='grid grid-cols-1 grid-rows-auto md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
            <TopsearchCard routeFrom='Douala' date="28/01/2000" routeTo='Yaoundé' link='/travel' price={1000} timeDuration={'2h'} is_cancelled={false} isPastTravel={false} />  
            <TopsearchCard routeFrom='Douala' date="28/01/2000" routeTo='Yaoundé' link='/travel' price={1000} timeDuration={'2h'} is_cancelled={false} isPastTravel={false} />  
            <TopsearchCard routeFrom='Douala' date="28/01/2000" routeTo='Yaoundé' link='/travel' price={1000} timeDuration={'2h'} is_cancelled={false} isPastTravel={false} />  
            <TopsearchCard routeFrom='Douala' date="28/01/2000" routeTo='Yaoundé' link='/travel' price={1000} timeDuration={'2h'} is_cancelled={false} isPastTravel={false} />  
            <TopsearchCard routeFrom='Douala' date="28/01/2000" routeTo='Yaoundé' link='/travel' price={1000} timeDuration={'2h'} is_cancelled={false} isPastTravel={false} />  
        </div>
    </div>
  )
}
