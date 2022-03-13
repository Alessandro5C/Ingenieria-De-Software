import { ActionType, SetId, SetLogged, UserActions } from "./useractions";
import { UserState } from "./userstate";

export function userReducer(state: UserState, action: UserActions) : UserState {
    switch (action.type){
        case ActionType.SetId:
            return {
                ...state,
                id: action.payload
            }
        case ActionType.SetLogged:
            return {
                ...state,
                logged: action.payload
            }
        default:
            return state;
    }
}

// helper functions to simplify the caller
export const setId = (id: string): SetId => ({
    type: ActionType.SetId,
    payload: id,
});

export const setLogged = (logged: boolean): SetLogged => ({
    type: ActionType.SetLogged,
    payload: logged
});