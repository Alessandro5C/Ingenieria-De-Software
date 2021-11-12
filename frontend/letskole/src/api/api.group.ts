import { Customer } from "../models/customer";
import { Group } from "../models/group";
import { User } from "../models/user";
import request from "./api";

const apiGroups = {
    list: () => request.get<Group[]>("Group/GetAllByFilter"),
    add: (data: Group) => request.post("Group/Create", data),
    //edit: (data: Group) => request.put(`Group/${data.id}`, data),
    delete: (id: number) => request.delete(`Group/Delete?id=${id}`),
    detail: (id: string) => request.get<Group>(`Group/GetItemById?id=${id}`),
    teacher: (id: number) => request.delete(`Group/GetAllByTeacherId?id=${id}`),
};

export default apiGroups;
