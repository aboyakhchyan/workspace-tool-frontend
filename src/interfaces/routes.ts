export interface IRoute {
  REGISTER: string;
  LOGIN: string;
  PROFILE: string;
  DASHBOARD: string;
  WORKSPACE: (slug?: string) => string;
  WORKSPACES: string;
  NOT_FOUND: string;
}
