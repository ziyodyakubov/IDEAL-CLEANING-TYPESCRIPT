import { Bounce, toast, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface NotificationProp {
    title: string;
    type: TypeOptions | undefined;
}

const Notification = (props: NotificationProp) => {
  return toast(props.title, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    type: props.type,
    transition: Bounce,
  });
};

export default Notification;