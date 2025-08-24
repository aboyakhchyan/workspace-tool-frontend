import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  styled,
  TextField,
} from "@mui/material";
import React, {
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { IOutletContext } from "../../types";
import EditIcon from "@mui/icons-material/Edit";
import { PrimaryButton } from "../../components";
import env from "../../env";
import { COLORS, ROUTES } from "../../constants";
import { Axios } from "../../configs/axios";

interface ILoading {
  inputLoading: boolean;
  imageLoading: boolean;
}

const ProfilePictureBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  bottom: "15%",
  left: "8%",
  width: 30,
  height: 30,
  borderRadius: "50%",
  backgroundColor: COLORS.YELLOW,
  border: "1px solid white",
  zIndex: 1,
});

const ProfilePage: React.FC = () => {
  const { profile, onSetProfile } = useOutletContext<IOutletContext>();
  const [fullName, setFullName] = useState(profile?.fullName || "");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState<ILoading>({
    inputLoading: false,
    imageLoading: false,
  });
  const navigate = useNavigate();

  const handleUploadPicture = async (evt: ChangeEvent) => {
    evt.preventDefault();
    const form = new FormData();
    const file = inputRef.current?.files?.[0] as File;

    form.append("file", file);

    setIsLoading({ ...isLoading, imageLoading: true });
    const response = await Axios.patch(
      env.API_URL + env.API_PREFIX + "/user/@me/update/picture",
      form
    );

    onSetProfile({ ...profile!, picture: response.data.payload });
    try {
    } catch (err) {
      console.log("something went wrong");
    } finally {
      setIsLoading({ ...isLoading, imageLoading: false });
    }
  };

  const handleUpdateProfile = async (evt: FormEvent) => {
    evt.preventDefault();

    try {
      setIsLoading({ ...isLoading, inputLoading: true });
      const response = await Axios.patch(
        env.API_URL + env.API_PREFIX + "/user/@me/update",
        { fullName }
      );

      onSetProfile({ ...profile!, fullName: response.data.fullName });
    } catch (err) {
      console.log("something went wrong");
    } finally {
      setIsLoading({ ...isLoading, inputLoading: false });
    }
  };

  const handleLogout = async () => {
    try {
      await Axios.post(env.API_URL + env.API_PREFIX + "/auth/logout");
      localStorage.removeItem("accessToken");

      navigate(ROUTES.LOGIN);
    } catch {
      console.log("something went wrong");
    }
  };

  return (
    <Box sx={{ display: "flex", padding: 5, boxShadow: "border-box" }}>
      <Grid
        container
        size={12}
        sx={{ height: "calc(100vh - 200px)", width: "100%" }}
      >
        <Grid container size={{ xs: 12, sm: 12, md: 6 }}>
          <Grid
            container
            onSubmit={handleUpdateProfile}
            component={"form"}
            size={12}
            sx={{ height: "max-content" }}
          >
            <Grid size={10}>
              <TextField
                fullWidth
                onChange={(evt) => setFullName(evt.target.value)}
                type="search"
                variant="filled"
                defaultValue={profile?.fullName}
              />
            </Grid>
            <Grid size={2}>
              <PrimaryButton type="submit" fullWidth>
                {isLoading.inputLoading ? (
                  <CircularProgress size={30} sx={{ color: "white" }} />
                ) : (
                  "Save"
                )}
              </PrimaryButton>
            </Grid>
          </Grid>
          <TextField
            disabled
            fullWidth
            onChange={(evt) => setFullName(evt.target.value)}
            type="search"
            variant="filled"
            defaultValue={profile?.email}
          />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          size={{ xs: 12, sm: 12, md: 6 }}
        >
          <Box sx={{ position: "relative" }}>
            <Avatar
              sx={{ width: 400, height: 400, objectFit: "cover" }}
              src={
                profile?.picture
                  ? env.API_URL + "/" + profile.picture
                  : "/images/user.png"
              }
            />
            <ProfilePictureBox>
              <input
                onChange={handleUploadPicture}
                ref={inputRef}
                type="file"
                style={{ display: "none" }}
              />
              {isLoading.imageLoading ? (
                <CircularProgress size={15} sx={{ color: "white" }} />
              ) : (
                <EditIcon
                  onClick={() => inputRef.current?.click()}
                  sx={{ color: "white", cursor: "pointer" }}
                />
              )}
            </ProfilePictureBox>
          </Box>
        </Grid>
        <PrimaryButton onClick={handleLogout}> {"< Logout"}</PrimaryButton>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
