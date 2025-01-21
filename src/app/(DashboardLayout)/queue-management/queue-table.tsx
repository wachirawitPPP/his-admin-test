"use client";
import CardBox from "@/app/components/shared/CardBox";
import {
  Button,
  Dropdown,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { CustomizerContext } from "@/app/context/customizerContext";
import LoadingComponent from "../../components/shared/LoadingComponent";

const obj = {
  id: 1,
  name: "นาย ทดสอบ ทดสอบ",
  department: "แผนกฉุกเฉินและอุบัติเหตุ",
  roomId: "A1",
  status: "active",
};

const departmentList = [
  {
    id: 0,
    name: "ไม่ระบุ",
  },
  {
    id: 1,
    name: "แผนกฉุกเฉินและอุบัติเหตุ",
  },
  {
    id: 2,
    name: "แผนกจิตเวช",
  },
];

const roomList = [
  {
    id: 0,
    name: "ไม่ระบุ",
  },
  {
    id: 1,
    name: "A1",
  },
  {
    id: 2,
    name: "A2",
  },
];

const dataList = Array.from({ length: 100 }, (_, index) => ({
  ...obj,
  id: index + 1, // Increment the id field
  roomId: index % 2 != 0 ? "A2" : "A1", // "A2" for the first 11 items, "A1" for the rest
  department: index % 2 != 0 ? "แผนกฉุกเฉินและอุบัติเหตุ" : "แผนกจิตเวช",
  name: index % 2 != 0 ? "mr.test test" : "นาย ทดสอบ ทดสอบ",
}));
export default function QueueTable() {
  const [numQueue, setNumQueue] = React.useState(0);
  const [roomNumTH, setRoomNumTH] = React.useState("เอ2");
  const [roomNumEN, setRoomNumEN] = React.useState("A1");
  const [queueList, setQueueList] = React.useState(dataList);
  const [departmentFillter, setDepartmentFillter] = React.useState("ไม่ระบุ");
  const [roomIdFillter, setRoomIdFillter] = React.useState("ไม่ระบุ");
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const { activeMode, isLanguage, setIsLanguage } =
    useContext(CustomizerContext);

  let dropdownStyle =
    "w-56 shadow-md rounded-xl border-2 border-solid border-slate-300 px-4 flex flex-center justify-around";

  // voice speak
  function speak(respeak: boolean) {
    let num = numQueue;
    if (!respeak) {
      setNumQueue(numQueue + 1);
      num = numQueue + 1;
    }
    let text =
      "ขอเชิญหมายเลข" +
      num.toString() +
      "คุณ ประสาน ศรีโสภา" +
      "ที่ห้อง" +
      roomNumTH;
    let textEn =
      "number" +
      num.toString() +
      "prasan seesopar" +
      "at room number" +
      roomNumTH;
    let utterance = new SpeechSynthesisUtterance(text);
    let utteranceEn = new SpeechSynthesisUtterance(textEn);
    let voicesArray = speechSynthesis.getVoices();
    //  voicesArray filter "th-TH" thailand
    let voiceTH = voicesArray.filter(
      (item) =>
        item.lang == "th-TH" &&
        item.voiceURI ==
          "Microsoft Premwadee Online (Natural) - Thai (Thailand)"
    );
    let voiceEN = voicesArray.filter((item) => item.lang == "en-US");
    switch (isLanguage) {
      case "th":
        if (voiceTH.length > 0) utterance.voice = voiceTH[0];
        // speed speak rate 1-5 slow to fast
        utterance.rate = 1;
        utterance.pitch = 5;
        speechSynthesis.speak(utterance);
        break;
      case "en":
        if (voiceEN.length > 0) utterance.voice = voiceEN[0];
        // speed speak rate 1-5 slow to fast
        utteranceEn.rate = 1;
        utteranceEn.pitch = 5;
        speechSynthesis.speak(utteranceEn);
        break;
      default:
        if (voiceTH.length > 0) utterance.voice = voiceTH[0];
        // speed speak rate 1-5 slow to fast
        utterance.rate = 1;
        utterance.pitch = 5;
        speechSynthesis.speak(utterance);
        break;
    }
  }

  // fillter data list
  function fillter(mode: string, data: any) {
    switch (mode) {
      case "department":
        setDepartmentFillter(data.name);
        break;
      case "roomId":
        setRoomIdFillter(data.name);
        break;
      default:
        setDepartmentFillter("");
        setRoomIdFillter("");
        break;
    }
  }

  function searchFilter() {
    // กรองข้อมูลโดยใช้เงื่อนไขที่เลือกใน Dropdown
    const filteredList = dataList.filter((item) => {
      const matchDepartment =
        departmentFillter === "ไม่ระบุ" ||
        item.department === departmentFillter;
      const matchRoom =
        roomIdFillter === "ไม่ระบุ" || item.roomId === roomIdFillter;

      return matchDepartment && matchRoom;
    });

    // อัปเดตค่าของ queueList ด้วยรายการที่กรองแล้ว
    setQueueList(filteredList);
  }

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {isClient ? (
        <div>
          <div>
            <div className="w-full xl:flex xl:flex-row sm:flex-col gap-4  items-center sm:justify-between xl:justify-start">
              <div className="xl:w-1/3">
                <p className="text-4xl p-4 dark:text-white">
                  {t("Room Number")} {roomNumEN}
                </p>
              </div>
              <div className="xl:w-1/2 sm:w-full  flex  justify-items-end">
                <div className={`${dropdownStyle} mx-2 dark:text-white`}>
                  <Dropdown
                    label={
                      departmentFillter == "ไม่ระบุ"
                        ? t("Department Fillter")
                        : departmentFillter
                    }
                    placement="bottom"
                    inline
                  >
                    {departmentList.map((item, index) => (
                      <Dropdown.Item
                        key={item.id}
                        onClick={() => fillter("department", item)}
                      >
                        {item.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown>
                </div>
                <div className={`${dropdownStyle} mx-2 dark:text-white`}>
                  <Dropdown
                    label={
                      roomIdFillter == "ไม่ระบุ"
                        ? t("Room Fillter")
                        : roomIdFillter
                    }
                    placement="bottom"
                    inline
                  >
                    {roomList.map((item, index) => (
                      <Dropdown.Item
                        key={item.id}
                        onClick={() => fillter("roomId", item)}
                      >
                        {item.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown>
                </div>
                <div>
                  <Button
                    gradientDuoTone="purpleToBlue"
                    onClick={() => searchFilter()}
                  >
                    {t("Search")}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className=" xl:grid  xl:grid-cols-3 h-80">
            <div className="col-span-2 p-4  h-96">
              <div className="overflow-x-auto overflow-y-scroll h-full r-4 shadow-md rounded   ">
                <Table>
                  <TableHead className={`bg-cyan-200 dark:bg-cyan-700`}>
                    <TableHeadCell>{t("Number")}</TableHeadCell>
                    <TableHeadCell>{t("Name")}</TableHeadCell>
                    <TableHeadCell>{t("Department")}</TableHeadCell>
                    <TableHeadCell>{t("Room")}</TableHeadCell>
                    <TableHeadCell>{t("Status")}</TableHeadCell>
                  </TableHead>
                  <TableBody>
                    {queueList.map((item, index) => (
                      <TableRow
                        key={item.id}
                        className={`  dark:text-white hover:bg-cyan-50  dark:hover:bg-cyan-900 ${
                          item.roomId === roomNumEN
                            ? " font-bold"
                            : "dark:text-gray-400"
                        }`}
                      >
                        <TableCell className="whitespace-nowrap font-medium   ">
                          {item.id}
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.department}</TableCell>
                        <TableCell>{item.roomId}</TableCell>
                        <TableCell>{item.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="w-full p-4 h-2/6">
              <CardBox className="shadow-md  border-2 border-solid border-slate-300 w-full h-60 ">
                <div className="flex justify-center">
                  <h5 className="text-8xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {numQueue}
                  </h5>
                </div>
              </CardBox>
              <div className="flex flex-col justify-evenly w-full p-4">
                <div className="py-4">
                  <Button
                    gradientDuoTone="greenToBlue"
                    className="w-full shadow-md"
                    onClick={() => speak(false)}
                  >
                    <p className="text-2xl">{t("Next Queue")}</p>
                  </Button>
                </div>
                <div>
                  <Button
                    gradientDuoTone="redToYellow"
                    className="w-full shadow-md"
                    onClick={() => speak(true)}
                  >
                    <p className="text-2xl">{t("Repeat queue")}</p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <LoadingComponent />
        </div>
      )}
    </>
  );
}
