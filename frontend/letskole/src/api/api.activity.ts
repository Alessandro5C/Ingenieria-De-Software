import { Activity } from "../models/activity";

import request from "./api";

const apiActivities= {
  list: () => request.get<Activity[]>("Activity/GetAllByFilter"),
  listId: (id: string) => request.get<Activity[]>(`Activity/GetAllByUserID?id=${id}`),
  //https://localhost:5001/api/v1/Activity/GetAllByUserID?id=3
  add: (data: Activity) => request.post("/Activity/Post", data),
  edit: (data: Activity) => request.put("Activity/Put", data),
  delete: (id: number) => request.delete(`/Activity/Delete/?id=${id}`),
  detail: (id: string) => request.get<Activity>(`/Activity/GetItemById?id=${Number(id)}`),
  // https://localhost:5001/api/v1/Activity/Delete?id=3
  //https://localhost:5001/api/v1/Activity/Put
  //https://localhost:5001/api/v1/Activity/GetItemById?id=1
};

export default apiActivities;
