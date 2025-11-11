import toast from "react-hot-toast";

// 🔹 সহজ Toast utility object
const Toast = {
  success: (msg) =>
    toast.success(msg, {
      style: {
        background: "#10B981", // সবুজ
        color: "#fff",
        fontWeight: "500",
      },
    }),

  error: (msg) =>
    toast.error(msg, {
      style: {
        background: "#EF4444", // লাল
        color: "#fff",
        fontWeight: "500",
      },
    }),

  info: (msg) =>
    toast(msg, {
      style: {
        background: "#3B82F6", // নীল
        color: "#fff",
      },
    }),
};

export default Toast;
