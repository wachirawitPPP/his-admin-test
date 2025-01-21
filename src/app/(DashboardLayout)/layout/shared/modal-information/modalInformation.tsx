"use client";
import React, { useContext } from "react";
import { Button, Modal } from "flowbite-react";
import { Icon } from "@iconify/react";
import { CustomizerContext } from "@/app/context/customizerContext";
import { useTranslation } from "react-i18next";

interface props {
  title: string;
  modalSize: string;
  show: boolean;
  children: React.ReactNode;
  submitFunc: () => void;
  cancelFunc: () => void;
}

const ModalInformation = ({
  show,
  modalSize,
  title,
  children,
  submitFunc = () => {},
  cancelFunc = () => {},
}: props) => {
  const { t } = useTranslation();
  return (
    <Modal show={show} onClose={cancelFunc} className="w-full" size={modalSize}>
      <Modal.Header className="bg-primary rounded-t-md">
        {t(title)}
      </Modal.Header>
      <Modal.Body className="py-0">{children}</Modal.Body>
      <Modal.Footer className="bg-white  rounded-b-md">
        <div className=" w-full sticky -bottom-4  bg-white flex flex-row justify-end gap-4 border-t border-gray-300 pt-4">
          <Button color="primary" onClick={() => submitFunc()}>
            {t("Submit")}
          </Button>
          <Button color="secondary" onClick={() => cancelFunc()}>
            {t("Cancel")}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalInformation;
