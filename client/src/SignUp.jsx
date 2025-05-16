import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import logo from './assets/chat.jpg'

function SignUp() {
    const[name, setName] = useState("")
    const[email, setEmail] = useState("")
    const[phone, setPhone] = useState("")
    const[password, setPassword] = useState("")
    const Navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:3000/signup', {name,email,phone,password})
        .then(result => {console.log(result)
            localStorage.setItem("userId", result.data.userId); 
            localStorage.setItem("userEmail", result.data.email);
            localStorage.setItem("userPhone", result.data.phone);
            Navigate('/login')
        })
        .catch(err => console.log(err))
    }



  return (
    <div>
      <div className="flex items-center justify-center min-h-screen px-4 py-10">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-2xl">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="w-auto h-16" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>

          <div className="py-2">
            <label className="block text-sm font-medium text-left text-gray-700 ">Name</label>
            <input
              type="text"
              name="name"

              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div className="py-2">
            <label className="block text-sm font-medium text-left text-gray-700">Email</label>
            <input
              type="email"
              name="email"

              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="py-2">
            <label className="block text-sm font-medium text-left text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
   
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=>setPhone(e.target.value)}
            />
          </div>

          <div className="py-3">
            <label className="block text-sm font-medium text-left text-gray-700">Password</label>
            <input
              type="password"
              name="password"

              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white transition duration-300 bg-green-600 rounded-xl hover:bg-green-700">
            Create Account
          </button>
        </form>
        <div className="mt-4 text-center">
            <p className="pb-4 text-gray-600">Already have an account?</p>
            <Link
              to="/login"
              className="inline-block w-full px-6 py-3 text-white transition duration-300 bg-green-600 rounded-xl hover:bg-green-700">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div> 
  )
}

export default SignUp