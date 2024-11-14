import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from "../../assets/warecart_logo.png"
import useUserContext from '../../hooks/useUserContext';
import axios from 'axios';

const NavbarComponent = () => {
  const { userProfile, isUserLoggedIn, setIsUserLoggedIn, setUserProfile } = useUserContext();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true); // New state to handle loading

  const getUserDetails = async () => {
    try {
      console.log("Fetching user details...");
      const response = await axios.get("/user/getUserDetails", { withCredentials: true });
      console.log("Response data:", response.data);

      if (response.status === 200 && response.data.userData) {
        setIsUserLoggedIn(true);
        setUserProfile(response.data.userData);
        console.log("User profile successfully updated:", response.data.userData);
      } else {
        setIsUserLoggedIn(false);
      }
    } catch (error) {
      console.error("Error fetching user details:", error.response || error);
      setIsUserLoggedIn(false);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  // Adjust the useEffect to re-run when specific dependencies change
  useEffect(() => {
    getUserDetails();
  }, []); // Only runs once when the component mounts

  // Add a separate effect to log state changes
  useEffect(() => {
    console.log("Updated user profile:", userProfile);
    console.log("Updated isUserLoggedIn:", isUserLoggedIn);
  }, [userProfile, isUserLoggedIn]); // Runs whenever userProfile or isUserLoggedIn changes

  return (
    <div className={`z-30 w-full flex px-5 md:px-20 lg:px-56 py-2 items-center justify-between ${pathname === "/" ? null : "bg-blue-50"}`}>
      <Link to={"/"}>
        <img src={logo} className='h-20 w-20' />
      </Link>
      <div>
        <nav className='md:flex items-center gap-8 hidden'>
          <Link to={"/"} className={`text-lg font-medium py-2 transition ${pathname === "/" ? "text-blue-600 " : "text-gray-800 border-none"}`}>Home</Link>
          <Link to={"/products"} className={`text-lg font-medium py-2 transition ${pathname.includes("/products") ? "text-blue-600 " : "text-gray-800 border-none"}`}>Products</Link>
          {
            loading ? (
              <p>Loading...</p> // Display a loading message while fetching user details
            ) : (
              isUserLoggedIn ? 
              <>
                <Link to={"/wishlist"} className={`text-lg font-medium py-2 transition ${pathname.includes("/wishlist") ? "text-blue-600 " : "text-gray-800 border-none"}`}>Wishlist</Link>
                <Link to={"/profile"} className={`text-lg font-medium py-2 transition ${pathname.includes("/profile") ? "text-blue-600 " : "text-gray-800 border-none"}`}>Profile</Link>
              </>
              :
              <>
                <Link to={"/login"} className={`text-lg font-medium py-2 transition ${pathname.includes("/login") ? "text-blue-600 " : "text-gray-800 border-none"}`}>Login</Link>
                <Link to={"/signup"} className={`text-lg font-medium py-2 transition ${pathname.includes("/signup") ? "text-blue-600 " : "text-gray-800 border-none"}`}>Signup</Link>
              </>
            )
          }
        </nav>
      </div>
    </div>
  );
};

export default NavbarComponent;
