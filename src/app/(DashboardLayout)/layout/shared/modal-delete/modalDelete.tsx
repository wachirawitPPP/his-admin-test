"use client";
import React, { useContext } from "react";
import { Button, Modal } from "flowbite-react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import RushAnimation from "@/app/components/shared/rushAnimation";
import wainingAnt from "../../../../../../public/images/animation-warning.json";

interface props {
  title: string;
  detail: string;
  modalSize: string;
  show: boolean;
  submitFunc: () => void;
  cancelFunc: () => void;
}

const ModalDelete = ({
  show,
  modalSize,
  title,
  detail,
  submitFunc = () => {},
  cancelFunc = () => {},
}: props) => {
  const { t } = useTranslation();
  return (
    <Modal show={show} onClose={cancelFunc} className="w-full" size={modalSize}>
      <Modal.Header className="bg-primary rounded-t-md">
        {t(title)}
      </Modal.Header>
      <Modal.Body className="py-0">
        <div>
          {/* <div className="w-full flex justify-center">
          <Icon
            icon={"tabler:alert-triangle"}
            className={`text-warning`}
            height={128}
          />
          </div> */}
          <RushAnimation
            animation={wainingAnt}
            loop={false}
            width="80%"
            height="80%"
          />
          <div className="w-full flex justify-center ">
            <h2>
              {t("Do you want to delete")} {detail} ?
            </h2>{" "}
          </div>
        </div>
      </Modal.Body>
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

export default ModalDelete;
