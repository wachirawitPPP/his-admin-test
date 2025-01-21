
import React from "react";
import reportStyle from "../../../css/pages/report.module.css";
import localStyle from "./reportStyle.module.css";;
import DetailRow from "./detailRow";
import SumaryFooter from "./sumaryFooter";
import PayFooter from "./payFooter";
import HeaderPage from "./headerPage";
import RemarkFooter from "./remarkFooter";
import SignatureFooter from "./signatureFooter";

export interface InputModel {
  indexPaper: number;
  list: any[];
}

export default function paperPage({ indexPaper, list }: InputModel) {
  let dataList = list;
  return (
    <>
      <HeaderPage></HeaderPage>
      {/* Detail */}
      <div className={localStyle.cardItem}>
        <div className="w-full grid grid-flow-row-dense grid-cols-12">
          <div className="col-span-5">
            <a className={reportStyle.textNormalBold}>คำอธิบาย</a>
          </div>
          <div className=" col-span-3 flex justify-end items-center">
            <a className={reportStyle.textNormalBold}>จำนวน</a>
          </div>
          <div className=" w-full flex justify-end items-center">
            <a className={reportStyle.textNormalBold}>ราคา</a>
          </div>
          <div className=" w-full flex justify-end items-center">
            <a className={reportStyle.textNormalBold}>ส่วนลด</a>
          </div>
          <div className=" w-full flex justify-end items-center">
            <a className={reportStyle.textNormalBold}>VAT</a>
          </div>
          <div className=" w-full flex justify-end items-center">
            <a className={reportStyle.textNormalBold}>มูลค่าก่อนภาษี</a>
          </div>
        </div>
      </div>
      <div className="h-88">
        {dataList.map((item, index) => {
          return (
            <DetailRow
              index={index + 1 + ((indexPaper + 1) * 5 - 5)}
              title={item.title}
              content={item.content}
              number={item.number}
              price={item.price}
              discount={item.discount}
              vat={item.vat}
              bVat={item.bVat}
            ></DetailRow>
          );
        })}
      </div>
      <SumaryFooter></SumaryFooter>
      <PayFooter></PayFooter>
      <RemarkFooter></RemarkFooter>
      <SignatureFooter></SignatureFooter>
    </>
  );
}
