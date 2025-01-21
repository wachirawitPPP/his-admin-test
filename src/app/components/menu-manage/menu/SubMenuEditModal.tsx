import axios from "axios";
import { Modal, Button, TextInput, Label } from "flowbite-react";
import { t } from "i18next";
import { useEffect, useState } from "react";
// import MenuForm from "./GroupMenuForm";

interface EditModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedMenu: any;
  getMenuList: () => void;
}

const SubMenuEditModal: React.FC<EditModalProps> = ({
  isOpen,
  setIsOpen,
  selectedMenu,
  getMenuList,
}) => {
  // console.log(selectedMenu)
  const [formData, setFormData] = useState({
    mn_name_en: "",
    mn_name_th: "",
    mn_target: "",
    mn_url: "",
  });
  const handleSetFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmitGroupEdit = async () => {
    const payload = {
      mn_name_en: formData.mn_name_en,
      mn_name_th: formData.mn_name_th,
      mn_target: formData.mn_target,
      mn_url: formData.mn_url,
      mn_sort: selectedMenu.mn_sort,
      mn_is_active: 1, // 1 = ใช้งาน, 0 = ระงับ
    };
    console.log(payload);
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/menu/${selectedMenu.mn_id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (res.data.status === "success") {
        alert("Success");
        setIsOpen(false);
        getMenuList();
      } else if (res.data.status === "error") {
        alert("Fail");
        console.log(res.data.message);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (selectedMenu) {
      setFormData({
        mn_name_en: selectedMenu.mn_name_en,
        mn_name_th: selectedMenu.mn_name_th,
        mn_target: selectedMenu.mn_target,
        mn_url: selectedMenu.mn_url,
      });
    }
  }, [selectedMenu]);
  return (
    <Modal
      show={isOpen}
      size="4xl"
      onClose={() => setIsOpen(false)}
      className="w-full"
    >
      <Modal.Header className="bg-primary rounded-t-lg text-white">
        Edit Menu
      </Modal.Header>
      <Modal.Body>
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
        <Button color="primary" onClick={handleSubmitGroupEdit}>
          Save
        </Button>
        <Button color="secondary" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubMenuEditModal;
