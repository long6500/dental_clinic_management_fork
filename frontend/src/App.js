import Navbarr from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login_UI/login";
import Homepage_ui from "./home_ui/homepage";
import Medicine from "./pages/Medicine/Medicine";
import { useSelector } from "react-redux";

import './css/App.scss'
import LoadingComponent from './components/loadingComponent'

function App() {

  const isLoading = useSelector(state => state.loading)

  return (
    <>
    <LoadingComponent isLoading={isLoading}/>
    <Router>
      <Navbarr />
      <Routes>
        <Route path="/Login" element={<Login />} />
        {/* <Route path="/homepage" element={<Homepage_ui />} /> */}
        <Route path="/medicine" element={<Medicine/>}></Route>
        {/* <Route path="/" element={<Navbarr />}></Route> */}
        
      </Routes>
    </Router>
    </>
  );
}

export default App;
