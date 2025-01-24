"use client";
import React from "react";
import warning from "../../../../public/images/animation-warning.json";
// import { useLottie } from "lottie-react";
import dynamic from "next/dynamic";
import { LottieRefCurrentProps } from "lottie-react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface props {
  animation: any;
  loop: boolean;
  width: string;
  height: string;
}
export default function RushAnimation({
  animation,
  loop,
  width,
  height,
}: props) {
  return (
    <div className="flex flex-col items-center" style={{ padding: "20px" }}>
      {/* {View} */}
      <Lottie
        animationData={animation}
        loop={loop}
        style={{ width: width, height: height }}
      />

      {/* <p style={{ marginTop: "10px", fontSize: "24px" }}>Loading...</p> */}
    </div>
  );
}
