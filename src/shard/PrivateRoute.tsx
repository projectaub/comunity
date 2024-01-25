import { useAuthenticate } from "@/api/useAuthenticate";

import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  return useAuthenticate() ? <Outlet /> : <Navigate to="/" />;
};
