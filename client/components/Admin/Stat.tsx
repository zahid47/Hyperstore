import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Stat = ({ ordersState }: any) => {
  const [numberOfOrdersByStatus, setNumberOfOrdersByStatus] = useState<
    number[]
  >([0, 0, 0, 0, 0]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Orders by status",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Number of orders",
        },
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const labels = [
    "Pending",
    "Confirmed",
    "On the way",
    "Delivered",
    "Cancelled",
  ];

  useEffect(() => {
    setNumberOfOrdersByStatus([
      ordersState.filter((order: any) => order.status === "pending").length,
      ordersState.filter((order: any) => order.status === "confirmed").length,
      ordersState.filter((order: any) => order.status === "on the way").length,
      ordersState.filter((order: any) => order.status === "delivered").length,
      ordersState.filter((order: any) => order.status === "cancelled").length,
    ]);
  }, [ordersState]);

  const data = {
    labels,
    datasets: [
      {
        label: "Number of orders",
        data: numberOfOrdersByStatus,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default Stat;
