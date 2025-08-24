import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../configs/axios";
import env from "../../env";
import type { IWorkspace } from "../../types";

const WorkspacePage: React.FC = () => {
  const { slug } = useParams();
  const [workspace, setWorkspace] = useState<IWorkspace | null>(null);

  useEffect(() => {
    const findWorkspace = async () => {
      try {
        const response = await Axios.get(
          env.API_URL + env.API_PREFIX + "/workspace/" + slug
        );

        setWorkspace(response.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.message);
        }
      }
    };

    findWorkspace();
  }, []);
  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ mb: 3, backgroundColor: "#f5f5f5" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {workspace?.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Slug: {workspace?.slug}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" sx={{ mb: 1 }}>
        Members:
      </Typography>

      <Grid container spacing={2}>
        {(workspace?.members?.length || 0) > 0 &&
          workspace?.members.map((member) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={member.id}>
              <Card sx={{ backgroundColor: "#fff7e6" }}>
                <CardContent>
                  <Typography>Name: {member.user.fullName}</Typography>
                  <Typography>Email: {member.user.email}</Typography>
                  <Typography>Role: {member.role}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default WorkspacePage;
