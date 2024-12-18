import ReactApexChart from "react-apexcharts";


const CustomerOrderChart = () => {
  const colors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0", "#546E7A", "#26a69a", "#D10CE8", "#22C55E", "#FF7171", "#FDE047", "#FF784B",];

  // Chart options and series
  const options = {
    chart: {
      height: 450,
      type: "bar",
      events: {
        click: function (chart, w, e) {
          console.log("Chart clicked", chart, w, e);
        },
      },
    },
    title: {
      text: 'Product Trends by Month',
      align: 'left'
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: "50%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [
        ["JAN"],
        ["FEB"],
        ["MAR"],
        ["APR"],
        ["MAY"],
        ["JUN"],
        ["JUL"],
        ["AUG"],
        ["SEP"],
        ["OCT"],
        ["NOV"],
        ["DEC"],

      ],
      labels: {
        style: {
          colors: colors,
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      min: 0, // Set the minimum value of Y-axis
      max: 40, // Set the maximum value of Y-axis
      labels: {
        style: {
          fontSize: "12px",
        },
      },
      title: {
        text: "Y-Axis Values",

      }
    },
  };

  const series = [
    {
      data: [21, 22, 10, 28, 16, 21, 13, 20, 25, 21, 31, 10,]
    },
  ];
  return (
    <div><ReactApexChart options={options} series={series} type="bar" height={450} /></div>
  )
}

export default CustomerOrderChart