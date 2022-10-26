import { Outlet,Navigate  } from "react-router-dom";
import useAuth from "../../components/hooks/useAuth";
import React from 'react';
export default function PrivateRoute() {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="login" />
   return <Outlet />
  }