import { Modal, Button, TextInput, Label } from "flowbite-react";
import React, { useState } from "react";
import { t } from "i18next";
import axios from "axios";
import {
  errorToast,
  successCreateToast,
  successUpdateToast,
} from "@/utils/toast";

interface GroupMenuCreateProps {
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  getMenuList: () => void;
}

const GroupMenuCreateModal: React.FC<GroupMenuCreateProps> = ({
  isModalOpen,
  setModalOpen,
  getMenuList,
}) => {
  const [formData, setFormData] = useState({
    mng_name_en: "",
    mng_name_th: "",
    mng_icon: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSetFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetFormData = () => {
    setFormData({
      mng_name_en: "",
      mng_name_th: "",
      mng_icon: "",
    });
  };

  const handleSubmit = async () => {
    setError(null);

    if (!formData.mng_name_en || !formData.mng_name_th || !formData.mng_icon) {
      setError(t("All fields are required."));
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/groupmenu/${process.env.NEXT_PUBLIC_AP_ID}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (res.data.status === "success") {
        alert(t("Group menu created successfully!"));
        resetFormData();
        setModalOpen(false);
        getMenuList();
        successCreateToast();
      } else {
        errorToast(res.data.message);
        setError(t(res.data.message || "Failed to create group menu."));
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || t("An error occurred. Please try again.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    resetFormData();
    setModalOpen(false);
  };

  return (
    <Modal
      show={isModalOpen}
      size="2xl"
      onClose={handleClose}
      className="w-full"
    >
      <Modal.Header className="bg-primary rounded-t-lg text-white">
        {t("Create Group Menu")}
      </Modal.Header>
      <Modal.Body>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="w-full my-2">
          <Label htmlFor="mng_name_th" value={t("Menu Name (th)")} />
          <TextInput
            required
            placeholder={t("Enter menu name (th)")}
            id="mng_name_th"
            name="mng_name_th"
            type="text"
            sizing="md"
            className="form-rounded-md"
            value={formData.mng_name_th}
            onChange={handleSetFormData}
          />
        </div>

        <div className="w-full my-2">
          <Label htmlFor="mng_name_en" value={t("Menu Name (en)")} />
          <TextInput
            required
            placeholder={t("Enter menu name (en)")}
            id="mng_name_en"
            name="mng_name_en"
            type="text"
            sizing="md"
            className="form-rounded-md"
            value={formData.mng_name_en}
            onChange={handleSetFormData}
          />
        </div>

        <div className="w-full my-2">
          <Label htmlFor="mng_icon" value={t("Icon")} />
          <TextInput
            required
            placeholder={t("Enter icon")}
            id="mng_icon"
            name="mng_icon"
            type="text"
            sizing="md"
            className="form-rounded-md"
            value={formData.mng_icon}
            onChange={handleSetFormData}
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end mt-4 gap-4">
        <Button color="primary" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? t("Submitting...") : t("Confirm")}
        </Button>
        <Button color="secondary" onClick={handleClose}>
          {t("Cancel")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GroupMenuCreateModal;
