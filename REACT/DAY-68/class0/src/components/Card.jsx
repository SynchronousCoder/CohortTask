import React from 'react'

const Card = (props) => {
    console.log(props.id)
  return (
    <div className='h-28 w-40 bg-blue-600 border-2 border-b-white rounded-lg flex items-center justify-center text-white text-2xl font-bold'>
      {props.name}
    </div>
  )
}

export default Card
