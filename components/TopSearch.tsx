import React from 'react'
import TopsearchCard from './TopsearchCard'
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function TopSearch() {
    const travels = useQuery(api.travel.get);
  return (
    <div className='space-y-12 mt-24'>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Voyages {'à'.toUpperCase()} Venir</h1>
          <p className="mt-2 text-gray-600">
              Réservez des billets pour vos voyages en famille.
          </p>
        </div>
        <div className='grid grid-cols-1 grid-rows-auto md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
            {
              travels?.map(
                (t:any)=>(            <TopsearchCard id = {t._id} wifi = {t.wifi} food = {t.foods} tv = {t.tv} electricity = {t.electricity}  key={t._id} routeFrom={t.from} date={t.depart} routeTo={t.to} link={'/travel/'+t._id} price={t.price} timeDuration={t.duration} is_cancelled={false} isPastTravel={false} />)
              )
            }
  
        </div>
    </div>
  )
}
