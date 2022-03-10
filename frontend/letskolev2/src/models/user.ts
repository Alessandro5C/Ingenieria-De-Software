export interface User {
    id: string,
    displayedName: string,
    email: string,
    phoneNumber: string | null,
    birthday: Date,
    school: string | null,
}