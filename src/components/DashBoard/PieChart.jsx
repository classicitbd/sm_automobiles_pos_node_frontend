import ReactApexChart from "react-apexcharts"


const PieChart = () => {
  const series = [44, 55, 13, 43, 22, 14, 15],
    options = {
      chart: {
        type: 'pie',
        height: "100%", // Chart takes 100% of the container height
        width: "100%",  // Chart takes 100% of the container width
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F', 'Team G',],
      title: {
        text: 'Product Trends by Month',
        align: 'left'
      },
      legend: {
        show: true,
        position: "bottom", // Set legend position to bottom
        horizontalAlign: "center", // Align horizontally to center
        style: {
          fontSize: "14px", // Series font size
          fontWeight: "normal",
          colors: ["#333"], // Series text color
        },
      },
    }


  return (
    <div className="w-full h-[400px] sm:h-[360px] " ><ReactApexChart options={options} series={series} type="pie" height="100%"
      width="100%" /></div>
  )
}

export default PieChart