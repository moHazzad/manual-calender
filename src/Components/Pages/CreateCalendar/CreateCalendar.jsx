import React, { useContext, useState } from 'react';
import img from '../../../../public/calender .png'; // Remove the space in the image filename
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message, Menu, Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../AuthContext/AuthaContext';

const CreateCalendar = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  // const [selectedYear, setSelectedYear] = useState(null);

  const {selectedYear, setSelectedYear} = useContext(AuthContext)

  const onClick = ({ key }) => {
    const selectedItem = items.find((item) => item.key === key);
    if (selectedItem) {
      setSelectedOption(selectedItem.label); // Update the selected option label in the state
      message.info(`Click on item ${selectedItem.label}`);
    }
  };

  const handleYears = ({ key }) => {
    const selectedItem = years.find((item) => item.key === key);
    if (selectedItem) {
      setSelectedYear(selectedItem.label); // Update the selected year label in the state
      message.info(`Click on year ${selectedItem.label}`);
    }
  };
  const handleSize = ({ key }) => {
    const selectedItem = size.find((item) => item.key === key);
    if (selectedItem) {
      setSelectedSize(selectedItem.label); // Update the selected year label in the state
      message.info(`Click on year ${selectedItem.label}`);
    }
  };

  const size = [
    {
      label: '11x17',
      key:'1'
    },
    {
      label: '8.5x14',
      key:'2'
    },
  ]

  const items = [
    {
      label: 'Gift Envelope',
      key: '1',
    },
    {
      label: 'No Envelope',
      key: '2',
    },
  ];

  const years = [
    {
      label: '2023',
      key: '1',
    },
    {
      label: '2024',
      key: '2',
    },
    {
      label: '2025',
      key: '3',
    },
    {
      label: '2026',
      key: '4',
    },
  ];



  const handleCreateClick = () => {
    // Use the selectedOption and selectedYear state values here
    if (selectedOption && selectedYear) {
      message.success(`Creating with option: ${selectedOption} and year: ${selectedYear}`);
    } else {
      message.error('Please select an option and a year before creating.');
    }
  };

  const isButtonDisabled = !(selectedOption && selectedYear && selectedSize);

  return (
    <section className='w-[90%] mx-auto'>
      <div className='flex items-center justify-center h-screen gap-10'>
        <div className='w-[50%]  bg-indigo-100 flex items-center justify-center py-5 '>
          <img className='w-[60%]' src={img} alt="calendar" />
        </div>
        <div className='w-[50%] '>
          <h1 className='text-xl font-semibold'>Same-Day Folded Calendar</h1>
          <p>Order by 12PM to pick up by 6PM. Mark your dates with these special and unique Folded Calendars.</p>
          <div className='border px-5 py-32 flex flex-col gap-7'>
            <Dropdown
              overlay={<Menu onClick={handleSize} items={size} />}
              placement="bottomCenter"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {selectedSize ? selectedSize : 'Select Size'} {/* Display the selected option label */}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <Dropdown
              overlay={<Menu onClick={onClick} items={items} />}
              placement="bottomCenter"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {selectedOption ? selectedOption : 'Select Cover'} {/* Display the selected option label */}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <Dropdown
              overlay={<Menu onClick={handleYears} items={years} />} // Use the years data for the year dropdown
              placement="bottomCenter"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {selectedYear ? selectedYear : 'Select year'} {/* Display the selected year label */}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <Link to={'/selecttheme'}>
              <Button onClick={handleCreateClick} disabled={isButtonDisabled}>
                Start Customizing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateCalendar;
