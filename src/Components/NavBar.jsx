import React from 'react'
import {Logo} from './'
import { NavLink } from 'react-router-dom'
function NavBar() {
  return (
    <div className='w-full h-20 bg-navBarBg flex flex-row justify-between items-center text-white p-5'>
      <Logo/>
      <div>
        <NavLink to={'/'} className='mx-5 font-bold text-navTextColor'>
          Home
        </NavLink>
        <NavLink to={'/play'} className='mx-5 font-bold text-navTextColor'>
          Play
        </NavLink>
        <NavLink to={'/scores'} className='mx-5 font-bold text-navTextColor'>
          Scores
        </NavLink>
      </div>
    </div>
  )
}

export default NavBar