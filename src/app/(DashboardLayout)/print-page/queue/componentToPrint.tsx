"use client";
import { Button } from "flowbite-react";
import React, { useRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";

export default function componentToPrint() {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef
  });

  return (
    <>
      <div className="flex justify-end">
        <Button
          onClick={() => reactToPrintFn()}
          gradientDuoTone="purpleToBlue"
          className="w-48 shadow-md"
        >
          Print
        </Button>
      </div>
      <div ref={contentRef} className="flex flex-col items-center p-12">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl">หมายเลข</h2>
          <h1 className="text-6xl">5</h1>
        </div>
      </div>
    </>
  );
}
