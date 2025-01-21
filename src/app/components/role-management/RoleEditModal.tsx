import {
  Modal,
  Button,
  Label,
  TextInput,
  Checkbox,
  ModalFooter,
} from "flowbite-react";
import React, { useState, useEffect } from "react";
import { t } from "i18next";
import axios from "axios";
import { errorToast, successUpdateToast } from "@/utils/toast";

interface RoleEditModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedRole: any;
  getRoleList: () => void;
}

// Define the type for formData keys
type PermissionKeys = "rl_create" | "rl_read" | "rl_update" | "rl_delete";

const RoleEditModal: React.FC<RoleEditModalProps> = ({
  isOpen,
  setIsOpen,
  selectedRole,
  getRoleList,
}) => {
  const [formData, setFormData] = useState({
    rl_name_th: "",
    rl_name_en: "",
    rl_sort: 0,
    rl_create: 0,
    rl_read: 0,
    rl_update: 0,
    rl_delete: 0,
  });

  useEffect(() => {
    if (selectedRole) {
      setFormData({
        rl_name_th: selectedRole.rl_name_th || "",
        rl_name_en: selectedRole.rl_name_en || "",
        rl_sort: selectedRole.rl_sort || 0,
        rl_create: selectedRole.rl_create || 0,
        rl_read: selectedRole.rl_read || 0,
        rl_update: selectedRole.rl_update || 0,
        rl_delete: selectedRole.rl_delete || 0,
      });
    }
  }, [selectedRole]);

  const handleSetFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePermissionChange = (key: PermissionKeys, value: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value ? 1 : 0,
    }));
  };

  const handleSubmit = async () => {
    console.log(formData);
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/role/${selectedRole.rl_id}`,
      {
        ...formData,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    if (res.data.status === "success") {
      successUpdateToast();
      setIsOpen(false);
      getRoleList();
    } else if (res.data.status === "error") {
      errorToast(res.data.message);
    }
  };

  return (
    <Modal
      show={isOpen}
      size="4xl"
      onClose={() => setIsOpen(false)}
      className="w-full"
    >
      <Modal.Header className="">
        {t("Edit Role")}
      </Modal.Header>
      <Modal.Body className="p-6 bg-gray-50 rounded-b-lg">
        <div className="space-y-4">
          <div>
            <Label htmlFor="rl_name_th" value={t("Role Name (th)")} />
            <TextInput
              required
              placeholder={t("Enter Role Name in Thai")}
              id="rl_name_th"
              name="rl_name_th"
              type="text"
              className="form-rounded-md w-full"
              value={formData.rl_name_th}
              onChange={handleSetFormData}
            />
          </div>

          <div>
            <Label htmlFor="rl_name_en" value={t("Role Name (en)")} />
            <TextInput
              required
              placeholder={t("Enter Role Name in English")}
              id="rl_name_en"
              name="rl_name_en"
              type="text"
              className="form-rounded-md w-full"
              value={formData.rl_name_en}
              onChange={handleSetFormData}
            />
          </div>

          <div className="mt-4">
            <p className="text-lg font-semibold mb-4">{t("Permissions")}</p>
            <div className="grid grid-cols-2 gap-4">
              {(
                [
                  "rl_create",
                  "rl_read",
                  "rl_update",
                  "rl_delete",
                ] as PermissionKeys[]
              ).map((key) => (
                <div key={key} className="flex items-center gap-2">
                  <Checkbox
                    id={key}
                    checked={Boolean(formData[key])}
                    onChange={(e) =>
                      handlePermissionChange(key, e.target.checked)
                    }
                  />
                  <Label htmlFor={key}>{t(key.replace("rl_", ""))}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal.Body>
      <ModalFooter className="flex justify-end">
        <Button
          color="primary"
          onClick={handleSubmit}
          className="bg-primary hover:bg-primary-dark"
        >
          {t("Save")}
        </Button>
        <Button color="secondary" onClick={() => setIsOpen(false)}>
          {t("Cancel")}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default RoleEditModal;
