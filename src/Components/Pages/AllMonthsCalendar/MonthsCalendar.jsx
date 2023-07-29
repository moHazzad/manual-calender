// import React, { useContext, useState } from 'react';
// import { Dropdown, Button, Menu, Space, Upload, Modal, Form, Input, Calendar, Badge } from 'antd';
// import { DownOutlined, UploadOutlined } from '@ant-design/icons';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../../../AuthContext/AuthaContext';


// const MonthsCalendar = () => {
//   const {
//     selectedYear,
//     setSelectedYear,
//     selectedMonth,
//     setSelectedMonth,
//     monthImages,
//     setMonthImages,
//     modalVisible,
//     setModalVisible,
//     selectedDate,
//     setSelectedDate,
//     taskTitle,
//     setTaskTitle,
//     tasksByDate,
//     setTasksByDate
//   } = useContext(AuthContext)


//   console.log(monthImages);

//   const handleYearSelect = ({ key }) => {
//     const selectedItem = years.find((item) => item.key === key);
//     if (selectedItem) {
//       setSelectedYear(selectedItem.label);
//       setSelectedMonth(null); // Reset the selected month when a new year is selected
//       setSelectedDate(null); // Reset the selected date when a new year is selected
//     }
//   };

//   const handleMonthSelect = ({ key }) => {
//     const selectedMonthValue = months.find((item) => item.key === key)?.value;
//     if (selectedMonthValue) {
//       setSelectedMonth(selectedMonthValue);
//     }
//   };

//   const handleMonthCoverImage = (file, monthKey) => {
//     const imageUrl = URL.createObjectURL(file);
//     setMonthImages({
//       ...monthImages,
//       [monthKey]: imageUrl,
//     });
//   };

//   const handleDateClick = (value) => {
//     setSelectedDate(value);
//     setTaskTitle('');
//     setModalVisible(true);
//   };

//   const handleAddTask = () => {
//     const formattedDate = selectedDate.format('YYYY-MM-DD');
//     const existingTasks = tasksByDate[formattedDate] || [];
//     const newTask = {
//       type: 'success', // You can customize the type if needed
//       content: taskTitle,
//     };
//     const updatedTasks = [...existingTasks, newTask];

//     setTasksByDate({
//       ...tasksByDate,
//       [formattedDate]: updatedTasks,
//     });

//     setSelectedDate(null);
//     setTaskTitle('');
//     setModalVisible(false);
//   };

//   const handleReview = () => {
//     // Implement the review year functionality here
//   };

//   const handlePrint = () => {
//     // Implement the print year calendar functionality here
//   };

//   // Years data
//   const years = [
//     {
//       label: '2023',
//       key: '1',
//     },
//     {
//       label: '2024',
//       key: '2',
//     },
//     // Add other years as needed
//   ];

