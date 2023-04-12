import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller } from 'react-hook-form';



export default function CustomAutoComplete(props: any) {

    const { setValue } = props;


    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field: { ref, ...field } }) => (
                <Autocomplete
                    {...field}
                    onChange={(event: any, newValue: string | null) => {
                        setValue(newValue);
                    }}
                    disabled={props.disabled}
                    getOptionDisabled={props.getOptionDisabled}
                    defaultValue={props.defaultValue}
                    disableClearable
                    options={props.options}
                    sx={{
                        width: `${props.width}px`,
                        '& .MuiAutocomplete-input': {
                            '&[value]': {
                                color: 'black'
                            }
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                border: '2px solid #B6B6B6'
                            },
                            '&:hover fieldset': {
                                border: '2px solid black'
                            },
                            '&.Mui-focused fieldset': {
                                border: '2px solid #651FFF'
                            },
                        },
                        ' & .MuiInputLabel-root': {
                            color: 'black',
                            fontSize: '12px',
                            fontFamily: "Noto Sans TC",
                            '&.Mui-focused': {
                                color: '#651FFF',
                                fontSize: '12px',
                                fontWeight: 500
                            }
                        }

                    }}
                    renderInput={(params) => <TextField {...params} placeholder={props.placeholder} label={props.label} />}
                />
            )}
        />

    );
}