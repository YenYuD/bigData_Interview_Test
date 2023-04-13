import React from 'react';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type Props = {
    chartData: {
        household_ordinary_m: number, household_ordinary_f: number, household_single_m: number, household_single_f: number
    }
}

const BarChart = (props: Props) => {

    const { chartData } = props;

    if (!chartData) return <></>

    const { household_ordinary_m, household_ordinary_f, household_single_m, household_single_f } = chartData || {};

    const options: Options = {
        chart: {
            type: 'column',
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:,.0f}',
                    verticalAlign: 'top', // 設置數字在柱形上方顯示
                    y: -20
                }
            }
        },
        title: {
            text: '人口數統計',
            style: {
                fontSize: '20px',
            }
        },
        series: [{
            name: '男性',
            type: 'column',
            data: [household_ordinary_m, household_single_m,],
            dataLabels: {
                enabled: true,
                formatter: function () {
                    //@ts-ignore
                    const parseNumber = parseInt(this.value);
                    return Highcharts.numberFormat(parseNumber, 0, '.', ',');
                }
            }
        }, {
            name: '女性',
            type: 'column',
            data: [household_ordinary_f, household_single_f,],
            dataLabels: {
                enabled: true,
                formatter: function () {
                    //@ts-ignore
                    const parseNumber = parseInt(this.value);
                    return Highcharts.numberFormat(parseNumber, 0, '.', ',');
                }
            }
        }],
        xAxis: {
            categories: ['共同生活', '獨立生活'],
            title: {
                text: '型態',
                style: {
                    fontSize: '14px',
                    color: 'black'
                }
            },

        },
        yAxis: {
            title: {
                text: '數量',
                rotation: 0,
                align: 'high',
                y: -20,
                x: 30,
                style: {
                    fontSize: '14px',
                    color: 'black'
                }
            },
            labels: {
                formatter: function () {
                    //@ts-ignore
                    const parseNumber = parseInt(this.value);
                    return Highcharts.numberFormat(parseNumber, 0, '.', ',');
                }
            }
        },
        tooltip: {
            formatter: function () {
                //@ts-ignore
                const parseNumber = parseInt(this.point.y);
                const formattedNumber = Highcharts.numberFormat(parseNumber, 0, '.', ',');
                return `${this.key}: ${this.series.name} ${formattedNumber}人`;
            }
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