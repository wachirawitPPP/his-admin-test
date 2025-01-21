import React from "react";
import loadingImg from "../../../../public/images/loading.json";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function LoadingComponent() {
  const options = {
    animationData: loadingImg,
    loop: true,
    autoplay: true,
  };

  const { View } = Lottie(options, { width: "300px", height: "300px" });
  return (
    <div className="flex flex-col items-center" style={{ padding: "20px" }}>
      {View}

      <p style={{ marginTop: "10px", fontSize: "24px" }}>Loading...</p>
    </div>
  );
}
