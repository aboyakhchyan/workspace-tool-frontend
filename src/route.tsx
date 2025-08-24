import { createBrowserRouter } from "react-router-dom";
import {
  RegisterPage,
  LoginPage,
  WorkspacePage,
  WorkspacesPage,
  ProfilePage,
  NotFound,
  ErrorBoundary,
} from "@pages";
import { ROUTES } from "./constants";
import { DashboardLayout, PublicLayout } from "@layouts";

export const routes = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <PublicLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <RegisterPage />,
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: ROUTES.DASHBOARD,
    element: <DashboardLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        path: ROUTES.WORKSPACES,
        element: <WorkspacesPage />,
      },
      {
        path: ROUTES.WORKSPACE(),
        element: <WorkspacePage />,
      },
      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFound />,
  },
]);
