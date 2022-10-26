import Navbarr from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login_UI/login";
import Medicine from "./pages/Medicine/Medicine";
import { useSelector } from "react-redux";
import "./css/App.scss";
import LoadingComponent from "./components/loadingComponent";
import UpdateMedicineModal from "./pages/Medicine/UpdateMedicineModal";
import Service from "./pages/Services/Service";
import Profile from "./profile/profile";
import Changepassword from "./profile/changpassword";
import Forgotpassword from "./login_UI/forgotpassword";
import Customer from "./customer/listCustomer";
import PrivateRoute from "./components/Route/PrivateRoute";
import GuestRoute from "./components/Route/GuestRoute";
import axios from "../src/apis/api";
import React from 'react';
export const AuthContext = React.createContext();
function App() {
  const isLoading = useSelector((state) => state.loading);
  const [userInfo, setUserInfo] = React.useState({
    status: "idle",
    data: null,
  });

  const verifyUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUserInfo({ status: "success", data: null });
      return;
    }

    try {
      const res = await axios.get("/api/auth/verify");
      if (res.success) {
        setUserInfo({ status: "success", data: res.data });
      } else {
        setUserInfo({ status: "success", data: null });
      }
    } catch (err) {
      setUserInfo({ status: "success", data: null });
    }
  };
  
  const login =({username,_id,token})=>{
    localStorage.setItem('token',token)
    setUserInfo({status:"success",data:{username,_id,}})
  }
  const logout = ()=>{
     localStorage.removeItem('token')
     setUserInfo({status:"success",data:null})
}
  React.useEffect(() => {
    verifyUserInfo();
  }, []);

  if (userInfo.status === "idle" || userInfo.status === "loading")
    return <div>Loading...</div>;

  if (userInfo.status === "error") return <div>Error</div>;

  return (
    <>
    <AuthContext.Provider value={{user: userInfo.data,login,logout}}>
      <LoadingComponent isLoading={isLoading} />
      <Router>
        <Navbarr />

        <Routes>

          <Route element={<GuestRoute user={userInfo.data} />}>

            <Route path="/Login" element={<Login />} />
            <Route path="/Forgotpassword" element={<Forgotpassword />} />

          </Route>

          <Route element={<PrivateRoute user={userInfo.data} />}>
            
            <Route path="/ChangePassword" element={<Changepassword />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/medicine" element={<Medicine />}></Route>
            <Route path="/medicine/:medId" element={<UpdateMedicineModal />} />
            <Route path="/pathological" element={<Service />}></Route>
            <Route path="/Customer" element={<Customer />}></Route>

          </Route>
        </Routes>


      </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
