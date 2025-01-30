import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = ({children}:{children:ReactNode}) => {
    const token = useAppSelector(selectCurrentToken)
    if(!token){
        toast.error("Login for further access", {duration: 3000})
        return <Navigate to="/login" state={location.pathname} replace={true}/>
    }
    return children
};

export default ProtectedRoute;