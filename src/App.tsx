import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./screens/home/home-page";
import LoginPage from "./auth/auth";
import FrontPage from "./screens/front-page";
import RegisterPage from "./screens/register";
import Rentals from "./screens/Rental/Rentals";
import Account from "./screens/account/account";
import Tenants from "./screens/tenants/tenant-in";
import House from "./screens/house/house";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/tenants" element={<Tenants />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/account" element={<Account />} />
        <Route path="/house" element={<House />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
