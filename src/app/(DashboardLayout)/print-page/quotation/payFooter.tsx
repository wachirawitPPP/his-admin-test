import React from "react";
import reportStyle from "../../../css/pages/report.module.css";
import localStyle from "./reportStyle.module.css";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function payFooter() {
  return (
    <>
      <div
        className={`grid grid-flow-row-dense grid-cols-12 py-2 ${localStyle.borderBottom}`}
      >
        <div className="col-span-2">
          <div className="w-full flex justify-start">
            <div className=" flex justify-center items-center">
              <Icon icon="clarity:dollar-bill-solid" height={14} />
            </div>
            <div className="w-full w-2/3 flex justify-around">
              <div>
                <a className={reportStyle.textNormalBold}>ชำระเงิน</a>
              </div>
              <div className="mx-2">
                <img
                  src="https://www.kasikornbank.com/SiteCollectionDocuments/about/img/logo/logo.png"
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className={reportStyle.textNormal}>ธ.กสิกรไทย</div>
          <div className={reportStyle.textNormalBold}>
            กระแสรายวัน 109-8-13773-0
          </div>
          <div className={reportStyle.textNormal}>เอพีเอส ทีเอช</div>
        </div>
      </div>
    </>
  );
}
