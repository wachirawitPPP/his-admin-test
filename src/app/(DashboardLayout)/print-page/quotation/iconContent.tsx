import { Icon } from "@iconify/react/dist/iconify.js";
import reportStyle from "../../../css/pages/report.module.css";
import React from "react";

export interface IconProp {
  icon: string;
  content: string;
  code: string;
}

export default function iconContent({ icon, content, code }: IconProp) {
  let response = <div></div>;
  switch (code) {
    case "head":
      response = (
        <div className="w-full flex justify-start">
          <div className="w-8 flex justify-center items-center">
            <Icon icon={icon} height={14} />
          </div>
          <div className="px-2 w-2/3">
            <a className={reportStyle.textNormalBold}>{content}</a>
          </div>
        </div>
      );
      break;
    case "normal":
      response = (
        <div className="w-full flex justify-start">
          <div className="w-8 flex justify-center items-center">
            <Icon icon={icon} height={14} />
          </div>
          <div className="px-2 w-2/3">
            <a className={reportStyle.textNormal}>{content}</a>
          </div>
        </div>
      );
      break;
    default:
      response = <div></div>;
      break;
  }
  return <>{response}</>;
}
