"use client";
import React, { useContext } from "react";
import { Button, Modal } from "flowbite-react";
import { useTranslation } from "react-i18next";
import WarningComponent from "../../../../components/shared/warningComponent";

interface props {
  content: string;
  show: boolean;
  cancelFunc: () => void;
}

const ModalError = ({
  show,
  content,
  cancelFunc = () => {},
}: props) => {
  const { t } = useTranslation();
  return (
    <Modal show={show} onClose={cancelFunc} className="w-full" size={"xl"}>
      <Modal.Header className="bg-primary rounded-t-md">
        {t("Error")}
      </Modal.Header>
      <Modal.Body className="py-0">
        <div className="w-full flex justify-center flex-col my-4 ">
          <div className="w-full flex justify-center ">
            <WarningComponent />
          </div>
          <div className="w-full flex justify-center ">
            <h2>{content}</h2>{" "}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-white rounded-b-md">
        <div className=" w-full sticky -bottom-4  bg-white flex flex-row justify-end gap-4 border-t border-gray-300 pt-4">
          <Button color="primary" onClick={() => cancelFunc()}>
            {t("Submit")}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalError;
