import CardBox from "@/app/components/shared/CardBox";
import { PatientHistory } from "@/utils/type/patientTypes";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import Image from "next/image";

interface GeneralDetailProps {
  customer: PatientHistory;
}

const GeneralDetail: React.FC<GeneralDetailProps> = ({ customer }) => {
  return (
    <>
      <CardBox>
        <div className="flex flex-row w-full gap-4">
          <div className="w-3/12 flex flex-row gap-4">
            <Image
              src={"/images/profile/user-5.jpg"}
              width={100}
              height={100}
              alt="icon"
              className="h-32 w-32 rounded-md"
            />
            <div className="flex flex-col gap-2">
              <p className="text-ld font-semibold">ชื่อ: {customer.name}</p>
              <p className="text-ld font-semibold">
                สัญชาติ: {customer.nationality}
              </p>
              <p className="text-ld font-semibold">
                เลขบัตรประชาชน: {customer.id_card}
              </p>
            </div>
          </div>
          <div className="w-3/12">
            <p className="text-ld font-semibold">asdasd</p>
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default GeneralDetail;
