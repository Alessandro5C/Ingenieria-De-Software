export enum ActionType {
    SetId,
    SetLogged
}

export interface SetId {
    type: ActionType.SetId;
    payload: string;
}

export interface SetLogged {
    type: ActionType.SetLogged;
    payload: boolean;
}

export type UserActions = SetId | SetLogged;
