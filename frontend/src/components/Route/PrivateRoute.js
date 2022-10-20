import { Outlet,Navigate  } from "react-router-dom";
// import useAuth from '../../hooks/useAuth';
// import React from 'react';
export default function PrivateRoute({ user }) {
    // const { user } = useAuth();
    if (!user) return <Navigate to="login" />
  
    return <Outlet />
  }