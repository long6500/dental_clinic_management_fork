import { Outlet,Navigate  } from "react-router-dom";
import React from 'react';
import useAuth from "../../components/hooks/useAuth";
export default function GuestRoute() {
    const { isAuthenticated } = useAuth();
  
    if (isAuthenticated) return <Navigate to={"/"} replace />
  
    return <Outlet />
  }