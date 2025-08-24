import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import React from "react";
import type { IWorkspace } from "../../types";
import { COLORS } from "../../constants";
import { AxiosError } from "axios";
import { Axios } from "../../configs/axios";
import { useNavigate } from "react-router-dom";
import env from "../../env";

interface IProps {
  workspaces: IWorkspace[];
  onSetWorkspaces: (state: IWorkspace[]) => void;
}

const WorkspaceList: React.FC<IProps> = ({ workspaces, onSetWorkspaces }) => {
  const navigate = useNavigate();

  const handleDeleteWorkspace = async (
    evt: React.MouseEvent<HTMLButtonElement>,
    id?: number
  ) => {
    evt.stopPropagation();
    try {
      const response = await Axios.delete(
        env.API_URL + env.API_PREFIX + "/workspace/delete/" + id
      );

      onSetWorkspaces(
        workspaces.filter((workspace) => workspace.id !== response.data.id)
      );
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.message);
      }
    }
  };

  return (
    <Grid container size={12} spacing={5} sx={{ width: "100%" }}>
      {workspaces.map((workspace) => (
        <Grid
          size={3}
          key={workspace.id}
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/dashboard/workspace/${workspace.slug}`)}
        >
          <Card sx={{ minHeight: 100, backgroundColor: COLORS.YELLOW }}>
            <CardContent>
              <Typography variant="h6">Name: {workspace.name}</Typography>
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 2 }}
                onClick={(evt) => handleDeleteWorkspace(evt, workspace.id)}
              >
                x
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default WorkspaceList;
