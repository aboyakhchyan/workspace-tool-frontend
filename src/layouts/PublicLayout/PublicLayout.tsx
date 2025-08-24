import { Grid } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { NavigationButton } from "@components";
import { COLORS, ROUTES } from "../../constants";
import { useAuthRedirect } from "../../hooks";

const PublicLayout: React.FC = () => {
  useAuthRedirect();

  return (
    <Grid container size={12}>
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          backgroundColor: COLORS.YELLOW,
          height: { xs: "100px", md: "100vh" },
        }}
      >
        <NavigationButton component={Link} to={ROUTES.HOME}>
          SIGN UP
        </NavigationButton>
        <NavigationButton component={Link} to={ROUTES.LOGIN}>
          SIGN IN
        </NavigationButton>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default PublicLayout;
