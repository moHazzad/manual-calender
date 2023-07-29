import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; 
import Home from './Components/Pages/Home/Home.jsx';
import CreateCalendar from './Components/Pages/CreateCalendar/CreateCalendar.jsx';
import SelectTheme from './Components/Pages/SelectTheme/SelectTheme.jsx';
// import MonthsCalendar from './Components/Pages/AllMonthsCalendar/MonthsCalendar.jsx';
// import AntCalendarMonths from './Components/Pages/AllMonthsCalendar/AntCalendarMonths.jsx';
// import MonthsCalendar from './Components/Pages/AllMonthsCalendar/MonthsCalendar.jsx';
// import PreviewYear from './Components/Pages/AllMonthsCalendar/PreviewYear.jsx';
import AuthProvider from './AuthContext/AuthaContext.jsx';
import AntCalendarMonths from './Components/Pages/AllMonthsCalendar/AntCalendarMonths.jsx';
import PrintReview from './Components/Pages/PrintReview/PrintReview.jsx';
import Login from './Components/Pages/Login/Login.jsx';
import PrivetRout from './Components/PrivetRout/PrivetRout.jsx';
import CustomizedCalendars from './Components/Pages/CustomizedCalenders/CustomizedCalendars.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path:'/',
        element:<Home /> 
      },
      {
        path:'createCalendar',
        element:<PrivetRout> <CreateCalendar  /> </PrivetRout>
      },
      {
        path:'selecttheme',
        element:<SelectTheme  /> 
      },
      {
        path:'antcalendar',
        element: <AntCalendarMonths   /> 
      },
      {
        path:'/printReview/:id',
        element:<PrintReview   /> 
      },
      {
        path:'mycalendar',
        element: <CustomizedCalendars   /> 
      },
      {
        path:'login',
        element:<Login   /> 
      },
      // {
      //   path:'previewYear',
      //   element:<PreviewYear   /> 
      // },
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>

    <RouterProvider router={router} />
    </AuthProvider>
    
  </React.StrictMode>,
)
