import { Service, ServiceFormValues, Params } from "../types/service"; 
import http from "./config";

const service = {
  get: (params: Params) => http.get<{ services: Service[], total: number }>("/service/all", { params }),
  add: (data: ServiceFormValues) => http.post<Service>("/service", data),
  edit: (data: ServiceFormValues) => http.put<Service>("/service", data),
  delete: (id: string) => http.delete<void>("/service", { params: { id } }),
};

export default service;
