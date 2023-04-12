import React from 'react';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type Props = {
    chartData: any
}




const BarChart = (props: Props) => {

    const { chartData } = props;

    const { household_ordinary_m, household_ordinary_f, household_single_m, household_single_f } = chartData || {};

    const options: Options = {
        chart: {
            type: 'column',
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true,
                    format: '{y}', // 設置要顯示的數字格式，這裡使用 {y} 表示顯示數據的 y 值
                    verticalAlign: 'top' // 設置數字在柱形上方顯示
                }
            }
        },
        title: {
            text: '人口數統計'
        },
        series: [{
            name: '男性',
            type: 'column',
            data: [household_ordinary_m, household_single_m,],
        }, {
            name: '女性',
            type: 'column',
            data: [household_ordinary_f, household_single_f,]
        }],
        xAxis: {
            categories: ['共同生活', '獨立生活'],

        },
        colors: ['#9966ff', '#ccb3ff']
    }

    return (
        <>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </>
    )
}

export default BarChart