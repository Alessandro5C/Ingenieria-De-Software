import ResponseBody from "../responses/ResponseBody";


const baseURL = "https://localhost:5001/api/v2/";

const handleError = async (res: Response) => {
  let defaultError: ResponseBody<null> =
    { code: res.status, status: "error", message: res.statusText, data: null };
  if (res.status === 400 || res.status === 404)
    defaultError.message = await res.json().catch(() => defaultError.message);
  throw new Error(JSON.stringify(defaultError));
};

const apiHandler = {
  get: async <ReturnedData>(url: string, headers: HeadersInit)
    : Promise<ResponseBody<ReturnedData>> => {
    const response = await
      fetch(baseURL + url, { method: "GET", headers: headers });
    if (!response.ok)
      await handleError(response);
    return response.json();
  },
  post: async <TData, ReturnedData>(url: string, headers: HeadersInit, data: TData)
    : Promise<ResponseBody<ReturnedData>> => {
    const response = await
      fetch(baseURL + url, { method: "POST", headers: headers, body: JSON.stringify(data) });
    if (!response.ok)
      await handleError(response);
    return response.json();
  },
  put: async <TData>(url: string, headers: HeadersInit, data: TData)
    : Promise<ResponseBody<null>> => {
    const response = await
      fetch(baseURL + url, { method: "PUT", headers: headers, body: JSON.stringify(data) });
    if (!response.ok)
      await handleError(response);
    return response.json();
  },
  delete: async (url: string, headers: HeadersInit)
    : Promise<ResponseBody<null>> => {
    const response = await
      fetch(baseURL + url, { method: "DELETE", headers: headers });
    if (!response.ok)
      await handleError(response);
    return response.json();
  }
};

export default apiHandler;