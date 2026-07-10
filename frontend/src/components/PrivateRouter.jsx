import {Navigate, Outlet} from "react-router-dom";

const isAuthentication = () => !!localStorage.getItem("access_token");

export default function PrivateRouter({redirectTo = "/login"}) {
    return isAuthentication() ? <Outlet /> : <Navigate to={redirectTo} replace />;
}    
