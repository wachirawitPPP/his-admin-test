import React from "react";
import warning from "../../../../public/images/animation_whp.json";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function WarningComponent() {
  const options = {
    animationData: warning,
    loop: true,
    autoplay: true,
  };

  const { View } = Lottie(options, { width: "300px", height: "300px" });
  return (
    <div className="flex flex-col items-center" style={{ padding: "20px" }}>
      {View}

      {/* <p style={{ marginTop: "10px", fontSize: "24px" }}>Loading...</p> */}
    </div>
  );
}
