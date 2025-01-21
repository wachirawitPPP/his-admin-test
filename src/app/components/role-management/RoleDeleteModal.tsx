import axios from "axios";
import { Modal, Button } from "flowbite-react";
import { errorToast,successCreateToast ,successUpdateToast } from "@/utils/toast";


interface DeleteModalProps {
  selectedRole: any;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  getRoleList: () => void;
}

const RoleDeleteModal: React.FC<DeleteModalProps> = ({
  isOpen: isModalOpen,
  setIsOpen: setModalOpen,
  selectedRole: selectedMenu,
  getRoleList: getMenuList,
}) => {
  const handleSubmit = async () => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/role/${selectedMenu.rl_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (res.data.status === "success") {
        alert("Success");
        setModalOpen(false);
        getMenuList();
      } else if (res.data.status === "error") {
        alert("Fail");
      }
    } catch (error) {}
  };
  return (
    <Modal
      show={isModalOpen}
      size="2xl"
      onClose={() => {
        setModalOpen(false);
      }}
      className="w-full"
    >
      <Modal.Header className="bg-primary rounded-t-lg text-white">
        Delete
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {`Delete ${selectedMenu?.rl_name_th || "Item"}?`}
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
        </div>
        <hr className="mt-4" />
        <div className="flex justify-end mt-4 gap-4">
          <Button color="primary" onClick={handleSubmit}>
            Confirm
          </Button>
          <Button color="secondary" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RoleDeleteModal;
