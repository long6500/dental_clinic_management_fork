import Navbarr from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login_UI/login";
import Homepage_ui from "./home_ui/homepage";
import Medicine from "./components/Medicine/Medicine";
function App() {
  return (
    <Router>
      <Navbarr />
      <Routes>
        <Route path="/Login" element={<Login />} />
        {/* <Route path="/homepage" element={<Homepage_ui />} /> */}
        <Route path="/medicine" element={<Medicine/>}></Route>
        {/* <Route path="/" element={<Navbarr />}></Route> */}
        
      </Routes>
    </Router>
  );
}

export default App;
