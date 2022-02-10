import { ApplicationUserLogin } from "../models/aplication-user-login";

export enum ActionType {
    AddUserLogin
}

export interface AddUserLogin {
    type: ActionType.AddUserLogin;
    payload: ApplicationUserLogin;
}

export type LoginActions = AddUserLogin;