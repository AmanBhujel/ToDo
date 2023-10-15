import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Sidebar from './Components/sidebar';
import ToDo from './Components/ToDo';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'dark', // or 'dark' for a dark theme
    primary: {
      main: '#007bff', // Your primary color
    },
  },
});

const Context = React.createContext();

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const newDate = new Date();
  const [selectedDate, setSelectedDate] = useState(newDate)

  return (
    <>
      <Context.Provider value={{ openSidebar, setOpenSidebar, selectedDate: new Date(selectedDate), setSelectedDate }}>
        <ThemeProvider theme={theme}>

          {openSidebar && <Sidebar />}
          <ToDo />
        </ThemeProvider>
      </Context.Provider>
      <ToastContainer theme="dark" />
    </>
  );
}
export { Context };

export default App;
