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
import ProductDetail from "./components/ProductDetail/ProductDetail";
import SignUp from "./pages/Login/SignUp";
import DrawerHOC from "./HOC/DrawerHOC";
import CategoryTemplate from "./templates/Category/CategoryTemplate";
import Cart from "./pages/Cart/Cart";
import UserProfile from "./pages/UserProfile/UserProfile";
import SearchProductTemplate from "./templates/SearchProduct/SearchProductTemplate";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DrawerHOC />
        <Routes>
          <Route exact path="/" element={<HomeTemplate />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route
              exact
              path="/productdetail/:id"
              element={<ProductDetail />}
            />
            <Route
              exact
              path="/category/:category_id"
              element={<CategoryTemplate />}
            />
            <Route
              exact
              path="/search/:keyword/:category_id"
              element={<SearchProductTemplate />}
            />
          </Route>
          <Route exact path="/users/signin" element={<SignIn />} />
          <Route exact path="/users/signup" element={<SignUp />} />
          <Route exact path="/users/:id" element={<UserProfile />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/admin" element={<DashboardTemplate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
