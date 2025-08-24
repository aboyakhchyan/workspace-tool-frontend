import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import { COLORS } from "../../constants";
import env from "../../env";
import { Link } from "react-router-dom";

interface IProps {
  fullName: string;
  picture?: string;
}

const Header: React.FC<IProps> = ({ fullName, picture }) => {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: COLORS.YELLOW, 
        boxShadow: "none",
        paddingX: 2
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography 
          variant="h6" 
          sx={{ fontWeight: "bold", color: "white" }}
        >
          Workspace Tool
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography 
            variant="h6" 
            sx={{ fontWeight: 'bold', color: "white" }}
          >
            {fullName}
          </Typography>
          <Avatar
            component={Link}
            to="/dashboard/profile"
            sx={{ cursor: "pointer", width: 40, height: 40 }}
            src={picture ? env.API_URL + '/' + picture : "/images/user.png"}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
