import type { IUser } from "./user";

export interface IWorkspace {
  id?: number;
  name: string;
  slug: string;
  members: IMember[]
}

interface IMember {
  id: number;
  userId: number;
  workspaceId: number;
  role: string;
  user: IUser;
}
