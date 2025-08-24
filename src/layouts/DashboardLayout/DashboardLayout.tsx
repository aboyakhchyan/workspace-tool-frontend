import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "@components";
import { AxiosError } from "axios";
import { Axios } from "../../configs/axios";
import env from "../../env";
import type { IUser } from "../../types/user";
import { ROUTES } from "../../constants";

const DashboardLayout: React.FC = () => {
  const [profile, setProfile] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await Axios.get(
          env.API_URL + env.API_PREFIX + "/user/@me"
        );

        setProfile(() => response.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.status === 401) {
            navigate(ROUTES.LOGIN);
          }
        }
      }
    };

    getProfile();
  }, []);

  return (
    <Box>
      <Header {...profile}/>
      <Outlet context={{profile, onSetProfile: setProfile}}/>
    </Box>
  );
};

export default DashboardLayout;
