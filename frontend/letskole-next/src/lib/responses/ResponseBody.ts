interface ResponseBody<TData> {
  code: number;
  status: "error" | "success";
  message?: string | null;
  data: TData | null;
}

export default ResponseBody;