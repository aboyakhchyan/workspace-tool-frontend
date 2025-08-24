import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { PrimaryButton } from "../../components";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { registerSchema } from "../../configs/joi.schema";
import { AxiosError } from "axios";
import { Axios } from "../../configs/axios";
import env from "../../env";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";

type RegisterForm = {
  fullName: string;
  email: string;
  password: string;
};

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterForm>({
    resolver: joiResolver(registerSchema),
  });
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = async (data: RegisterForm) => {
    try {
      setIsLoading(true);
      await Axios.post(`${env.API_URL}${env.API_PREFIX}/auth/register`, data);

      navigate(ROUTES.LOGIN);
      setErrorMsg('');
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
        onSubmit={handleSubmit(handleRegister)}
        sx={{ display: "flex", flexDirection: "column", gap: 5, width: "50%" }}
        component={"form"}
      >
        <TextField
          {...register("fullName")}
          label="Full Name"
          type="search"
          variant="filled"
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
        />
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
            "SIGN UP"
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

export default RegisterPage;
