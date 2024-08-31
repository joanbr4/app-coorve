import { Tcontext, TdataChart, TdataSheetApi } from "@/types/types";
import {
  Chart,
  PieController,
  ArcElement,
  Title,
  Legend,
  Tooltip,
  TooltipItem,
} from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useOutletContext } from "react-router-dom";
import fetch from "cross-fetch";
import { url_be } from "./login";

Chart.register(
  PieController,
  ArcElement,
  Title,
  Legend,
  Tooltip,
  ChartDataLabels
);

type PieTooltipContext = TooltipItem<"pie">;

const CircularChart = () => {
  const [dataChartFetch, setDataChartFetch] = useState<TdataChart>();
  const authWindowRef = useRef<Window | null>(null);
  const { user, setParamId } = useOutletContext<Tcontext<string>>();
  // const payload = { email: user?.email };

  const refreshData = async () => {
    try {
      const response = await fetch(
        url_be + `/api/v1/google/sheets?userEmail=${user?.email}`,
        {
          credentials: "include",
        }
      );
      const data = (await response.json()) as TdataSheetApi;
      localStorage.setItem("access_token", data.token.access_token);
      localStorage.setItem("expiry_date", data.token.expiry_date);
      setDataChartFetch(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const param = url.pathname.split("/")[2];
    setParamId(param);

    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin !== import.meta.env.VITE_FE_DOCKER ??
        import.meta.env.VITE_FE_URL
      )
        return;
      if (event.data === "oauth-success") {
        localStorage.setItem("auth_token", event.data.token);
        if (authWindowRef.current) authWindowRef.current.close();
        refreshData();
      }
    };

    // Set up message listener
    window.addEventListener("message", handleMessage);

    fetch(url_be + `/api/v1/google/sheets?userEmail=${user?.email}`, {
      credentials: "include",
    })
      .then((res) => {
        console.log("asd", res);
        if (!res.ok) {
          authWindowRef.current = window.open(
            `${import.meta.env.VITE_BE_DOCKER ?? import.meta.env.VITE_BE_URL}/api/v1/google/auth?userEmail=${user?.email}`,
            "_blank",
            "width=500,height=600"
          );
          window.addEventListener("message", (event) => {
            if (
              event.origin !== import.meta.env.VITE_FE_DOCKER ??
              import.meta.env.VITE_FE_URL
            )
              return;
            if (event.data === "oauth-success") {
              localStorage.setItem("auth_token", event.data.token);
              authWindowRef.current?.close();
              refreshData();
            }
            // setDataChartFetch(undefined);
          });
        }
        return res.json() as Promise<TdataSheetApi>;
      })
      .then((data) => {
        localStorage.setItem("access_token", data.token.access_token);
        localStorage.setItem("expiry_date", data.token.expiry_date);
        setDataChartFetch(data.data);
      });
  }, []);

  let dataChart = {
    datasets: [
      {
        data: [0],
        // label: "Scores",
        // backgroundColor: [""],
        // hoverBackgroundColor: [""],
        // hoverOffset: 0, //in pixels outside
        // padding: 0,
        // circumference: 0,
        // rotation: 0,
      },
    ],
    labels: [""],
  };
  if (dataChartFetch) {
    console.log("23", dataChartFetch);
    const { total, ...rest } = dataChartFetch;
    const listKeysRaw = [
      "No interesa",
      "Fuera de presupuesto",
      "Cita realizada",
      "Contestaron",
      "NO contestaron",
      "Agendaron",
      "Renta",
      "No calificados",
      "Primer Contacto",
      "Interesado",
      "Otros",
    ];
    const listKeysClean = Object.entries(rest)
      .filter((item) => item[1] != 0)
      .map((item) => item[0])
      .map((item) => {
        if (item == "no_interesa") return listKeysRaw[0];
        if (item == "fuera_presupuesto") return listKeysRaw[1];
        if (item == "cita_realizada") return listKeysRaw[2];
        if (item == "contestaron") return listKeysRaw[3];
        if (item == "NO_contestaron") return listKeysRaw[4];
        if (item == "agendaron") return listKeysRaw[5];
        if (item == "renta") return listKeysRaw[6];
        if (item == "no_calificados") return listKeysRaw[7];
        if (item == "primer_contacto") return listKeysRaw[8];
        if (item == "interesado") return listKeysRaw[9];
        if (item == "otros") return listKeysRaw[10];
      }) as string[];

    console.log("keys", listKeysClean);
    const listValues = Object.entries(rest)
      .filter((item) => item[1] !== 0)
      .map((item) => item[1]);

    // const listValues = Array.from(Object.values(rest));
    const data = {
      datasets: [
        {
          // label: "Scores",
          data: listValues,
          backgroundColor: [
            "#FF6384", // Pink (Original)
            "#36A2EB", // Blue (Original)
            "#FFCE56", // Yellow (Original)
            "#4BC0C0", // Green
            "#9966FF", // Purple
            "#FF9F40", // Orange
            "#FF4500", // Red
            "#FA8072", // Salmon
            "#ffffff", //white
          ],
          hoverBackgroundColor: [
            "#FF6384", // Pink (Original)
            "#36A2EB", // Blue (Original)
            "#FFCE56", // Yellow (Original)
            "#4BC0C0", // Green
            "#9966FF", // Purple
            "#FF9F40", // Orange
            "#FF4500", // Red
            "#FA8072", // Salmon
            "#fff", //white
          ],
          hoverOffset: 20, //in pixels outside
          padding: 8,
          circumference: 180,
          rotation: 270,
        },
      ],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: listKeysClean,
    };
    dataChart = data;
  }

  const option = {
    layout: {
      padding: 39,
      autoPadding: true,
    },
    plugins: {
      title: {
        display: true,
        text: "Visualiza tus resultados",
        font: {
          size: 40,
          weight: "bold" as const,
        },
        color: "white",
        fullSize: true,
      },
      legend: {
        display: true,
        labels: {
          color: "white",
          padding: 40,
          boxHeight: 20,
          font: {
            size: 14,
            weight: "lighter" as const,
          },
        },
      },
      datalabels: {
        display: true,
        color: "white",
        formatter: (
          value: number
          // context: any
        ) => {
          return value;
        },
        font: {
          size: 40,
        },
        align: "end" as const, // Aligns labels to the end of the arc
        anchor: "end" as const, // Anchors labels to the end of the arc
        offset: 8, // Moves labels away from the center of the arc
      },
      tooltip: {
        callbacks: {
          label: function (context: PieTooltipContext) {
            const label = context.raw as string;
            // let label = context.label || "";

            // if (label) {
            //   label += ": ";
            // }
            // if (context.raw !== null) {
            //   label += context.raw;
            // }
            return label;
          },
        },
      },
    },
    responsive: true,
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800">
      <div className="flex flex-col ">
        <div className="p-8 sm:w-[500px] md:w-[700px] lg:w-[900px]">
          {dataChart ? <Pie data={dataChart} options={option} /> : null}
        </div>
        {dataChartFetch && (
          <h1 className="mx-auto w-1/3 rounded-md border bg-white py-2 text-lg font-bold text-blue-900">
            Total: {dataChartFetch.total}
          </h1>
        )}
      </div>
    </div>
  );
};

export default CircularChart;
