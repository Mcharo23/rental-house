import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./screens/home/home-page";
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
