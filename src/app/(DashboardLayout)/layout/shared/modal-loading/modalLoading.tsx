"use client";
import React, { useContext } from "react";
import { Button, Modal } from "flowbite-react";
import { Icon } from "@iconify/react";
import { CustomizerContext } from "@/app/context/customizerContext";
import { useTranslation } from "react-i18next";
import LoadingComponent from "../../../../components/shared/LoadingComponent";

interface props {
  show: boolean;
}

const ModalLoading = ({ show }: props) => {
  const { t } = useTranslation();
  return (
    <Modal show={show} className="w-full" size={"xl"}>
      <Modal.Body className="py-0 bg-white  rounded-md">
        <div className="w-full flex justify-center items-center">
          <LoadingComponent />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalLoading;