//   const months = [
//     { name: 'January', value: '01', key: '1' },
//     { name: 'February', value: '02', key: '2' },
//     { name: 'March', value: '03', key: '3' },
//     { name: 'April', value: '04', key: '4' },
//     { name: 'May', value: '05', key: '5' },
//     { name: 'June', value: '06', key: '6' },
//     { name: 'July', value: '07', key: '7' },
//     { name: 'August', value: '08', key: '8' },
//     { name: 'September', value: '09', key: '9' },
//     { name: 'October', value: '10', key: '10' },
//     { name: 'November', value: '11', key: '11' },
//     { name: 'December', value: '12', key: '12' },
//   ];


  
//   return (
//     <section className="w-[90%] mx-auto">
//       <div className="w-[80%] mx-auto">
//         <Dropdown
//           overlay={<Menu onClick={handleYearSelect} items={years} />}
//           placement="bottomCenter"
//         >
//           <a onClick={(e) => e.preventDefault()}>
//             <Space>
//               {selectedYear ? selectedYear : 'Select year'}
//               <DownOutlined />
//             </Space>
//           </a>
//         </Dropdown>
//         {selectedYear && (
//           <div>
//             <Dropdown
//               overlay={<Menu onClick={handleMonthSelect} items={months} />}
//               placement="bottomCenter"
//             >
//               <a onClick={(e) => e.preventDefault()}>
//                 <Space className="">
//                   {selectedMonth ? months.find((month) => month.value === selectedMonth)?.name : 'Select month'}
//                   <DownOutlined />
//                 </Space>
//               </a>
//             </Dropdown>
//             {selectedMonth && (
//               <div>
//                 <div>
//                   <div className="font-bold text-xl mb-2">
//                     {months.find((month) => month.value === selectedMonth)?.name}
//                   </div>
//                   {monthImages[`${selectedYear}-${selectedMonth}`] && (
//                     <img
//                       src={monthImages[`${selectedYear}-${selectedMonth}`]}
//                       alt=""
//                       className="w-full h-40 object-cover"
//                     />
//                   )}
//                   <Upload
//                     showUploadList={false}
//                     beforeUpload={(file) => handleMonthCoverImage(file, `${selectedYear}-${selectedMonth}`)}
//                   >
//                     <Button className="w-full mt-2" icon={<UploadOutlined />}>
//                       Upload Cover Image
//                     </Button>
//                   </Upload>
//                 </div>
//               </div>
//             )}
//             <div>
//               <Calendar
//                 cellRender={(value) => (
                  

//                   <div>
//                     {/* {monthImages[value.format('YYYY-MM')] && (
//                       <img src={monthImages[value.format('YYYY-MM')]} alt="" className="w-full h-40 object-cover" />
//                     )} */}
//                     <ul className="events">
//                       {tasksByDate[value.format(`${selectedYear}-MM-DD`)]?.map((item, index) => (
//                         <li key={index}>
//                           <Badge status={item.type} text={item.content} />
//                         </li>
//                       ))}
//                       <li onClick={() => handleDateClick(value)}>
//                         <Button type="link" className="w-full">
//                           {tasksByDate[value.format('YYYY-MM-DD')]?.length > 0 ? 'Edit Task' : ''}
//                         </Button>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//                 headerRender={({ value, type, onChange }) => {
//                   const handleMonthChange = (newValue) => {
//                     setSelectedDate(null);
//                     setModalVisible(false);
//                     onChange(newValue);
//                   };

//                   return (
//                     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                       <div>
//                         <Button onClick={() => handleMonthChange(value.clone().subtract(1, 'months'))}>
//                           Previous Month
//                         </Button>
//                         <Button onClick={() => handleMonthChange(value.clone().add(1, 'months'))}>Next Month</Button>
//                       </div>
//                       <div>
//                         <p>
//                           {[value.format(`MMMM-${selectedYear}`)]}
//                         </p>
//                       </div>
//                       <div>
//                         <Button onClick={() => handleMonthChange(value.clone().subtract(1, 'years'))}>
//                           Previous Year
//                         </Button>
//                         <Button onClick={() => handleMonthChange(value.clone().add(1, 'years'))}>Next Year</Button>
//                       </div>
//                     </div>
//                   );
//                 }}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//       <Modal
//         title={selectedDate ? 'Edit Task' : 'Add Task'}
//         visible={modalVisible}
//         onCancel={() => setModalVisible(false)}
//         footer={[
//           <Button key="cancel" onClick={() => setModalVisible(false)}>
//             Cancel
//           </Button>,
//           <Button key="add" type="primary" onClick={handleAddTask}>
//             {selectedDate ? 'Save' : 'Add'}
//           </Button>,
//         ]}
//       >
//         <Form>
//           <Form.Item label="Task Title">
//             <Input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
//           </Form.Item>
//         </Form>
//       </Modal>
//       <div>
//         <Link to={'/previewYear'}><Button onClick={handleReview}>Review Year</Button></Link>
//         <Button onClick={handlePrint}>Print Year Calendar</Button>
//       </div>
//     </section>
//   );
// };

// export default MonthsCalendar;
