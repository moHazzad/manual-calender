import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Button, Menu, Space, Upload, Modal, Form, Input, Calendar, Badge } from 'antd';
import { DownOutlined, UploadOutlined } from '@ant-design/icons';
// import { AuthContext } from '../../../AuthContext/AuthaContext';
import PreviewYear from './PreviewYear';
import { AuthContext } from '../../../AuthContext/AuthaContext';

const MonthsCalendar = () => {
  const {
    selectedYear,
    // setSelectedYear,
    monthImages,
    // setMonthImages,
    // modalVisible,
    // setModalVisible,
    // selectedDate,
    // setSelectedDate,
    // taskTitle,
    // setTaskTitle,
    tasksByDate,
    // setTasksByDate,
  } = useContext(AuthContext);

  const [showPreview, setShowPreview] = useState(false);

  // ... (other parts of the component)

  const handleReview = () => {
    setShowPreview(true);
  };

  // ... (other parts of the component)

  return (
    <section className="w-[90%] mx-auto">
      {/* ... (other parts of the component) */}

      {showPreview ? (
        <PreviewYear year={selectedYear} months={months} monthImages={monthImages} tasksByDate={tasksByDate} />
      ) : (
        <div>
          {/* Render your calendar and other components here */}
          {/* ... */}
          {/* ... */}
        </div>
      )}

      <Modal
        // ... (other modal settings)
      >
        {/* ... (modal content) */}
      </Modal>

      <div>
        <Link to={'/previewYear'}>
          <Button onClick={handleReview}>Review Year</Button>
        </Link>
        {/* <Button onClick={handlePrint}>Print Year Calendar</Button> */}
      </div>
    </section>
  );
};

export default MonthsCalendar;
