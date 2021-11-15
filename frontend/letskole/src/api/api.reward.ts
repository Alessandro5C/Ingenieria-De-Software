import { Customer } from "../models/customer";
import { Reward } from "../models/reward";
import { User } from "../models/user";
import request from "./api";

const apiRewards= {
    list: () => request.get<User[]>("User/GetAllByFilter"),
    add: (data: Customer) => request.post("/Customer", data),
    edit: (data: Customer) => request.put(`/Customer/${data.customerId}`, data),
    delete: (userId: string,rewardId:number) => request.delete(`/Reward/Delete?userId=${Number(userId)}&rewardId=${Number(rewardId)}`),
    detail: (id: string) => request.get<Reward[]>(`/Reward/GetAllByFilterRewardsUser?userId=${Number(id)}`),
//https://localhost:5001/api/v1/Reward/Delete?userId=1&rewardId=2
};

export default apiRewards;
