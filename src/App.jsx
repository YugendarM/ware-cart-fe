import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import RouterComponent from './components/RouterComponent/RouterComponent'
import NavbarComponent from './components/NavbarComponent/NavbarComponent'
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './context/userContext';

const App = () => {

  const initialOptions = {
      clientId: "AY-w0A-44cu0sngWn5ZmX8_TpVwxua_6LMJWm0YWyiVlJfY4m4TF76m8_ruRVOqg8W93Ag71XJijqx1X",
      currency: "USD",
      intent: "capture",
  };

  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
  return (
    <UserProvider>
      <PayPalScriptProvider options={initialOptions}>
        <BrowserRouter>
          <NavbarComponent/>
          <RouterComponent/>
        </BrowserRouter>
        <ToastContainer className="top-16"/>
      </PayPalScriptProvider>
    </UserProvider>
    
  )
}

export default App
