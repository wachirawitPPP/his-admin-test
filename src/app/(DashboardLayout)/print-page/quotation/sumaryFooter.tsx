import React from "react";
import reportStyle from "../../../css/pages/report.module.css";
import localStyle from "./reportStyle.module.css";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function sumaryFooter() {
  return (
    <>
      <div
        className="w-full grid grid-flow-row-dense grid-cols-12"
        style={{ paddingTop: 6 }}
      >
        <div>
          <div className="w-full flex justify-start">
            <div className=" flex justify-center items-center">
              <Icon icon="quill:paper" height={14} />
            </div>
            <div className="px-2 w-2/3">
              <a className={reportStyle.textNormalBold}>สรุป</a>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className={reportStyle.textNormalBold}>
            มูลค่าที่คำนวณภาษี 7%
          </div>
          <div className={reportStyle.textNormalBold}>ภาษีมูลค่าเพิ่ม 7%</div>
          <div className={reportStyle.textNormalBold}>จำนวนเงินทั้งสิ้น</div>
        </div>
        <div className="col-span-3">
          <div className={localStyle.textNormalRight}>
            <a>20,000.00 บาท</a>
          </div>
          <div className={localStyle.textNormalRight}>
            <div>
              <a>1,400.00 บาท</a>
            </div>
          </div>
          <div className={localStyle.textNormalRight}>
            <a>สองหมื่นหนึ่งพันสี่ร้อยบาทถ้วน</a>
          </div>
        </div>
        <div
          className={`col-span-4 flex items-center justify-between ${localStyle.cardItem}`}
          style={{ margin: 6 }}
        >
          <div>
            <a className={reportStyle.textNormalBold}>จำนวนเงินทั้งสิ้น</a>
          </div>
          <div>
            <span className={reportStyle.textNormalBold}>
              <a className={`px-4 ${reportStyle.textNormalBold16}`}>
                21,400.00
              </a>
              บาท
            </span>
          </div>
        </div>
      </div>
      <div
        className={`grid grid-flow-row-dense grid-cols-12 ${localStyle.borderBottom}`}
        style={{ paddingBottom: 6 }}
      >
        <div className="col-span-10 flex items-end flex-col">
          <span className={reportStyle.textNormalBold}>
            จำนวนเงินที่ถูกหัก ณ ที่จ่าย
          </span>
          <span className={reportStyle.textNormalBold}>จำนวนเงินที่ชำระ</span>
        </div>
        <div className="col-span-2 flex items-end flex-col">
          <span className={reportStyle.textNormal}>600.00 บาท</span>
          <span className={reportStyle.textNormal}>20,800.00 บาท</span>
        </div>
      </div>
    </>
  );
}
