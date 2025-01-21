import axios from "axios";
import { Modal, Button } from "flowbite-react";

interface DeleteSubMenuModalProps {
  selectedMenu: any;
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  getMenuList: () => void;
}

const DeleteSubMenuModal: React.FC<DeleteSubMenuModalProps> = ({
  isModalOpen,
  setModalOpen,
  selectedMenu,
  getMenuList,
}) => {
  const handleSubmit = async () => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/menu/${selectedMenu.mn_id}`,
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
            {`Delete ${selectedMenu?.mn_name_th || "Item"}?`}
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end mt-4 gap-4">
        <Button color="primary" onClick={handleSubmit}>
          Confirm
        </Button>
        <Button color="secondary" onClick={() => setModalOpen(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteSubMenuModal;
