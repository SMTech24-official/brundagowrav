import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardLayout from "../components/layouts/Dashboard";
import UnderConstruction from "../components/others/underConstructions";
import SignInPage from "../components/signIn/SignIn";

const RouterProvider: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/my-ai-assistant" element={<DashboardLayout />}>
          <Route
            index={true}
            element={<UnderConstruction name="my-ai-assistant" />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default RouterProvider;
