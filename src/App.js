// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeTemplate from "./templates/Home/HomeTemplate";
import Home from "./pages/Home/Home";
import DashboardTemplate from "./templates/Dashboard/DashboardTemplate";

// slick carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SignIn from "./pages/Login/SignIn";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomeTemplate />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
          </Route>
          <Route exact path="/user/signin" element={<SignIn />} />
          <Route exact path="/admin" element={<DashboardTemplate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
