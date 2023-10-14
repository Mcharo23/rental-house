import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./screens/home/home-page";
import Rentals from "./screens/Rental/Rentals";
import Account from "./screens/account/account";
import Tenants from "./screens/tenants/tenant";
import House from "./screens/house/house-page";
import Contracts from "./screens/tenants/contract";
import AuthenticationForm from "./screens/auth/authentication-form";
import EntertainmentPage from "./screens/entertainment/entertainment-page";
import { ServerOverload } from "./screens/error/server-error";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntertainmentPage />} />
        <Route path="/auth" element={<AuthenticationForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/error" element={<ServerOverload />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
