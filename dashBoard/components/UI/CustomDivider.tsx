import { Chip, Divider } from '@mui/material'
import React from 'react'

type Props = {}

const CustomDivider = (props: Props) => {
    return (
        <>
            <Divider sx={{
                "&::before, &::after": {
                    borderColor: '#C29FFF',
                    transform: 'translateY(2px)'
                },
                marginTop: '42px'
            }}>
                <Chip sx={{ color: '#C29FFF', borderColor: '#B388FF', padding: '13px 8px' }} label="搜尋結果" size="small" variant="outlined" />
            </Divider></>
    )
}

export default CustomDivider