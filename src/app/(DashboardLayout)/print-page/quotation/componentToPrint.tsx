"use client";
import { Button } from "flowbite-react";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import reportStyle from "../../../css/pages/report.module.css";
import PaperPage from "./paperPage";

export default function componentToPrint() {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
  });
  const itemInPaper = 5;

  let dataList = [
    {
      title: "APS_X Package : ฟังก์ชั่น Standard (P00001)",
      content:
        "Package N+ สามารถใช้งานได้ 1 สาขา 1 ปี - กำหนดยูสเซอร์ผู้ใช้งาน 15 users/สาขา- พื้นที่จัดเก็บ 15 GB (ไฟล์รูป/เอกสาร)- Support/Database Free / Update Version Free- แถมวันใช้งาน 30 วัน / ส่วนลด 1000 บาท",
      number: "1.00",
      price: "21,000.00",
      discount: "1,000.00",
      vat: "7%",
      bVat: "20,000.00",
    },
    {
      title: "เครื่องอ่านบัตรประชาชน (P00013)",
      content: "แถม เครื่องอ่านบัตรประชาชน 1 เครื่อง",
      number: "1.00",
      price: "980.00",
      discount: "980.00",
      vat: "7%",
      bVat: "0.00",
    },
    {
      title: "เครื่องอ่านบัตรประชาชน (P00013)",
      content: "แถม เครื่องอ่านบัตรประชาชน 1 เครื่อง",
      number: "1.00",
      price: "980.00",
      discount: "980.00",
      vat: "7%",
      bVat: "0.00",
    },
    {
      title: "เครื่องอ่านบัตรประชาชน (P00013)",
      content: "แถม เครื่องอ่านบัตรประชาชน 1 เครื่อง",
      number: "1.00",
      price: "980.00",
      discount: "980.00",
      vat: "7%",
      bVat: "0.00",
    },
    {
      title: "เครื่องอ่านบัตรประชาชน (P00013)",
      content: "แถม เครื่องอ่านบัตรประชาชน 1 เครื่อง",
      number: "1.00",
      price: "980.00",
      discount: "980.00",
      vat: "7%",
      bVat: "0.00",
    },
    {
      title: "เครื่องอ่านบัตรประชาชน (P00013)",
      content: "แถม เครื่องอ่านบัตรประชาชน 1 เครื่อง",
      number: "1.00",
      price: "980.00",
      discount: "980.00",
      vat: "7%",
      bVat: "0.00",
    },
    {
      title: "เครื่องอ่านบัตรประชาชน (P00013)",
      content: "แถม เครื่องอ่านบัตรประชาชน 1 เครื่อง",
      number: "1.00",
      price: "980.00",
      discount: "980.00",
      vat: "7%",
      bVat: "0.00",
    },
    {
      title: "เครื่องอ่านบัตรประชาชน (P00013)",
      content: "แถม เครื่องอ่านบัตรประชาชน 1 เครื่อง",
      number: "1.00",
      price: "980.00",
      discount: "980.00",
      vat: "7%",
      bVat: "0.00",
    },
    {
      title: "เครื่องอ่านบัตรประชาชน (P00013)",
      content: "แถม เครื่องอ่านบัตรประชาชน 1 เครื่อง",
      number: "1.00",
      price: "980.00",
      discount: "980.00",
      vat: "7%",
      bVat: "0.00",
    },
    {
      title: "APS_X Package : ฟังก์ชั่น Standard (P00001)",
      content:
        "Package N+ สามารถใช้งานได้ 1 สาขา 1 ปี - กำหนดยูสเซอร์ผู้ใช้งาน 15 users/สาขา- พื้นที่จัดเก็บ 15 GB (ไฟล์รูป/เอกสาร)- Support/Database Free / Update Version Free- แถมวันใช้งาน 30 วัน / ส่วนลด 1000 บาท",
      number: "1.00",
      price: "21,000.00",
      discount: "1,000.00",
      vat: "7%",
      bVat: "20,000.00",
    },
    {
      title: "เครื่องอ่านบัตรประชาชน (P00013)",
      content: "แถม เครื่องอ่านบัตรประชาชน 1 เครื่อง",
      number: "1.00",
      price: "980.00",
      discount: "980.00",
      vat: "7%",
      bVat: "0.00",
    },
    {
      title: "เครื่องอ่านบัตรประชาชน (P00013)",
      content: "แถม เครื่องอ่านบัตรประชาชน 1 เครื่อง",
      number: "1.00",
      price: "980.00",
      discount: "980.00",
      vat: "7%",
      bVat: "0.00",
    },
    {
      title: "เครื่องอ่านบัตรประชาชน (P00013)",
      content: "แถม เครื่องอ่านบัตรประชาชน 1 เครื่อง",
      number: "1.00",
      price: "980.00",
      discount: "980.00",
      vat: "7%",
      bVat: "0.00",
    },
    {
      title: "เครื่องอ่านบัตรประชาชน (P00013)",
      content: "แถม เครื่องอ่านบัตรประชาชน 1 เครื่อง",
      number: "1.00",
      price: "980.00",
      discount: "980.00",
      vat: "7%",
      bVat: "0.00",
    },
    {
      title: "เครื่องอ่านบัตรประชาชน (P00013)",
      content: "แถม เครื่องอ่านบัตรประชาชน 1 เครื่อง",
      number: "1.00",
      price: "980.00",
      discount: "980.00",
      vat: "7%",
      bVat: "0.00",
    },
    {
      title: "เครื่องอ่านบัตรประชาชน (P00013)",
      content: "แถม เครื่องอ่านบัตรประชาชน 1 เครื่อง",
      number: "1.00",
      price: "980.00",
      discount: "980.00",
      vat: "7%",
      bVat: "0.00",
    },
    {
      title: "เครื่องอ่านบัตรประชาชน (P00013)",
      content: "แถม เครื่องอ่านบัตรประชาชน 1 เครื่อง",
      number: "1.00",
      price: "980.00",
      discount: "980.00",
      vat: "7%",
      bVat: "0.00",
    },
    {
      title: "เครื่องอ่านบัตรประชาชน (P00013)",
      content: "แถม เครื่องอ่านบัตรประชาชน 1 เครื่อง",
      number: "1.00",
      price: "980.00",
      discount: "980.00",
      vat: "7%",
      bVat: "0.00",
    },
  ];

  let paperNum = dataList.length / itemInPaper;
  let paperPage = parseInt(paperNum.toString());
  if (paperNum % itemInPaper != 0) {
    paperPage++;
  }
  let itemStart = 0;
  let paperList = [];
  for (let i = 0; paperPage > i; i++) {
    let cList = [];
    for (let j = 0; itemInPaper > j; j++) {
      if (itemStart + j < dataList.length) {
        cList.push(dataList[itemStart + j]);
      }
    }
    let paper = { index: i + 1, list: cList };
    paperList.push(paper);
    itemStart += itemInPaper;
  }

  return (
    <>
      <div className="flex justify-end py-4">
        <Button
          onClick={() => reactToPrintFn()}
          gradientDuoTone="purpleToBlue"
          className="w-48 shadow-md"
        >
          Print
        </Button>
      </div>
      <div className="w-full flex justify-center" style={{ zoom: 1.5 }}>
        <div>
          <div
            ref={contentRef}
            className={"flex flex-col items-center px-16 pb-16 pt-10 bg-white"}
          >
            {paperList.map((item, index) => {
              return (
                <>
                  <div className={reportStyle.pageLaout}>
                    <PaperPage indexPaper={index} list={item.list}></PaperPage>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
