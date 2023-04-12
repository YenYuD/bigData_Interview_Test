import React, { useState } from 'react'
import { Grid, Typography } from '@mui/material'
import CustomAutoComplete from './UI/CustomAutoComplete';
import { useForm } from "react-hook-form";
import taiwanDist from '../data/TaiwanDist.json';


type Props = {}

const DashBoard = (props: Props) => {

    const yearOptions = ['109', '110', '111'];
    const [value, setValue] = useState<string | null>('');

    const { handleSubmit, reset, control } = useForm();

    const getCountyOptions = () => {
        const countyArr = taiwanDist.map(x => x.name);
        countyArr.unshift('請選擇縣/市')
        return countyArr;
    }



    return (
        <>
            <Grid className="w-[69%] border border-black">
                <p className="font-normal text-[2rem] text-center">人口數、人口數、戶數按戶別及性別統計</p>
                <Grid className="mt-[46px]">
                    <CustomAutoComplete control={control} name="year" label="年份" options={yearOptions} width={73} />
                    <CustomAutoComplete getOptionDisabled={(option: string) =>
                        option === getCountyOptions()[0]
                    } control={control} name="county" label="縣/市" placeholder="請選擇縣/市" setValue={setValue} options={getCountyOptions()} width={165} />
                    <CustomAutoComplete control={control} name="district" label={value ? "區" : '請先選擇縣/市'} options={yearOptions} width={165} disabled={!value} />
                </Grid>
            </Grid>
        </>
    )
}

export default DashBoard


