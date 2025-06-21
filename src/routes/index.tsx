import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardLayout from "../components/layouts/Dashboard";
import UnderConstruction from "../components/others/underConstructions";
import SignInPage from "../components/signIn/SignIn";
import NotFound from "../components/notFound/NotFound";

const RouterProvider: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignInPage />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index={true} element={<UnderConstruction name="Dashboard" />} />
                    <Route path="booking-list" element={<UnderConstruction name="Booking List" />} />
                    <Route index element={<UnderConstruction name="Service" />} />
                    <Route path="add-service" element={<UnderConstruction name="Add Service" />} />
                    <Route path="all-service" element={<UnderConstruction name="All Services" />} />
                    <Route index element={<UnderConstruction name="Locations" />} />
                    <Route path="add-location" element={<UnderConstruction name="Add Location" />} />
                    <Route path="all-location" element={<UnderConstruction name="All Locations" />} />
                    <Route index element={<UnderConstruction name="Clinicians" />} />
                    <Route path="add-clinicians" element={<UnderConstruction name="Add Clinician" />} />
                    <Route path="all-clinicians" element={<UnderConstruction name="All Clinicians" />} />
                    <Route index element={<UnderConstruction name="Blog" />} />
                    <Route path="post1" element={<UnderConstruction name="Add Blogs" />} />
                    <Route path="post2" element={<UnderConstruction name="All Blogs" />} />

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default RouterProvider;