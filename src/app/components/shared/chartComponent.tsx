"use client";
import React, { useContext, useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { CustomizerContext } from "@/app/context/customizerContext";
import { useTranslation } from "react-i18next";
import LoadingComponent from "../../components/shared/LoadingComponent";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ChartComponent() {
  const { activeMode } =
    useContext(CustomizerContext);
  const { t } = useTranslation();
  const [theme, setTheme] = useState("light");
  const [isClient, setIsClient] = useState(false);

  // Update theme based on activeMode or localStorage
  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");
    setIsClient(true);
    baseChartData.series[0].name = t("Summary");
    baseChartData.series[1].name = t("Wellness Clinic");
    baseChartData.series[2].name = t("Elderly Care Center");
    baseChartData.series[3].name = t("Hospital");
    baseChartData.series[4].name = t("Clinic");
    themeOverrides.yaxis.title.text = `${t("Number Of Clinic")} (${t(
      "Store"
    )})`;
  }, [activeMode]);

  // Base chart configuration
  const baseChartData = useMemo(
    () => ({
      series: [
        { name: t("Summary"), data: [10, 20, 30, 40, 50, 60, 70] },
        { name: t("Wellness Clinic"), data: [10, 25, 35, 45, 55, 65, 75] },
        { name: t("Elderly Care Center"), data: [10, 30, 40, 50, 60, 70, 80] },
        { name: t("Hospital"), data: [10, 35, 45, 55, 65, 75, 85] },
        { name: t("Clinic"), data: [10, 40, 50, 60, 70, 80, 90] },
      ],
      chart: {
        id: "line-chart",
        fontFamily: "inherit",
        zoom: { enabled: true },
        toolbar: { show: false },
      },
      dataLabels: { enabled: true },
      colors: [
        "#F59E0B",
        "#01C0C8",
        "#84CC16",
        "#6875F5",
        "#3F83F8",
        "#0E9F6E",
        "#F05252",
      ],
      grid: {
        show: true,
        borderColor: "#e7e7e7",
        row: { colors: ["#808999", "transparent"], opacity: 0.5 },
      },
      tooltip: { theme: "dark", fillSeriesColor: false },
    }),
    [t]
  );

  // Theme-specific overrides
  const themeOverrides = useMemo(() => {
    const isDark = theme === "dark";
    const textColor = isDark ? "#ffffff" : "#000000";
    const rowColors = isDark
      ? ["#808999", "transparent"]
      : ["#f3f3f3", "transparent"];
    return {
      xaxis: {
        categories: [
          "04/2024",
          "05/2024",
          "06/2024",
          "07/2024",
          "08/2024",
          "09/2024",
          "10/2024",
          "12/2024",
        ],
        axisBorder: { color: "rgba(173,181,189,0.3)" },
        labels: { style: { colors: textColor } },
      },
      yaxis: {
        labels: { style: { colors: textColor } },
        title: {
          text: `${t("Number Of Clinic")} (${t("Store")})`,
          style: { color: textColor },
        },
      },
      legend: { labels: { colors: textColor } },
      grid: { row: { colors: rowColors } },
    };
  }, [theme, t]);

  // Combine base config with theme-specific overrides
  const chartOptions = useMemo(
    () => ({
      ...baseChartData,
      ...themeOverrides,
    }),
    [baseChartData, themeOverrides]
  );

  return (
    <>
      {isClient ? (
        <Chart
          options={chartOptions}
          series={baseChartData.series}
          type="line"
          height="360px"
          width="100%"
        />
      ) : (
        <div>
          <LoadingComponent />
        </div>
      )}
    </>
  );
}
