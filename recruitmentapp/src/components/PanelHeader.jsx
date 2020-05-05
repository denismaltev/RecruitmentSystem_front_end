import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getAnnualProfitReport } from "../api/AdminApi";

const options = {
  layout: {
    padding: {
      left: 20,
      right: 20,
      top: 0,
      bottom: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    backgroundColor: "#fff",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
  },
  legend: {
    position: "bottom",
    fillStyle: "#FFF",
    display: false,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          fontColor: "rgba(255,255,255,0.4)",
          fontStyle: "bold",
          beginAtZero: true,
          maxTicksLimit: 5,
          padding: 10,
        },
        gridLines: {
          drawTicks: true,
          drawBorder: false,
          display: true,
          color: "rgba(255,255,255,0.1)",
          zeroLineColor: "transparent",
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
          color: "rgba(255,255,255,0.1)",
        },
        ticks: {
          padding: 10,
          fontColor: "rgba(255,255,255,0.4)",
          fontStyle: "bold",
        },
      },
    ],
  },
};

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
const PanelHeader = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (props.auth && props.auth.userRole === "admin") {
      getAnnualProfitReport({ token: props.auth.JWToken })
        .then((response) => {
          if (
            response.status === 200 &&
            response.data &&
            response.data.length > 0
          ) {
            let labels = [];
            let data = [];
            response.data.map((item) => {
              labels.push(
                `${months[new Date(item.toDate).getMonth()]}, ${new Date(
                  item.toDate
                ).getFullYear()}`
              );
              data.push(item.totalProfit);
            });

            const adminPanelChart = {
              data: (canvas) => {
                const ctx = canvas.getContext("2d");
                var chartColor = "#FFFFFF";
                var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
                gradientStroke.addColorStop(0, "#80b6f4");
                gradientStroke.addColorStop(1, chartColor);
                var gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
                gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
                gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.14)");

                return {
                  labels: labels,
                  datasets: [
                    {
                      label: "Profit $",
                      borderColor: chartColor,
                      pointBorderColor: chartColor,
                      pointBackgroundColor: "#2c2c2c",
                      pointHoverBackgroundColor: "#2c2c2c",
                      pointHoverBorderColor: chartColor,
                      pointBorderWidth: 1,
                      pointHoverRadius: 7,
                      pointHoverBorderWidth: 2,
                      pointRadius: 5,
                      fill: true,
                      backgroundColor: gradientFill,
                      borderWidth: 2,
                      data: data,
                    },
                  ],
                };
              },
              options: options,
            };
            setChart(adminPanelChart);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div
      className={
        "panel-header " +
        (props.size !== undefined ? "panel-header-" + props.size : "")
      }
    >
      {props.auth && props.auth.userRole === "admin" && !isLoading && (
        <Line data={chart.data} options={chart.options} />
      )}
    </div>
  );
};

export default PanelHeader;
