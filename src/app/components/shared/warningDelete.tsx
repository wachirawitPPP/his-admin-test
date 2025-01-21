import React from "react";
import warningImg from "../../../../public/images/animation_warning_delete.json";
import { useLottie } from "lottie-react";

export default function WarningDeleteComponent() {
  const options = {
    animationData: warningImg,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, { width: "300px", height: "300px" });
  return (
    <div className="flex flex-col items-center" style={{ padding: "20px" }}>
      {View}
    </div>
  );
}
