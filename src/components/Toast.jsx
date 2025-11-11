import toast from "react-hot-toast";

const Toast = {
  success: (msg) =>
    toast.success(msg, {
      style: {
        background: "#10B981",
        color: "#fff",
        fontWeight: "500",
      },
    }),

  error: (msg) =>
    toast.error(msg, {
      style: {
        background: "#EF4444",
        color: "#fff",
        fontWeight: "500",
      },
    }),

  info: (msg) =>
    toast(msg, {
      style: {
        background: "#3B82F6",
        color: "#fff",
      },
    }),
};

export default Toast;
