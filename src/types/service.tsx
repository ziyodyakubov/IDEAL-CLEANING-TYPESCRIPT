export interface ServiceFormValues {
  name: string;
  price: number;
}

export interface ServiceFormValues2 {
  name: string;
  price: number;
}

export interface Service {
  id: string;
  name: string;
  price: number;
}


export interface ServiceModalProps {
  open: boolean;
  handleClose: () => void;
  edit?: { id: string; name: string; price: number } | null;
  fetchData: () => void;
}


export interface Params {
  limit: number;
  page: number;
}

export interface NotificationProps {
  title: string;
  type: "success" | "error" | "info" | "warning";
  message?: string;
}

export interface ServiceModalProps2 {
  open: boolean;
  handleClose: () => void;
  edit: Service | null;
  fetchData: () => void;
}
