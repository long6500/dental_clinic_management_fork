import Navbarr from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login_UI/login";
import Homepage_ui from "./home_ui/homepage";
import Medicine from "./pages/Medicine/Medicine";
import { useSelector } from "react-redux";
import "./css/App.scss";
import LoadingComponent from "./components/loadingComponent";
import UpdateMedicineModal from "./pages/Medicine/UpdateMedicineModal";
import Service from "./pages/Services/Service";
import Profile from "./profile/profile"
import Changepassword from "./profile/changpassword";
import Forgotpassword from "./login_UI/forgotpassword";
import Customer from "./customer/listCustomer";
function App() {
  const isLoading = useSelector((state) => state.loading);
  return (
    <>
      <LoadingComponent isLoading={isLoading} />
      <Router>
        <Navbarr />
        <Routes>
         <Route path="/Forgotpassword" element={<Forgotpassword />} />
          <Route path="/ChangePassword" element={<Changepassword />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/medicine" element={<Medicine />}></Route>
          <Route path="/medicine/:_id" element={<UpdateMedicineModal />} />
          <Route path="/pathological" element={<Service />}></Route>
          <Route path="/Customer" element={<Customer />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
