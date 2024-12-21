import ReactApexChart from "react-apexcharts";


const LineChart = () => {
  const series = [{

    data: [5, 41, 30, 101, 49, 80, 10, 91, 148,20,30,100]
  }]


  const options = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Product Trends by Month',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on rows
        opacity: 0.5
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yaxis: {
      min: 0,  // Minimum value for y-axis
      max: 150, // Maximum value for y-axis
      tickAmount: 8, // Number of ticks/intervals on the y-axis
      labels: {
        formatter: function (value) {
          return value.toFixed(0); // Ensures no decimals on y-axis labels
        }
      },
      title: {
        text: "Y-Axis Values" // Label for the y-axis
      }
    }
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  )
}

export default LineChart