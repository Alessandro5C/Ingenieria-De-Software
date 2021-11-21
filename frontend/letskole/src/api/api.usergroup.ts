import { Customer } from "../models/customer";
import { userGroup } from "../models/user-groups";
import request from "./api";

const apiUserGroup = {
    list: (groupId:number) => request.get<userGroup[]>(`UserGroup/GetItemById?groupId=${groupId}`),
    add: (data: userGroup) => request.post("UserGroup/Post", data),
    edit: (data: userGroup) => request.put(`UserGroup/Put`, data),
    deleteUser: (userId: number,groupId: number) =>
        request.delete(`UserGroup/DeleteUsingUser?userId=${userId}&groupId=${groupId}`),
    listByUser: (userId:number) =>request.get<userGroup[]>(`UserGroup/GetByUserID?userId=${userId}`),
};

export default apiUserGroup;
