import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainChat from "../components/chat/MainChat";
import DashboardLayout from "../components/layouts/Dashboard";
import SignInPage from "../components/signIn/SignIn";
import SignUpPage from "../components/signUp/signUp";

const RouterProvider: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/my-ai-assistant" element={<DashboardLayout />}>
          <Route index={true} element={<MainChat />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RouterProvider;
