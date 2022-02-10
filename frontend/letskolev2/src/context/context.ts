import React from 'react';
import { LoginActions } from './actions';
import { InitialLoginState, LoginState } from './state';

export const LoginContext = React.createContext<{
    state: LoginState;
    dispatch: React.Dispatch<LoginActions>;
}>({
    state: InitialLoginState,
    dispatch: () => undefined,
});
