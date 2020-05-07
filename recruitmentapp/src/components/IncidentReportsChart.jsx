import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from "reactstrap";
import { Bar } from "react-chartjs-2";
import { getIncidentReports } from "../api/IncidentReportsApi";

function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}
const options = {
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
        ticks: {
          maxTicksLimit: 7,
        },
        gridLines: {
          zeroLineColor: "transparent",
          drawBorder: false,
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

const IncidentReportsChart = (props) => {
  const [chart, setChart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    var fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 13);
    getIncidentReports({
      token: props.auth.JWToken,
      count: 1000,
      page: 1,
      fromDate: fromDate,
      toDate: new Date(),
    })
      .then((response) => {
        if (response.status === 200 && response.data && response.data.result) {
          let labels = [];
          let data = [];
          for (
            let date = fromDate;
            date <= new Date();
            date.setDate(date.getDate() + 1)
          ) {
            let from = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate()
            );
            let to = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate() + 1
            );
            labels.push(from.toLocaleDateString());
            data.push(
              response.data.result.filter(
                (item) =>
                  new Date(item.date) >= from && new Date(item.date) < to
              ).length
            );
          }
          const chart = {
            data: (canvas) => {
              var ctx = canvas.getContext("2d");
              var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
              gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
              gradientFill.addColorStop(1, hexToRGB("#2CA8FF", 0.6));
              return {
                labels: labels,
                datasets: [
                  {
                    label: "Total incidents",
                    backgroundColor: gradientFill,
                    borderColor: "#2CA8FF",
                    pointBorderColor: "#FFF",
                    pointBackgroundColor: "#2CA8FF",
                    pointBorderWidth: 2,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 1,
                    pointRadius: 4,
                    fill: true,
                    borderWidth: 1,
                    data: data,
                  },
                ],
              };
            },
            options: options,
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
        <CardTitle tag="h4">Incident Reports</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="chart-area">
          {!isLoading && <Bar data={chart.data} options={chart.options} />}
        </div>
      </CardBody>
      <CardFooter>
        <div className="stats">
          <i className="now-ui-icons ui-2_time-alarm" /> Last 14 days
        </div>
      </CardFooter>
    </Card>
  );
};

export default IncidentReportsChart;
