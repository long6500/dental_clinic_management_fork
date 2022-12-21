import { Outlet, Navigate } from "react-router-dom";
import React from 'react';
import DashBoardTech from "../pages/dashBoard/dashBoardtechnicians";
import DashBoardDoctor from "../pages/dashBoard/dashBoardDoctor";
import Receptionist from "../pages/Receptionist/Receptionist";
import DashBoard from "../pages/dashBoard/dashBoard";

const findRole = (data, name) => {
    let temp =false;
    data.role.forEach(element => {
        if (element.name === name) temp = true;
    });
    return temp;
};

export default function HomeRoute({ user }) {
    if (user.role[0].name === "Admin") {
        return <DashBoard user={user}/>
    }
    if (findRole(user, "Lễ tân")) {
        return <Receptionist user={user}/>
    }
    if (findRole(user, "Bác sĩ")) {
        return <DashBoardDoctor user={user}/>
    }
    return <DashBoardTech user={user}/>
}