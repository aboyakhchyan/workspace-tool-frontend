import { Button, styled } from "@mui/material";
import { COLORS } from "../../constants";

export const NavigationButton = styled(Button)({
  border: "2px solid white",
  color: "white",
  fontWeight: "bold",
});

export const PrimaryButton = styled(Button)({
  backgroundColor: COLORS.YELLOW,
  color: 'white',
  height: '56px'
});
