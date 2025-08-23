import type { IRoute } from "../interfaces";

export const ROUTES: IRoute = {
  REGISTER: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  PROFILE: "profile",
  WORKSPACE: (slug = ":slug") => `workspace/${slug}`,
  WORKSPACES: "workspaces",
  NOT_FOUND: "*",
} as const;
