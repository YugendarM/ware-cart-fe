import axios from "axios"  
import React, { useEffect, useState } from "react"  
import { Outlet, Navigate } from "react-router-dom"  
import useUserContext from "../../hooks/useUserContext"

const LogoutProtectedRoutes = () => {
  
  const {isUserLoggedIn} = useUserContext()

  return !isUserLoggedIn ? <Outlet /> : <Navigate to="/" />  
}  

export default LogoutProtectedRoutes  
