import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div>
      <div className="card">
        <h1>Register</h1>
        <div className="form">
          <form>
            <input type="text" placeholder='Enter your username'/>
            <input type="text" placeholder='Enter you email'/>
            <input type="password" placeholder='Enter your password'/>
            <button type='submit'>Register</button>
          </form>
          <p>Have an account ? <Link to={"/login"}>Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register
