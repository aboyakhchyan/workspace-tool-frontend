import React from "react";
import { Box, styled, Typography } from "@mui/material";

const Container = styled(Box)({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  bgcolor: "background.default",
  textAlign: "center",
  p: 2,
});

const NotFound: React.FC = () => {
  return (
    <Container>
      <Typography variant="h1" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Sorry, the page you are looking for does not exist.
      </Typography>
    </Container>
  );
};

export default NotFound;
