import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Routes, Route, Router } from 'react-router-dom';
import Calendar from './Components/Calendar';
import Sidebar from './Components/sidebar';

import ToDo from './Components/ToDo';

const Context = React.createContext();

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const newDate= new Date();
  const [selectedDate, setSelectedDate] = useState(newDate)



  return (
    <>
<Context.Provider value={{ openSidebar, setOpenSidebar, selectedDate: new Date(selectedDate), setSelectedDate }}>
        {openSidebar && <Sidebar />}
        <ToDo />


      </Context.Provider>




      {/* Your Routes and other components */}
      {/* <Routes>
          <Route path="/calendar" Component={Calendar} />
          <Route path="/" Component={ToDo} />
          <Route path="/sidebar" Component={Sidebar} />
        </Routes> */}


      <ToastContainer theme="dark" />
    </>
  );
}
export { Context };

export default App;
