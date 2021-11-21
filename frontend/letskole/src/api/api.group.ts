import { ApplicationUserResponse } from "../models/auth/application-user-response";
import { Customer } from "../models/customer";
import { Group } from "../models/group";
import { User } from "../models/user";
import request from "./api";

const apiGroups = {
    list: () => request.get<Group[]>("Group/GetAllByFilter"),
    add: (id: number, data: Group) => request.post(`Group/Create?userId=${id}`, data),
    //edit: (data: Group) => request.put(`Group/${data.id}`, data),
    delete: (id: number) => request.delete(`Group/Delete?id=${id}`),
    detail: (id: string) => request.get<Group>(`Group/GetItemById?id=${id}`),
    teacher: (id: number) => request.get<Group[]>(`Group/GetAllByTeacherId?userId=${id}`),

};

export default apiGroups;
