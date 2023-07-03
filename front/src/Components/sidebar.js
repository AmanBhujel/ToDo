import React, { useState, useContext } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import './Sidebar.css'
import { Context } from '../App';

import { MdOutlineCancelPresentation } from "react-icons/md";
export default function Sidebar() {
    const {openSidebar, setOpenSidebar} = useContext(Context);
    const {selectedDate, setSelectedDate} = useContext(Context)
    const [handleDate,setHandleDate]=useState('')
    const currentDate = new Date() // Get the current date
    const toggleSidebar = () => {
        setOpenSidebar(false)
    }
    const handleDateChange = (date) => {
        console.log(date)
        setHandleDate(date)

    }
    const handleOkClick = () => {
        setSelectedDate(handleDate)

        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = selectedDate.toLocaleDateString('en-US', options).replace(/\//g, '-');
        
        console.log(formattedDate); // Output: "07-01-2023"

        // const formattedDate = selectedDate.toISOString(); // Convert the selected date to a string in ISO format

        const url = `/getFromDates?date=${formattedDate}`;

        fetch(url, {
            method: "get",
            headers: {
              "Content-Type": "application/json"
            },
          })
            .then((res) => res.json()) // Add return statement here
            .then((filtered) => {
              console.log("Here are your date filtered todos", filtered);
            })
            .catch((err) => console.log(err));
        
          console.log('Selected Date:', selectedDate);
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
