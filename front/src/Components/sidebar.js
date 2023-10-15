import React, { useState, useContext } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import './Sidebar.css'
import { Context } from '../App';
import { MdOutlineCancelPresentation } from "react-icons/md";

export default function Sidebar() {
    const { openSidebar, setOpenSidebar } = useContext(Context);
    const { selectedDate, setSelectedDate } = useContext(Context)
    const [handleDate, setHandleDate] = useState('')
    const currentDate = new Date() // Get the current date
    const toggleSidebar = () => {
        setOpenSidebar(false)
    }
    const handleDateChange = (date) => {
        setHandleDate(date)
    }

    const handleOkClick = () => {
        setSelectedDate(handleDate)

        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = selectedDate.toLocaleDateString('en-US', options).replace(/\//g, '-');
        const url = `/getFromDates?date=${formattedDate}`;
        fetch(url, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .catch((err) => console.log(err));
        setOpenSidebar(false);
    };

    return (
        <div className='Sidebar'>
            <div className='sidebar-head'>
                <p>Search your previous Todos </p>
                <span className='icon-cancel' onClick={toggleSidebar}><MdOutlineCancelPresentation /></span>
            </div>
            <div className='calendar'>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <StaticDatePicker
                        orientation="portrait"
                        defaultValue={currentDate}
                        onChange={handleDateChange}
                    />

                </LocalizationProvider>
                <button className='select-btn' onClick={handleOkClick}>Select</button>


            </div>
        </div>
    )
}
