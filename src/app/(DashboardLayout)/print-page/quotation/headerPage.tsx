import React, { useRef } from "react";
import logo from "/public/images/logos/logo.svg";
import reportStyle from "../../../css/pages/report.module.css";
import localStyle from "./reportStyle.module.css";
import HeadConten from "./headConten";
import IconContent from "./iconContent";

export default function headerPage() {
  const phoneIcon = "ic:baseline-phone";
  const mailIcon = "ic:round-mail";
  const networkIcon = "zondicons:network";
  const userIcon = "mdi:user";
  const logo_ = "https://www.apsth.com/assets/images/logo/logo.svg";
  return (
    <>
      {/* Header */}
      <div className="w-full flex items-start justify-between">
        <div>
          <svg
            width="120px"
            height="1px"
            viewBox="0 0 48 1"
            version="1.1"
            xmlns={logo}
          ></svg>

          <img src={logo_} width={120} />
        </div>
        <div className="flex flex-col items-end">
          <a href="#" className={reportStyle.textNormalBold}>
            (ต้นฉบับ)
          </a>
          <a className={localStyle.header01}>ใบเสนอราคา</a>
        </div>
      </div>
      {/* Saler Address*/}
      <div className={localStyle.bottomLine}>
        <div className="w-full">
          <HeadConten
            title="ผู้ขาย"
            content="บริษัท เอพีเอส ทีเอช จำกัด"
            code="head"
          />
          <HeadConten
            title="ที่อยู่"
            content=" เลขที่ 888/8 หมู่บ้าน ไอคอนเน็ก หมู่ที่ 13 ถนน เหล่านาดี
                      ตำบลบ้านเป็ด อำเภอเมืองขอนแก่น จังหวัดขอนแก่น 40000"
            code="address"
          />
          <HeadConten
            title="เลขที่ภาษี"
            content=" 0405564007413 (สำนักงานใหญ่)"
            code=""
          />
        </div>
        <div className="w-full">
          <IconContent
            icon={phoneIcon}
            content="0981816769"
            code="normal"
          ></IconContent>
          <IconContent
            icon={mailIcon}
            content="apsth456@gmail.com"
            code="normal"
          ></IconContent>
          <IconContent
            icon={networkIcon}
            content="www.apsth.com"
            code="normal"
          ></IconContent>
        </div>
        <div className={localStyle.cardItem}>
          <div className="w-full h-4 flex justify-start  items-center">
            <div className="w-13">
              <a className={reportStyle.textNormalBold}>เลขที่เอกสาร :</a>
            </div>
            <div className="px-2 w-2/3">
              <a className={reportStyle.textNormal}>QO-2024111905</a>
            </div>
          </div>
          <HeadConten
            title="วันที่ออก"
            content="19/11/2024"
            code="card"
          ></HeadConten>
          <HeadConten title="วันที่ตอบรับ" content="-" code="card"></HeadConten>
          <HeadConten
            title="ใช้ได้ถึง"
            content="30/11/2024"
            code="card"
          ></HeadConten>
          <HeadConten title="อ้างอิง" content="-" code="card"></HeadConten>
        </div>
      </div>
      {/* Customer Addredss */}
      <div className={localStyle.cardNormal}>
        <div className="w-full">
          <HeadConten
            title="ลูกค้า"
            content="C00134 บริษัท วีวา เมดิเฮลท์ จำกัด"
            code="head"
          />
          <HeadConten
            title="ที่อยู่"
            content=" เลขที่ 15/2 ถนนชลประทาน ตำบลสุเทพ อำเภอเมืองเชียงใหม่ จังหวัดเชียงใหม่ 50200"
            code="address"
          />
          <HeadConten
            title="เลขที่ภาษี"
            content="0505567004708 (สำนักงานใหญ่)"
            code=""
          />
          <HeadConten title="เรียนคุณ" content="" code="" />
        </div>
        <div className="w-full">
          <div className="w-full">
            <IconContent
              icon={phoneIcon}
              content="0819618100"
              code="normal"
            ></IconContent>
            <IconContent
              icon={mailIcon}
              content="-"
              code="normal"
            ></IconContent>
            <IconContent
              icon={networkIcon}
              content="-"
              code="normal"
            ></IconContent>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full flex justify-start">
            <div className="w-14">
              <a className={reportStyle.textNormalBold}>ติดต่อกลับที่ :</a>
            </div>
            <div className="px-2 w-2/3">
              <a className={reportStyle.textNormal}></a>
            </div>
          </div>
          <IconContent
            icon={userIcon}
            content="ธุสาวดี สินธุศิริ"
            code="normal"
          ></IconContent>
          <IconContent
            icon={phoneIcon}
            content="0819618100"
            code="normal"
          ></IconContent>
          <IconContent icon={mailIcon} content="-" code="normal"></IconContent>
        </div>
      </div>
    </>
  );
}
