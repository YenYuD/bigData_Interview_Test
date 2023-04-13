import { useState } from 'react'
import { Grid } from '@mui/material';
import GearSVG from '/Vector.svg';
import TaiwanSVG from '/brand.svg';
import DashBoard from '../components/DashBoard'

function App() {

  return (
    <div className="App">
      <img src={TaiwanSVG} className="fixed -z-10 top-[58px] max-tablet:opacity-[12%]"></img>
      <Grid className="w-full px-4 py-[10px] bg-[#651FFF] flex justify-between h-[48px] items-center shadow-gray mb-[10px]">
        <p className="text-white  font-bold text-base font-ubuntu">LOGO</p>
        <Grid className="border border-white border-opacity-25 rounded-lg w-[30px] h-[30px] p-[7px] flex justify-center items-center">
          <img src={GearSVG}></img>
        </Grid>
      </Grid>
      <Grid className="flex justify-center pt-4 ">
        <DashBoard />
      </Grid>
    </div>
  )
}

export default App
