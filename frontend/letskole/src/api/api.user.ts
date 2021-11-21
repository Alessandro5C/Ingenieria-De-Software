import { User } from "../models/user";
import request from "./api";
import authService from "./auth/auth.service";

const apiUsers = {
    list: () => request.get<User[]>("User/GetAllByFilter"),
    add: (data: User) => {
        // @ts-ignore
        data.student = (data.student=="true");
        return authService.newUser(data).then((user)=> {return user})
    },
    edit: (data: User) => request.put(`User/${data.id}`, data), //Pa dsps
    delete: (id: number) => request.delete(`User/Delete?id=${id}`),
    detail: (id: string) => request.get<User>(`User/GetItemById?id=${id}`),
};

export default apiUsers;
