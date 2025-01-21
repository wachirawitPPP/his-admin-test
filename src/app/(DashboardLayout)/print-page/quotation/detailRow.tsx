import React from "react";
import reportStyle from "../../../css/pages/report.module.css";
import localStyle from "./reportStyle.module.css";
export interface ItemProp {
  index: number;
  title: string;
  content: string;
  number: string;
  price: string;
  discount: string;
  vat: string;
  bVat: string;
}
export default function detailRow({
  index,
  title,
  content,
  number,
  price,
  discount,
  vat,
  bVat,
}: ItemProp) {
  return (
    <>
      <div className={localStyle.DRborderBottom}>
        <div className="w-full grid grid-flow-row-dense grid-cols-12">
          <div className="col-span-5 flex flex-column">
            <div className={reportStyle.textNormal} >{index}.</div>
            <div className="col-span-4 px-2">
              <div className="leading-3">
                <a className={reportStyle.textNormalBold}>{title}</a>
              </div>
              <div className={reportStyle.textNormal}>{content}</div>
            </div>
          </div>
          <div className=" col-span-3 flex justify-end">
            <a className={reportStyle.textNormal}>{number}</a>
          </div>
          <div className=" w-full flex justify-end">
            <a className={reportStyle.textNormal}>{price}</a>
          </div>
          <div className=" w-full flex justify-end">
            <a className={reportStyle.textNormal}>{discount}</a>
          </div>
          <div className=" w-full flex justify-end">
            <a className={reportStyle.textNormal}>{vat}</a>
          </div>
          <div className=" w-full flex justify-end">
            <a className={reportStyle.textNormal}>{bVat}</a>
          </div>
        </div>
      </div>
    </>
  );
}
