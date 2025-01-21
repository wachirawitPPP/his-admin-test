import toast from "react-hot-toast";
import i18next from "i18next";

export const successUpdateToast = () => {
  toast.success(i18next.t("Update Successfully"), {
    position: "top-right",
    duration: 5000,
    style: {
      minWidth: "300px",
      padding: "25px",
    },
  });
};

export const successCreateToast = () => {
  toast.success(i18next.t("Create Successfully"), {
    position: "top-right",
    duration: 5000,
    style: {
      minWidth: "300px",
      padding: "25px",
    },
    

  });
};

export const errorToast = (message: string) => {
  const firstPart = message.split(",")[0];
  toast.error(i18next.t(firstPart), {
    position: "top-right",
    duration: 5000,
    style: {
      minWidth: "300px",
      padding: "25px",
    },
  });
};
