import { useLocation } from "react-router-dom";

const useIsCertainRoute = (path) => {
  const location = useLocation();

  return location.pathname.startsWith(path);
};

export default useIsCertainRoute;
