import React from 'react'
import { NavLink } from 'react-router'
const Home = () => {

  return (
    <div>
      <NavLink to="/notes"><button className='btn btn-outline bg-pink-400'> Get Notes</button></NavLink>
    </div>
  )
}

export default Home