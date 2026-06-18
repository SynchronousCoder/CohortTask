import React from 'react'
import doctorClinic from '../assets/doctorClinic.jpg'

const Hero = () => {
  return (
    <div className='hero-div'>
      <img className='hero-img' src={doctorClinic} alt="Doctor Clinic" />
    </div>
  )
}

export default Hero