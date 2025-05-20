import { selectUser } from "@/App/Redux/features/user/user.slice";
import { useAppSelector } from "@/App/Redux/hook";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

type TAuthProps = {
      children: ReactNode;
      access: 'admin' | 'user' | 'rider'
}
const Auth = ({ children, access }: TAuthProps) => {
      const user = useAppSelector(selectUser);
      const { pathname } = useLocation();
      if (!user || access !== user?.role) return <Navigate state={pathname} replace={true} to="/login" />



      return children;
};

export default Auth;