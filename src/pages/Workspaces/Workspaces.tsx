import {
  Box,
  ClickAwayListener,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState, type FormEvent } from "react";
import { PrimaryButton, SharedModal, WorkspaceList } from "@components";
import { useDebounce } from "../../hooks";
import { Axios } from "../../configs/axios";
import { AxiosError } from "axios";
import { workspaceNameSchema } from "../../configs/joi.schema";
import type { IWorkspace } from "../../types";
import env from "../../env";

const WorkspacesPage: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [validSlug, setValidSlug] = useState<string>("");
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const value = useDebounce(text, 500);
  const positionTop = buttonRef.current?.getBoundingClientRect().top;
  const positionLeft = buttonRef.current?.getBoundingClientRect().left;

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!value) return;

    const searchValidSlug = async () => {
      try {
        const response = await Axios.get(
          env.API_URL + env.API_PREFIX + "/workspace/search/slug?name=" + value
        );

        setValidSlug(response.data);
        setSelectedSlug(response.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.message);
        }
      }
    };

    searchValidSlug();
  }, [value]);

  const handleCreateWorkspace = async (evt: FormEvent) => {
    evt.preventDefault();

    try {
      const response = await Axios.post(
        env.API_URL + env.API_PREFIX + "/workspace/create/slug",
        { name: text, slug: selectedSlug }
      );

      setSelectedSlug('')
      setText('')
      setWorkspaces([...workspaces, response.data]);
    } catch (err) {}
  };

  useEffect(() => {
    const findWorkspaces = async () => {
      try {
        const response = await Axios.get(
          env.API_URL + env.API_PREFIX + "/workspace/all"
        );

        setWorkspaces(response.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err);
        }
      }
    };

    findWorkspaces();
  }, []);

  return (
    <Box sx={{ position: "relative", display:'flex', flexDirection: 'column', gap: 10,  mt: "50px" }}>
      <PrimaryButton sx={{width: '200px'}} ref={buttonRef} onClick={handleOpen}>
        Create Workspace
      </PrimaryButton>

      <WorkspaceList workspaces={workspaces} onSetWorkspaces={setWorkspaces}/>

      {isOpen && (
        <SharedModal top={positionTop} left={positionLeft}>
          <ClickAwayListener onClickAway={handleClose}>
            <Box
              onSubmit={handleCreateWorkspace}
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                width: "400px",
                height: "300px",
                p: 3,
              }}
            >
              <TextField
                fullWidth
                value={text}
                onChange={(evt) => setText(evt.target.value)}
                label="Name"
                variant="filled"
                helperText={workspaceNameSchema.validate(text).error?.message}
              />
              <Select
                fullWidth
                value={selectedSlug}
                label="Slug"
                MenuProps={{
                  disablePortal: true,
                }}
                onChange={(evt) => setSelectedSlug(evt.target.value as string)}
              >
                <MenuItem value={validSlug}>{validSlug}</MenuItem>
              </Select>
              <PrimaryButton type="submit" sx={{ border: "1px solid white" }}>
                Create
              </PrimaryButton>
            </Box>
          </ClickAwayListener>
        </SharedModal>
      )}
    </Box>
  );
};

export default WorkspacesPage;
