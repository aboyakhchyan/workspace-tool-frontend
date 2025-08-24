import React from "react";
import { Box, styled } from "@mui/material";
import { createPortal } from "react-dom";
import { COLORS } from "../../constants";

interface IProps {
  children: React.ReactNode;
  top?: number
  left?: number
}

const ModalBox = styled(Box)<{ top?: number; left?: number }>(({ top, left }) => ({
  position: 'absolute',
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  top,
  left: Number(left) + 200,
  backgroundColor: COLORS.YELLOW,
  width: "max-content",
  height: "max-content",
  boxShadow: "3px 5px 8px lightgray",
}));

const SharedModal: React.FC<IProps> = ({ children, top, left }) => {
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    throw new Error("Modal root not found");
  }

  return createPortal(<ModalBox top={top} left={left}>{children}</ModalBox>, modalRoot);
};

export default SharedModal;
