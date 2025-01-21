import React from "react";
import reportStyle from "../../../css/pages/report.module.css";
import localStyle from "./reportStyle.module.css";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function remarkFooter() {
  return (
    <>
      <div
        className={`grid grid-flow-row-dense grid-cols-12 py-2 ${localStyle.borderBottom}`}
      >
        <div>
          <div className="w-full flex justify-start">
            <div className=" flex justify-center items-center">
              <Icon icon="heroicons-solid:chat" height={14} />
            </div>
            <div className="px-2 w-2/3">
              <a className={reportStyle.textNormalBold}>หมายเหตุ</a>
            </div>
          </div>
        </div>
        <div className="col-span-4 px-4">
          <div className={reportStyle.textNormal}>
            - ส่งหลักฐานการโอนเงิน ได้ที่ line : @apsth
          </div>
          <div className={reportStyle.textNormal}>
            - โทรสอบถาม ได้ที่ 098-1816769
          </div>
          <div className={reportStyle.textNormal}>
            - เงื่อนไขและข้อตกลงเป็นไปตามที่กำหนดไว้ในใบเสนอราคา
            ขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไข และไม่คืนเงินทุกกรณี
          </div>
        </div>
      </div>
    </>
  );
}
