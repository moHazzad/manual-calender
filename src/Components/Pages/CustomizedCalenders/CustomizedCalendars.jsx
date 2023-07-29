import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Space, Table, Tag, Spin, message } from 'antd';

import { AuthContext } from '../../../AuthContext/AuthaContext';



const CustomizedCalendars = () => {
  const [myCalendar, setMyCalendar] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  // Function to handle delete button click
  const handleDelete = (key) => {
    // Make API call to delete the calendar
    axios
      .delete(`http://localhost:5000/mycalendar/${key}`)
      .then((response) => {
        console.log(response.data);
        // After deletion, fetch the updated data again
        setLoading(true);
        axios
          .get(`http://localhost:5000/mycalendar/${user.email}`)
          .then((response) => {
            console.log(response.data);
            setMyCalendar(response.data);
            message.success('Your Calender deleted')
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching data from MongoDB:', error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error('Error deleting calendar:', error);
      });
  };

  useEffect(() => {
    // Fetch the data from MongoDB
    if (user?.email) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/mycalendar/${user.email}`)
        .then((response) => {
          console.log(response.data);
          setMyCalendar(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data from MongoDB:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  const columns = [
    {
      title: 'Buyer',
      dataIndex: 'buyer',
      key: 'buyer',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a onClick={() => handleDelete(record.key)}>Delete</a>
          <a>Order</a>
        </Space>
      ),
    },
  ];

  // Format the data for the table
  const formattedData = myCalendar.map((item) => ({
    key: item._id, // Assuming _id is unique for each row, set it as the key
    buyer: item.buyer,
    year: item.year,
  }));

  return (
    <section className='w-[90%] mx-auto'>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table columns={columns} dataSource={formattedData} />
      )}
    </section>
  );
};

export default CustomizedCalendars;