export interface UserState {
    id: string,
    logged: boolean
}

export const initialUserState: UserState = {
    id: '',
    logged: false // Just for testing frontend
}