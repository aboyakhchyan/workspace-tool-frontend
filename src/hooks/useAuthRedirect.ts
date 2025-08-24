import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";

const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate(ROUTES.DASHBOARD + "/" + ROUTES.WORKSPACES, { replace: true });
    }
  }, [navigate]);
};

export default useAuthRedirect;
