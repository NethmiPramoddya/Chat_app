import React,{ useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import logo from './assets/chat.jpg'

function Login() {
   const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const Navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:3000/login', {email,password})
        .then(result => {console.log(result)
          if(result.data.message === "Success"){
          // Store simple login state in localStorage
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userEmail", result.data.email);
          localStorage.setItem("userId", result.data.userId); //  Store userId
          localStorage.setItem("username", result.data.username);
          Navigate('/room/${newRoom}');
          }else{
            alert(result.data.message)
          }
          
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
            <h2 className="text-2xl font-bold text-center text-gray-800">Log In</h2>

            <div className="py-3">
              <label className="block text-sm font-medium text-left text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e)=>setEmail(e.target.value)}
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
              className="w-full py-3 text-white transition duration-300 bg-green-600 rounded-xl hover:bg-greens-700">
              Log In
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="pb-4 text-gray-600">Don’t have an account?</p>
            <Link
              to="/signup"
              className="inline-block w-full px-6 py-3 text-white transition duration-300 bg-green-600 rounded-xl hover:bg-green-700"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login