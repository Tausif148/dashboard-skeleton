


import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, menuName }: any) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Superadmin → allow all
    if (user?.role === "superadmin") {
        return children;
    }

    const menus = JSON.parse(localStorage.getItem("menus") || "[]");

    const hasAccess = menus.some(
        (m: any) => m.menu_name === menuName
    );

    return hasAccess ? children : <Navigate to="/dashboard" />;
};

export default ProtectedRoute;