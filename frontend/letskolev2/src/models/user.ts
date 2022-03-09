export interface User {
    id: number,
    displayedName: string,
    student: boolean,
    phoneNumber: string | null,
    email: string,
    birthday: Date,
    school: string | null,
}