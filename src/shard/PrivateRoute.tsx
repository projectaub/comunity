import { useUserinfo } from "@/store/useUsers";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { login }: any = useUserinfo();

  return login ? <Outlet /> : <Navigate to="/" />;
};
