import { Box, CircularProgress } from '@mui/material'
import React from 'react'

type Props = {}

const ProgressBar = (props: Props) => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box></>
    )
}

export default ProgressBar