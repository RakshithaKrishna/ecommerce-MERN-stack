import React from 'react'
import Nav from './Nav'
import Footer from '../Home/Footer'
import { useLocation } from 'react-router-dom'

const Payment = () => {
  const location = useLocation()
  const {state} = location;

  console.log(state,'shipping')
  return (
    <div>
        <Nav/>
      
<Footer/>

    </div>
  )
}

export default Payment
