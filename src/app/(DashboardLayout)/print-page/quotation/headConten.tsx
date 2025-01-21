import React from "react";
import reportStyle from "../../../css/pages/report.module.css";

export interface TextProp {
  title: string;
  content: string;
  code: string;
}

export default function headConten({ title, content, code }: TextProp) {
  let response = <div></div>;
  switch (code) {
    case "address":
      response = (
        <div className="w-full flex justify-start row-auto">
          <div className="w-10">
            <a className={reportStyle.textNormalBold}>{title} :</a>
          </div>
          <div className={`px-2 w-2/3 ${reportStyle.textNormal}`}>
            {content}
          </div>
        </div>
      );
      break;
    case "card":
      response = (
        <div className="w-full  h-4 flex justify-start items-center">
          <div className="w-13">
            <a className={reportStyle.textNormalBold}>{title} :</a>
          </div>
          <div className="px-2 w-2/3">
            <a className={reportStyle.textNormal}>{content}</a>
          </div>
        </div>
      );
      break;
    case "head":
      response = (
        <div className="w-full flex justify-start">
          <div className="w-10">
            <a className={reportStyle.textNormalBold}>{title} :</a>
          </div>
          <div className="px-2 w-2/3">
            <a className={reportStyle.textNormalBold}>{content}</a>
          </div>
        </div>
      );
      break;
    default:
      response = (
        <div className="w-full flex justify-start">
          <div className="w-10">
            <a className={reportStyle.textNormalBold}>{title} :</a>
          </div>
          <div className="px-2 w-2/3">
            <a className={reportStyle.textNormal}>{content}</a>
          </div>
        </div>
      );
      break;
  }
  return <>{response}</>;
}
