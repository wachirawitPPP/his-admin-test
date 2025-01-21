import { Modal, Button, TextInput, Label } from "flowbite-react";
import React, { useState } from "react";
import { t } from "i18next";
import axios from "axios";

import { useParams } from "next/navigation";

interface GroupMenuCreateProps {
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  getMenuList: () => void;
}

const SubMenuCreateModal: React.FC<GroupMenuCreateProps> = ({
  isModalOpen,
  setModalOpen,
  getMenuList,
}) => {
  const { groupId } = useParams();
  const [formData, setFormData] = useState({
    mn_name_en: "",
    mn_name_th: "",
    mn_target: "",
    mn_url: "",
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
      mn_name_en: "",
      mn_name_th: "",
      mn_target: "",
      mn_url: "",
    });
  };

  const handleSubmit = async () => {
    setError(null);

    console.log(groupId);
    if (
      !formData.mn_name_en ||
      !formData.mn_name_th ||
      !formData.mn_target ||
      !formData.mn_url
    ) {
      setError(t("All fields are required."));
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/menu/${groupId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (res.data.status === "success") {
        alert(t("Menu created successfully!"));
        resetFormData();
        setModalOpen(false);
        getMenuList();
      } else {
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
          <Label htmlFor="mn_name_th" value={t("Menu Name (th)")} />
          <TextInput
            required
            placeholder={t("Enter menu name (th)")}
            id="mn_name_th"
            name="mn_name_th"
            type="text"
            sizing="md"
            className="form-rounded-md"
            value={formData.mn_name_th}
            onChange={handleSetFormData}
          />
        </div>

        <div className="w-full my-2">
          <Label htmlFor="mn_name_en" value={t("Menu Name (en)")} />
          <TextInput
            required
            placeholder={t("Enter menu name (en)")}
            id="mn_name_en"
            name="mn_name_en"
            type="text"
            sizing="md"
            className="form-rounded-md"
            value={formData.mn_name_en}
            onChange={handleSetFormData}
          />
        </div>

        <div className="w-full my-2">
          <Label htmlFor="mn_target" value={t("Target")} />
          <TextInput
            required
            placeholder={t("Enter Target")}
            id="mn_target"
            name="mn_target"
            type="text"
            sizing="md"
            className="form-rounded-md"
            value={formData.mn_target}
            onChange={handleSetFormData}
          />
        </div>
        <div className="w-full my-2">
          <Label htmlFor="mn_url" value={t("URL")} />
          <TextInput
            required
            placeholder={t("Enter URL")}
            id="mn_url"
            name="mn_url"
            type="text"
            sizing="md"
            className="form-rounded-md"
            value={formData.mn_url}
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

export default SubMenuCreateModal;
