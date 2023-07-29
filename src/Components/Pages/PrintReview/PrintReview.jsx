import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import emptyImg from '../../../../public/empty.png';
import {  Button, Space, Spin } from 'antd';
import { AuthContext } from '../../../AuthContext/AuthaContext';


const PrintReview = () => {
  const [loading, setLoading] = useState(true);
  const [monthsData, setMonthsData] = useState([]);
  const { uniqueId,selectedYear } = useContext(AuthContext);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = (year, month) => new Date(year, month, 1).getDay();

  useEffect(() => {
    // Fetch the data from MongoDB
    if (uniqueId) {
      setLoading(true)
      axios
        .get(`http://localhost:5000/yearinfo/${uniqueId}`)
        .then((response) => {
          console.log(response.data);
          setMonthsData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data from MongoDB:', error);
          setLoading(false);
        });
    }
  }, [uniqueId]);

  if (loading) {
    return (
      <div className='w-full justify-center items-center'>
        <Space>
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </Space>
      </div>
    );
  }

  return (
    <div className="w-[80%] mx-auto">
      <div className="grid grid-cols-2 gap-4 justify-center items-stretch">
        {months.map((month, index) => {
          const monthData = monthsData;
          const monthImage = monthData.monthImages[index] || '';
          const tasksForMonth = monthData.tasks || [];

          return (
            <div key={index} className="month-calendar flex flex-col  border w-[450px]">
              
              <div className="image-container w-full h-[450px]  flex justify-center items-center object-cover">
                {/* Display the image here */}
                {monthImage ? (
                  <img src={monthImage} alt={month} className="month-image h-full w-full p-10 bg-slate-600 " />
                ) : (
                  <img src={emptyImg} alt="" className="month-image h-full w-full" />
                )}
              </div>
              <div className='pt-6 pb-4 px-4 bg-purple-300  flex flex-col content-end '>
                <table className=" w-full  h-44  bg-white text-xs">
                  <thead>
                    <tr>
                      <th className='px-2'>Sun</th>
                      <th className='px-2'>Mon</th>
                      <th className='px-2'>Tue</th>
                      <th className='px-2'>Wed</th>
                      <th className='px-2'>Thu</th>
                      <th className='px-2'>Fri</th>
                      <th className='px-2'>Sat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 6 }, (_, weekIndex) => (
                      <tr key={weekIndex} className='py-4'>
                        {Array.from({ length: 7 }, (_, dayOfWeek) => {
                          const dayNumber = weekIndex * 7 + dayOfWeek - firstDayOfWeek(2023, index) + 1;
                          const tasksForDate = tasksForMonth.filter(
                            (task) => task.day === dayNumber && task.month === index
                          );
                          return (
                            <td className='border w-10 h-16 text-xs' key={dayOfWeek} onClick={() => handleDayClick(dayNumber, index)}>
                              {dayNumber > 0 && dayNumber <= daysInMonth(2023, index) ? dayNumber : ''}
                              <div className="task-container w-full  break-words text-[8px] flex items-center justify-center text-center ">
                                {tasksForDate.map((task, taskIndex) => (
                                  <p key={taskIndex} className="task w-full">
                                    {task.description}
                                  </p>
                                ))}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className=''>
                <span className='text-end'>{month}</span>
                <span className='text-end'>{selectedYear}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
        <Button type="">Save</Button>

    </div>
  );
};

export default PrintReview;
