import React from "react";
import loadingImg from "../../../../public/images/loading.json";
import { useLottie } from "lottie-react";

export default function LoadingComponent() {
  const options = {
    animationData: loadingImg,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, { width: "300px", height: "300px" });
  return (
    <div className="flex flex-col items-center" style={{ padding: "20px" }}>
      {View}

      <p style={{ marginTop: "10px", fontSize: "24px" }}>Loading...</p>
    </div>
  );
}
