import React from 'react'
import {BiErrorCircle} from 'react-icons/bi'
function ErrorDisplay({err}) {
  return (
    <div className='py-4 px-6 w-full bg-red-600 rounded-xl flex flex-row gap-1 justify-center items-center text-xl'>
      <span className='text-2xl'><BiErrorCircle/></span>
      <span className='capitalize'>{err.name}: {err.message}</span>
    </div>
  )
}

export default ErrorDisplay