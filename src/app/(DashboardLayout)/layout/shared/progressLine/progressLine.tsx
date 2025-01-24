"use client";
import React, { useState, useEffect } from "react";

export default function ProgressLine({
  children,
  show,
}: {
  children: React.ReactNode;
  show: boolean;
}) {
  const [progressLoad, setProgressLoad] = useState<number>(0);
  
  useEffect(() => {
    if (!show) setProgressLoad(0);
    //Implementing the setInterval method
    const interval = setInterval(() => {
      setProgressLoad((value) => {
        if (value >= 100) {
          value = 100;
        } else {
          value += 5;
        }
        return value;
      });
    }, 20);
    //Clearing the interval
    return () => clearInterval(interval);
  }, [show]);

  return (
    <>
      {progressLoad < 100 && (
        <div className="w-full bg-transparent rounded-full h-1 ">
          <div
            className="bg-primary h-1 rounded-full shadow-md"
            style={{ width: `${progressLoad}%` }}
          ></div>
        </div>
      )}

      {children}
    </>
  );
}
