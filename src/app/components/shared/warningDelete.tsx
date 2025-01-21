import React from "react";
import warningImg from "../../../../public/images/animation_warning_delete.json";

import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function WarningDeleteComponent() {
  // const options = {
  //   animationData: warningImg,
  //   loop: true,
  //   autoplay: true,
  // };

  // const { View } = Lottie(options, { width: "300px", height: "300px" });
  return (
    <div className="flex flex-col items-center" style={{ padding: "20px" }}>
      <Lottie animationData={warningImg} loop={true} autoplay={true} style={{ width: "300px", height: "300px" }} />
      {/* {View} */}
    </div>
  );
}
