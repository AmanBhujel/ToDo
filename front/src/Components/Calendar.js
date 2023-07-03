import React, { useState } from 'react'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';

import { TextField } from '@mui/material';



export default function Calendar() {
    const currentDate = new Date() // Get the current date

    const [value, setValue] = React.useState(new Date());
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
                orientation="portrait"
                defaultValue={currentDate}
            />

        </LocalizationProvider>
    )
}
