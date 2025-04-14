import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

type ProtectedRouteProps = {
  redirectPath?: string;
  children?: React.ReactNode;
};

export default function ProtectedRoute({
  redirectPath = "/",
  children,
}: ProtectedRouteProps) {
  const { isAuth } = useAuthContext();

  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}
