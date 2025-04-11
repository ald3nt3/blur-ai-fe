import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  isAuth: boolean;
  redirectPath?: string;
  children?: React.ReactNode;
};

export default function ProtectedRoute({
  isAuth,
  redirectPath = "/",
  children,
}: ProtectedRouteProps) {
    
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}
