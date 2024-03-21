import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@context/appContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate("/login");

      return;
    }
  }, [navigate, user]);

  return children;
};

export default ProtectedRoute;
