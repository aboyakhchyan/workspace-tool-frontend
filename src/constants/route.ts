import type { IRoute } from "../interfaces";

export const ROUTES: IRoute = {
  HOME: '/',
  REGISTER: "/register",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  PROFILE: "profile",
  WORKSPACE: (slug = ":slug") => `workspace/${slug}`,
  WORKSPACES: "workspaces",
  NOT_FOUND: "*",
} as const;
