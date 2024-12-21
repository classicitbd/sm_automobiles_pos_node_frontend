import ReactApexChart from "react-apexcharts"
import { useState } from 'react';


const MultipleBars = () => {
  const [state, setState] = useState({

    series: [44, 55, 67],
    options: {
      chart: {
        height: "100%", // Chart takes 100% of the container height
        width: "100%",
        type: 'radialBar',

      },
      title: {
        text: 'Sale Target',
        align: 'left'
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return 249
              }
            }
          }
        }
      },
      labels: ['WEEKLY', 'MONTHLY', 'YEARLY',],
      legend: {
        show: true,
        position: "bottom", // Set legend position to bottom
        horizontalAlign: "center", // Align horizontally to center
      },
      colors: ["#00E396", "#FF4560", "#D10CE8"]
    },


  })
  return (
    <div className="w-full h-[300px] lg:h-[320px] xl:h-full " ><ReactApexChart options={state.options} series={state.series} type="radialBar" height="100%"
      width="100%" /></div>
  )
}

export default MultipleBars