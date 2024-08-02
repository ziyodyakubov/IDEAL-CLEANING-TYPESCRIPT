import { Params, OrderFormValues } from "../types/order";
import http from "./config";

const order = {
  get: (params: Params) => http.get("/order/all", { params }),
  add: (data: OrderFormValues) => http.post("/order", data),
  edit: (data: OrderFormValues) => http.put("/order", data),
  delete: (id: string) => http.delete("/order", { params: { id } }),
};

export default order;
