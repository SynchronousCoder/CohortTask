import React from 'react'

const Button = (props) => {
    // console.log(props)
  return (
    <div className='bg-emerald-600 px-4 py-2 text-white rounded text-2xl font-bold w-fit m-10'>
      {props.text}
    </div>
  )
}

export default Button
