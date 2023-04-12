import React from 'react';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type Props = {
    pieData: {
        household_ordinary_total: number,
        household_single_total: number,
    }
}

const PieChart = (props: Props) => {

    const { pieData } = props || {};

    if (!pieData) return <></>;

    const { household_ordinary_total, household_single_total } = pieData

    const options: Options = {
        chart: {
            plotShadow: false,
            type: 'pie',
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        title: {
            text: '戶數統計',
            style: {
                fontSize: '20px',
            }
        },
        series: [{
            type: 'pie',
            name: '共同生活',
            data: [
                {
                    name: '共同生活',
                    y: household_ordinary_total
                },
                {
                    name: '獨立生活',
                    y: household_single_total
                },
            ],
        },],
        tooltip: {
            formatter: function () {
                //@ts-ignore
                const parseNumber = parseInt(this.point.y);
                const formattedNumber = Highcharts.numberFormat(parseNumber, 0, '.', ',');
                return `${this.key}: ${formattedNumber}`;
            }
        },
        colors: ['#b3c6ff', '#809fff']
    }

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    )
}

export default PieChart