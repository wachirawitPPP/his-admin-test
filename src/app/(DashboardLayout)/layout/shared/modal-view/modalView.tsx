"use client";
import React, { useContext } from "react";
import { Button, Modal } from "flowbite-react";
import { useTranslation } from "react-i18next";

interface props {
  show: boolean;
  title: String;
  children: React.ReactNode;
  cancelFunc: () => void;
}

const ModalView = ({ show, title, children, cancelFunc = () => {} }: props) => {
  const { t } = useTranslation();
  return (
    <Modal show={show} onClose={cancelFunc} className="w-full" size={"xl"}>
      <Modal.Header className="bg-primary rounded-t-md">
        {title}
      </Modal.Header>
      <Modal.Body className="py-0">{children}</Modal.Body>
      <Modal.Footer className="bg-white  rounded-b-md">
        <div className=" w-full sticky -bottom-4  bg-white flex flex-row justify-end gap-4 border-t border-gray-300 pt-4">
          <Button color="primary" onClick={() => cancelFunc()}>
            {t("Submit")}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalView;
