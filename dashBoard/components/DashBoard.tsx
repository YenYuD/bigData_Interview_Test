import React, { useEffect, useState } from 'react'
import { Button, Grid, Typography } from '@mui/material'
import CustomAutoComplete from './UI/CustomAutoComplete';
import { useForm } from "react-hook-form";
import taiwanDist from '../data/TaiwanDist.json';
import getPopulation from '../libs/getGovData';
import { useNavigate, useParams } from "react-router-dom";
import BarChart from '../components/UI/BarChart';
import PieChart from '../components/UI/PieChart';
import useMediaQuery from '@mui/material/useMediaQuery';
import ProgressBar from '../components/UI/ProgressBar';
import CustomDivider from '../components/UI/CustomDivider';


type DistType = {
    zip: string,
    name: string
}

const yearOptions = ['106', '107', '108', '109', '110', '111'];

const btnStyle = {
    fontFamily: 'ubuntu', backgroundColor: '#651FFF', color: '#FFFFFF', borderRadius: '4px',
    ':hover': {
        backgroundColor: '#651FFF',
        color: '#FFFFFF'
    },
    ':disabled': {
        backgroundColor: 'rgba(0,0,0,0.12)',
        color: 'rgba(0,0,0,0.26)'
    },
}

const DashBoard = () => {

    const matches = useMediaQuery('(max-width:900px)');

    const params = useParams();
    const navigate = useNavigate();

    const [distVal, setDistVal] = useState<DistType[] | []>([]);
    const [chartData, setChartData] = useState<any | null>(null);
    const [pieData, setPieData] = useState<any | null>(null);
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if (Object.keys(params).length) {
            const { year, county, district } = params;
            const getData = async () => {
                try {
                    setLoading(true);
                    const { columndataObj, pieDataObj } = await getPopulation(year!, county!, district!);
                    setChartData(columndataObj);
                    setPieData(pieDataObj);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
            getData();
        }
    }, [params])

    const { handleSubmit, control, watch, setValue } = useForm({
        defaultValues: {
            year: '',
            county: '',
            district: ''
        }
    });

    const year = watch('year');
    const county = watch('county');
    const dist = watch('district');

    const isFieldCompleted = !!year && !!county && !!dist

    const getCountyOptions = () => {
        const countyArr = taiwanDist.map(x => x.name);
        countyArr.unshift('請選擇縣/市')
        return countyArr;
    }


    useEffect(() => {
        if (county) {
            const { districts }: any = taiwanDist.find(x => x.name === county);
            setDistVal(districts);
            setValue('district', districts[0] || '')

        } else {
            setDistVal([])
        }

    }, [county])

    const onSubmit = (data: any) => {
        const { year, county, district: { name } } = data;

        navigate(`/${year}/${county}/${name}`);
    }

    return (
        <>
            <Grid className="p-4 tablet:w-[69%] flex justify-center !flex-col ">
                <p className="font-normal max-tablet:text-[2rem] text-center text-[25px]">人口數、戶數按戶別及性別統計</p>
                <Grid className="mt-[56px] gap-[12px] items-start flex max-tablet:!flex-col tablet:flex-row tablet:items-center justify-center mb-4">
                    <CustomAutoComplete control={control} name="year" label="年份" options={yearOptions} width={73} />
                    <CustomAutoComplete getOptionDisabled={(option: string) =>
                        option === getCountyOptions()[0]
                    } control={control} name="county" label="縣/市" placeholder="請選擇縣/市" options={getCountyOptions() || []} width={165} className={matches ? '!w-full' : ''} />
                    <CustomAutoComplete control={control} name="district" options={distVal} getOptionLabel={(option: DistType) => option.name} placeholder={county ? '區' : '請先選擇縣/市'} label={county ? '區' : ''} width={165} className={matches ? '!w-full' : ''} disabled={!county} />
                    <Button sx={btnStyle} className={`py-[10.25px] px-[14.5px] w-[83px] h-[40px] ${matches ? 'w-full' : ''}`} disabled={!isFieldCompleted} onClick={handleSubmit(onSubmit)}>SUBMIT</Button>
                </Grid>
                {loading && <ProgressBar />}
                {!loading && chartData &&
                    <>
                        <CustomDivider />
                        <Grid className="max-w-full flex !flex-col gap-8 ">
                            <Typography className="text-2xl text-center py-8">{params.year}年{params.county} {params.district}</Typography>
                            <BarChart chartData={chartData} />
                            <PieChart pieData={pieData} />
                        </Grid></>
                }
            </Grid>
        </>
    )
}

export default DashBoard


