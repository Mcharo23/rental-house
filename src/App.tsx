import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./screens/home/home-page";
import LoginPage from "./auth/auth";
import FrontPage from "./screens/front-page";
import RegisterPage from "./screens/register";
import Rentals from "./screens/Rentals/Rentals";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/rentals" element={<Rentals/>} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
