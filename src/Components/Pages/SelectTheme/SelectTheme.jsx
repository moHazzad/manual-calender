import React, { useContext } from 'react'
import cover from '../../../../public/pexels-yusuf-duhan-di̇kal-17530670.jpg'
import coverCalender from '../../../../public/calender .png'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../../../AuthContext/AuthaContext'

const SelectTheme = () => {
  const {setUniqueId} = useContext(AuthContext)


  const handleSelect = ()=>{

    const uniqueId = uuidv4();
    setUniqueId(uniqueId)
    console.log(uniqueId, 'adding');
  }
  return (
    <section className='w-[90%] mx-auto'>
        
    <div className='w-96'>

        <div className='flex gap-4 border-b-2 border-gray-100 py-2'>
            <img src={cover} alt="" className='w-[50%]' />
            <img src={coverCalender} alt="" className='w-[50%]' />
            
        </div>
        <div className=' w-full flex justify-between items-center py-2'>
            <h2>Full page photos</h2>
            <Link to={'/antcalendar'}><Button onClick={handleSelect}>SELECT</Button></Link>

        </div>
    </div>

        

    </section>
  )
}

export default SelectTheme