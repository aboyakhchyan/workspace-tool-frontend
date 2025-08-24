import type { IUser } from "./user";

export interface IOutletContext {
    profile: IUser | null;
    onSetProfile: (state: IUser | null) => void
}