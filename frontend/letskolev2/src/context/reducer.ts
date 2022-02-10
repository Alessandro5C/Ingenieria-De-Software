import { ApplicationUserLogin } from "../models/aplication-user-login";
import { ActionType, AddUserLogin, LoginActions } from "./actions";
import { LoginState } from "./state";
import authService from "../api/api.authservice";

export function loginReducer(state: LoginState, action: LoginActions): LoginState {
    switch (action.type) {
        case ActionType.AddUserLogin:
            return {
                ...state,
                applicationUserLogin: action.payload
            };
        default:
            return state;
    }
}

export const addUserLogin = (aplicationUserLogin: ApplicationUserLogin) : AddUserLogin => ({
    type: ActionType.AddUserLogin,
    payload: aplicationUserLogin
});