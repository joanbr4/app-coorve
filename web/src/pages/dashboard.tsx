import { useAuth } from "@/context/AuthProvider";
import { TdataChart } from "@/types/types";
import {
  Chart,
  PieController,
  ArcElement,
  Title,
  Legend,
  Tooltip,
  TooltipItem,
} from "chart.js";
// import { title } from "process";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

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
  // const [dataChart, setDataChart] = useState<{
  //   datasets: { data: number[] }[];
  //   labels: string[];
  // }>();
  const [dataChartFetch, setDataChartFetch] = useState<TdataChart>();

  const { user } = useAuth();
  const payload = { email: user?.email };

  useEffect(() => {
    fetch("/sheets", {
      method: "POST",
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        console.log("asd", res);
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        setDataChartFetch(data.data);
      });
  }, []);

  // let dataChart = { datasets: "", labels: "" };
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
        if (item == "otros") return listKeysRaw[7];
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
    // setDataChart(data);
  }
  const option = {
    layout: {
      padding: 30,
      autoPadding: true,
    },
    plugins: {
      title: {
        display: true,
        text: "Visualiza tus resultados",
        font: {
          size: 40,
          weight: "bold",
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
            weight: "lighter",
          },
        },
      },
      datalabels: {
        display: true,
        color: "white",
        formatter: (value: number, context: any) => {
          return value;
        },
        font: {
          size: 40,
        },
        align: "end", // Aligns labels to the end of the arc
        anchor: "end", // Anchors labels to the end of the arc
        offset: 8, // Moves labels away from the center of the arc
      },
      tooltip: {
        callbacks: {
          label: function (context: PieTooltipContext) {
            const label = context.raw;
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
    <div className="flex min-h-screen items-center justify-center">
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
