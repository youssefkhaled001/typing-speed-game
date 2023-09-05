import React from 'react'
import { useGameContext } from '../Contexts/GameContext'
import './external/Card.css'
function Score() {
  const {Progress} = useGameContext();

  const Card = ({number, scale, description})=>{
    return <div className="card">
            <div className="card__content p-5">
              <div className='text-4xl font-extrabold flex flex-col justify-between h-full'>
                <div>
                  <div>
                    {number}
                  </div>
                  <div className='text-3xl'>
                    {scale}
                  </div>
                </div>
                <div className='text-base font-normal'>
                    {description}
                </div>
              </div>
            </div>
          </div>
  }

  return  <div className='flex flex-row gap-x-5'>
            <Card number= {Progress.score} scale='WPM' description='The average person types between 38 and 40 words per minute'/>
            <Card number= {((Progress.totalChars-Progress.fails)/Progress.totalChars*100).toFixed(2)+'%'} scale='Accurate' description='The average person types with an accuracy rate of 92%'/>
          </div>
}

export default Score