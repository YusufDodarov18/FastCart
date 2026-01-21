import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import useTheme from "../../../app/others/theme/theme-context";
import google from "../../../app/others/assets/google.png";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosRequest } from "../../../api/axiosRequest";

const SignUp = () => {
  const { theme } = useTheme();
  const [userName,setUserName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()

    const token=localStorage.getItem("token")

    useEffect(()=>{
      if(token){
        navigate("/")
      }
    },[navigate])

  const CreateAccount=async(e)=>{
    e.preventDefault()
      if(!userName||!email||!password){
        toast.error("Invalid login registered")
        return
      }

      setLoading(true)

      const user={
        userName:userName,
        email:email,
        password:password,
      }

      try {
        const {data}=await axiosRequest.post('/Account/register/user',user)

        if(data?.token){
          localStorage.setItem("token",data.token)
          toast.success("Login Successfully")
          navigate("/")
        }else{
          toast.error("Invalid response from server.")
        }
      } catch (error) {
        console.error("Login error:", error.message);
        toast.error(error.message)
      }finally{
        setLoading(false)
      }
  }

  
  return (
    <div className={`max-h-screen pt-10 pb-10 flex items-center justify-center ${theme?"bg-gray-900":"bg-gray-100"}`}>
          <Box className={`w-full max-w-md  rounded-2xl shadow-lg p-8 ${theme ? "bg-gray-800":" bg-white"}`}>
                <h1 className={`text-2xl font-bold ${theme ? "text-white":" text-gray-900"}`}>Create an account</h1>
                 <p className={`${theme?"text-gray-400":"text-gray-500 "} text-sm mt-2`}>Enter your details below</p>

                 <form className="mt-6 flex flex-col gap-4" onSubmit={CreateAccount}>
                       <input min={7} onChange={e=>setUserName(e.target.value)} type="text" placeholder="UserName" className={`w-full px-4 py-2 border ${theme?"border-gray-600 bg-gray-700 placeholder-gray-400 text-gray-100":"border-gray-300 bg-white placeholder-gray-500 text-gray-900"} rounded-lg  focus:ring-2 focus:ring-red-500 outline-none`} required/> 
                       <input min={15} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email or phone number" className={`w-full px-4 py-2 border ${theme?"border-gray-600 bg-gray-700 placeholder-gray-400 text-gray-100":"border-gray-300 bg-white placeholder-gray-500 text-gray-900"} rounded-lg  focus:ring-2 focus:ring-red-500 outline-none`} required/> 

                        <Box className="relative">
                             <input required onChange={e=>setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Password" className={`w-full px-4 py-2  border ${theme?"border-gray-600 bg-gray-700 placeholder-gray-400 text-gray-100":"border-gray-300 bg-white placeholder-gray-500 text-gray-900"} rounded-lg  focus:ring-2 focus:ring-red-500 outline-none`}/> 
                              {password&&
                              <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute inset-y-0 right-3 flex items-center cursor-pointer ${theme?"text-gray-300":"text-gray-500"}`}>
                                  {showPassword?<EyeOff size={18} />:<Eye size={18} />}
                              </button>}
                        </Box>
                         <button type="submit" className="w-full bg-red-500 text-white font-medium py-2 rounded-lg hover:bg-red-600 transition">Create Account</button>

                       <div className="flex items-center gap-2 my-4">
                            <hr className={`flex-grow ${theme?"border-gray-400":"border-gray-300"}`} />
                            <span className={`${theme?"text-gray-500":"text-gray-400"} text-sm`}>or</span>
                             <hr className={`flex-grow ${theme?"border-gray-400":"border-gray-300"}`} />
                       </div>

                        <button type="button" className={`w-full border ${theme?"border-gray-600 text-gray-200 bg-gray-700 hover:bg-gray-600":"border-gray-300 text-gray-700 bg-white hover:bg-gray-50"} flex items-center justify-center gap-4 cursor-pointer py-2 rounded-lg transition`}>
                            <img src={google} alt="Google" className="w-5 h-5" />
                            <span>Sign up with Google</span>
                        </button>
                    </form>
        
                   <p className={`text-center text-sm ${theme?"text-gray-600":"text-gray-400 "} mt-6 flex justify-center gap-2 flex-wrap`}>
                        Already have an account?
                      <Link to="/login/sign-in" className="text-red-500 hover:underline font-medium">Log in</Link>
                  </p>
          </Box>
    </div>
  );
};

export default SignUp;
