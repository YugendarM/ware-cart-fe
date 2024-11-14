import axios from "axios"  
import React, { useEffect, useState } from "react"  
import { Outlet, Navigate } from "react-router-dom"  
import useUserContext from "../../hooks/useUserContext"

const LoginProtectedRoutes = () => {
  const [user, setUser] = useState(null)   
  // const [loading, setLoading] = useState(true)   
  
  const {isUserLoggedIn, userProfile} = useUserContext()

  // if (loading) {
  //   return <div className="flex justify-center items-center w-screen h-screen">
  //               <div className="animate-spin rounded-full h-16 w-16 border-[6px] border-blue-500 border-b-gray-300"></div>
  //           </div>    
  // }

  return isUserLoggedIn ? <Outlet /> : <Navigate to="/login" />  
}  

export default LoginProtectedRoutes  
