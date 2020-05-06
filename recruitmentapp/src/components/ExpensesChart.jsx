import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from "reactstrap";
import { Line } from "react-chartjs-2";
import { getCurrentMonthExpenses } from "../api/AdminApi";

const chartColor = "#FFFFFF";
var gradientChartOptionsConfigurationWithNumbersAndGrid = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    bodySpacing: 4,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
    xPadding: 10,
    yPadding: 10,
    caretPadding: 10,
  },
  responsive: 1,
  scales: {
    yAxes: [
      {
        gridLines: {
          zeroLineColor: "transparent",
          drawBorder: false,
        },
        ticks: {
          maxTicksLimit: 7,
        },
      },
    ],
    xAxes: [
      {
        display: 0,
        ticks: {
          display: false,
        },
        gridLines: {
          zeroLineColor: "transparent",
          drawTicks: false,
          display: false,
          drawBorder: false,
        },
      },
    ],
  },
  layout: {
    padding: { left: 0, right: 0, top: 15, bottom: 15 },
  },
};

const ExpensesChart = (props) => {
  const [chart, setChart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getCurrentMonthExpenses({ token: props.auth.JWToken })
      .then((response) => {
        if (
          response.status === 200 &&
          response.data &&
          response.data.length > 0
        ) {
          let labels = response.data.map((item) => {
            return new Date(item.fromDate).toLocaleDateString();
          });
          let data = response.data.map((item) => {
            return item.amount;
          });
          const chart = {
            data: (canvas) => {
              var ctx = canvas.getContext("2d");
              var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
              gradientStroke.addColorStop(0, "#80b6f4");
              gradientStroke.addColorStop(1, chartColor);
              var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
              gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
              gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");
              return {
                labels: labels,
                datasets: [
                  {
                    label: "Total expenses $",
                    borderColor: "#f96332",
                    pointBorderColor: "#FFF",
                    pointBackgroundColor: "#f96332",
                    pointBorderWidth: 2,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 1,
                    pointRadius: 4,
                    fill: true,
                    backgroundColor: gradientFill,
                    borderWidth: 2,
                    data: data,
                  },
                ],
              };
            },
            options: gradientChartOptionsConfigurationWithNumbersAndGrid,
          };
          if (mounted) {
            setChart(chart);
            setIsLoading(false);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => (mounted = false);
  }, [props.auth.JWToken]);

  return (
    <Card className="card-chart">
      <CardHeader>
        <CardTitle tag="h4">Current Month's Expenses</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="chart-area">
          {!isLoading && <Line data={chart.data} options={chart.options} />}
        </div>
      </CardBody>
      <CardFooter>
        <div className="stats">
          {new Date().toLocaleString("default", { month: "long" })}{" "}
          {new Date().getFullYear()}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ExpensesChart;
