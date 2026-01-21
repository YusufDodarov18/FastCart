import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import useTheme from "../../../app/others/theme/theme-context";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import toast from "react-hot-toast";
import {axiosRequest} from '../../../api/axiosRequest'

function SignIn() {
 const { theme } = useTheme();
 const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")
 const [showPassword, setShowPassword] = useState(false);
 const [loading,setLoading]=useState(false)

  const token=localStorage.getItem("token")
  const navigate=useNavigate()

   useEffect(()=>{
    if(token){
      navigate("/")
    }
  },[navigate])

  const OnFormSubmit=async(e)=>{
    e.preventDefault()
    if(!email||!password){
      toast.error("Invalid login registered")
      return
    }

    setLoading(true)

    try {
      const {data}=await axiosRequest.post('/Account/login/user',{
        email:email,
        password:password,
      })

      if(data?.token){
        localStorage.setItem("token",data.token)
        toast.success("Login Successfully")
        navigate("/")
      }
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error("Login failed. Please check your credentials")
      setPassword("")
      setEmail("")
    }finally{
      setLoading(false);
    }

  }
  return (
    <div className={`max-h-screen pt-15 pb-30 flex items-center justify-center ${theme?"bg-gray-900":"bg-gray-100"}`}>
          <Box className={`w-full max-w-md  rounded-2xl shadow-lg p-8 ${theme ? "bg-gray-800":" bg-white"}`}>
                <h1 className={`text-2xl font-bold ${theme ? "text-white":" text-gray-900"}`}>Log in to Exclusive</h1>
                 <p className={`${theme?"text-gray-400":"text-gray-500 "} text-sm mt-2`}>Enter your details below</p>

                 <form className="mt-6 flex flex-col gap-4" onSubmit={OnFormSubmit}>
                       <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email or phone number" className={`w-full px-4 py-2 border ${theme?"border-gray-600 bg-gray-700 placeholder-gray-400 text-gray-100":"border-gray-300 bg-white placeholder-gray-500 text-gray-900"} rounded-lg  focus:ring-2 focus:ring-red-500 outline-none`}/> 

                        <Box className="relative">
                             <input value={password} onChange={e=>setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Password" className={`w-full px-4 py-2  border ${theme?"border-gray-600 bg-gray-700 placeholder-gray-400 text-gray-100":"border-gray-300 bg-white placeholder-gray-500 text-gray-900"} rounded-lg  focus:ring-2 focus:ring-red-500 outline-none`}/> 
                             {password&&
                              <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute inset-y-0 right-3 flex items-center cursor-pointer ${theme?"text-gray-300":"text-gray-500"}`}>
                                  {showPassword?<EyeOff size={18} />:<Eye size={18} />}
                              </button>
                              }
                        </Box>
                          <div className="flex justify-start items-center">
                              <Link to={`/login/sign-up`}>
                                <Typography className="cursor-pointer indent-2" sx={{color:"#DB4444"}}>Forget Password?</Typography>
                              </Link>
                          </div>
                         <button type="submit" className="w-full bg-[#DB4444] text-white font-medium py-2 cursor-pointer rounded-lg hover:bg-red-600 transition">Log In</button>
                    </form>
          </Box>
    </div>
  );
}

export default SignIn;
