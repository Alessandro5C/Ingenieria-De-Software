import { User } from "../models/user";
import request from "./api";

const apiUsers = {
    list: () => request.get<User[]>("User/GetAllByFilter"),//Nose si agregarle el filtro
    add: (data: User) => request.post("User/Post", data),
    //edit: (data: User) => request.put(`User/${data.Id}`, data), //Pa dsps
    delete: (id: number) => request.delete(`User/Delete?id=${id}`),
    detail: (id: number) => request.get<User>(`User/GetItemById?id=${id}`), //GetOne
};

export default apiUsers;
