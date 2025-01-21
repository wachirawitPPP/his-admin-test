import React from "react";
import reportStyle from "../../../css/pages/report.module.css";
import localStyle from "./reportStyle.module.css";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function signatureFooter() {
  return (
    <>
      <div className="w-full grid grid-flow-row-dense grid-cols-6 py-2">
        <div>
          <div className="w-full flex justify-start">
            <div className=" flex justify-center items-center">
              <Icon icon="tabler:signature" height={14} />
            </div>
            <div className="px-2 w-2/3">
              <a className={reportStyle.textNormalBold}>รับรอง</a>
            </div>
          </div>
        </div>
        <div className={localStyle.sigBox}>
          <div className={`flec items-center ${reportStyle.textNormalBold}`}>
            <a>ผู้ออกเอกสาร (ผู้ขาย)</a>
          </div>
          <div
            className={`flec items-center justify-center ${reportStyle.textNormalBold}`}
          >
            <div>
              <a>ธุสาวดี สินธุศิริ</a>
            </div>
            <div>
              <a>19/11/2024</a>
            </div>
          </div>
        </div>
        <div className={localStyle.sigBox}>
          <div className={`flec items-center ${reportStyle.textNormalBold}`}>
            <a>ผู้อนุมัติเอกสาร (ผู้ขาย)</a>
          </div>
          <div
            className={`flec items-center justify-center ${reportStyle.textNormalBold}`}
          >
            <div>
              <a>ประสาน ศรีโสภา</a>
            </div>
            <div>
              <a>20/11/2024</a>
            </div>
          </div>
        </div>
        <div className={localStyle.sigBox}>
          <div className={`flec items-center ${reportStyle.textNormalBold}`}>
            <a>ตราประทับ (ผู้ขาย)</a>
          </div>
        </div>
        <div className={localStyle.sigBox}>
          <div className={`flec items-center ${reportStyle.textNormalBold}`}>
            <a>ผู้รับเอกสาร (ลูกค้า)</a>
          </div>
          <div
            className={`flec items-center justify-center ${reportStyle.textNormalBold}`}
          >
            <div className="border-2  border-dotted border-white border-t-slate-400 py-2">
              <a>บริษัท วีวา เมดิเฮลท์ จำกัด</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center ">
          <div className={`flec items-center ${reportStyle.textNormalBold}`}>
            <a>ตราประทับ (ลูกค้า)</a>
          </div>
          <div className="size-20 border-2  border-dotted border-slate-400  my-2"></div>
        </div>
      </div>
    </>
  );
}
