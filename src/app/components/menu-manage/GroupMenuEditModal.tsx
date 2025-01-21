import { Modal, Button } from "flowbite-react";
import MenuForm from "./GroupMenuForm";
import {
  errorToast,
  successCreateToast,
  successUpdateToast,
} from "@/utils/toast";
import axios from "axios";

interface EditModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;

  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  selectedMenu: any;
  getMenuList: () => void;
}

const GruopMenuEditModal: React.FC<EditModalProps> = ({
  isOpen,
  setIsOpen,

  formData,
  setFormData,
  selectedMenu,
  getMenuList,
}) => {
  const handleSubmitGroupEdit = async () => {
    const payload = {
      mng_name_th: formData.name_th,
      mng_name_en: formData.name_en,
      mng_icon: formData.icon,
      mng_sort: formData.sort,
      mng_status: 1, // 1 = ใช้งาน, 0 = ระงับ
    };
    console.log(payload);
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/groupmenu/${selectedMenu.mng_id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (res.data.status === "success") {
        setIsOpen(false);
        getMenuList();
        successUpdateToast();
      } else if (res.data.status === "error") {
        errorToast(res.data.message);
      }
    } catch (error) {}
  };

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
        <MenuForm
          selectedMenu={selectedMenu}
          formData={formData}
          setFormData={setFormData}
        />
      </Modal.Body>
      <Modal.Footer className="flex justify-end mt-4 gap-4">
        <Button
          color="primary"
          onClick={() => {
            handleSubmitGroupEdit();
          }}
        >
          Save
        </Button>
        <Button color="secondary" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GruopMenuEditModal;
