import responseBody from "../models/ResponseBody";


const baseURL = "https://localhost:5001/api/v2/";

// const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const apiHandler = {
  get: <TData>(url:string, headers:HeadersInit) =>
    fetch(baseURL+url, {method: "GET", headers:headers})
      .then(response => response.json())
      .then(data => console.log(data.data)),
  post: <TData>(url:string, headers:HeadersInit, data:TData) =>
    fetch(baseURL+url, {method: "POST", headers:headers, body: JSON.stringify(data)})
      .then(response => response.json())
      .then(data => console.log(data.data))
}

// fetch(
//   "https://localhost:5001/api/v2/Game/GetAll",
//   {
//     method: "GET",
//     headers: {
//       "Content-type": "application/json",
//       "Authorization": `Bearer ${token}`
//     }
//   })
//   .then(response => response.json())
//   .then(data => console.log(data.data))
//   .catch(data => console.log(data));


// import axios, { AxiosResponse } from "axios";
//
// axios.defaults.baseURL = "https://letskole.herokuapp.com/api/v1";
// // axios.defaults.baseURL = "https://localhost:5001/api/v1/";
//
//
// const responseBody = <T>(response: AxiosResponse<T>) => response.data;
//
// const request = {
//   get: <T>(url: string) => axios.get<T>(url).then(responseBody),
//   post: <T>(url: string, body: {}) =>
//     axios.post<T>(url, body).then(responseBody),
//   put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
//   delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
// };
//

export default apiHandler;