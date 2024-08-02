export interface Service {
  id: string;
  name: string;
}

export interface OrderFormValues {
  amount: number;
  client_full_name: string;
  client_phone_number: string;
  service_id: string;
}

export interface OrderModalProps {
  open: boolean;
  handleClose: () => void;
  edit?: Order | null; // Ensure the edit prop uses the Order interface
  fetchData: () => void;
}

export interface Order {
  id: string;
  amount: number;
  client_name: string;
  client_phone_number: string;
  status: string;
  service_id: string; // Ensure service_id is included
}

export interface Params {
  limit: number;
  page: number;
}


