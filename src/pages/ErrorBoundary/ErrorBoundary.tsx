import React from "react";
import { Box, Typography, Button, styled } from "@mui/material";

const Container = styled(Box)({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
});

const ErrorBoundary: React.FC = () => {
  const handleReload = () => window.location.reload();

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Something went wrong
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        An unexpected error occurred. Please try reloading the page.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleReload}>
        Reload Page
      </Button>
    </Container>
  );
};

export default ErrorBoundary;
