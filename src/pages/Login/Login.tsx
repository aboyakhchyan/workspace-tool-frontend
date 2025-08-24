import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { PrimaryButton } from "../../components";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginSchema } from "../../configs/joi.schema";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../configs/axios";
import env from "../../env";
import { AxiosError } from "axios";

type LoginForm = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm>({
    resolver: joiResolver(loginSchema),
  });
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (data: LoginForm) => {
    try {
      setIsLoading(true);
      const response = await Axios.post(
        `${env.API_URL}${env.API_PREFIX}/auth/login`,
        data
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/dashboard/workspaces");
      setErrorMsg("");
      reset();
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrorMsg(err.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: { xs: "calc(100vh - 100px)", md: "100vh" },
      }}
    >
      <Box
        onSubmit={handleSubmit(handleLogin)}
        sx={{ display: "flex", flexDirection: "column", gap: 5, width: "50%" }}
        component={"form"}
      >
        <TextField
          {...register("email")}
          label="Email"
          type="search"
          variant="filled"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          {...register("password")}
          label="Password"
          type="password"
          variant="filled"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <PrimaryButton type="submit">
          {isLoading ? (
            <CircularProgress size={30} sx={{ color: "white" }} />
          ) : (
            "SIGN IN"
          )}
        </PrimaryButton>
        {errorMsg && (
          <Typography component="p" sx={{ color: "red" }}>
            {errorMsg}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default LoginPage;
