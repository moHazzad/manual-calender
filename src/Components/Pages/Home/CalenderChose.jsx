import React from 'react'
import { Button, Card } from 'antd';
const { Meta } = Card;
import calenerImage from '../../../../public/calender .png'
import { Link } from 'react-router-dom';

const CalenderChose = () => {
  return (
    <Card
    hoverable
    style={{
      width: 240,
      backgroundColor: 'gray',
    }}
    cover={<img alt="example" src={calenerImage} className='px-4 py-4' />}
  >
    <Meta title="Same-Day Folded Calendar"  />
    <Link to={'/createCalendar'}><Button className='bg-indigo-300 mt-4 w-full '>Create Calendar</Button></Link>

  </Card>
  )
}

export default CalenderChose