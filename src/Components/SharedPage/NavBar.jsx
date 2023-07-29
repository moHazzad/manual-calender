import React, { useContext } from 'react';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Space, Menu, Dropdown } from 'antd';
import { AuthContext } from '../../AuthContext/AuthaContext';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { user, LogOut } = useContext(AuthContext);

  const handleLogout = () => {
    LogOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
    // Your logout logic here
    // For example, clear user session, redirect to login page, etc.
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogout} key="logout">
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <section className="w-[90%] mx-auto">
      <div className="flex items-center justify-between py-4">
        <div>
          <Link to={'/'}>Calendar</Link>
        </div>
        <div className='w-[20%]'>
          <Space className='flex justify-between'>
            {user ? (
              // Render Logout button if user is available
              <>
               <Link to={'/mycalendar'}>My Calendar</Link>
              <Dropdown overlay={menu} placement="bottomRight">
                <Avatar size="large" src={user?.photoURL} icon={<UserOutlined />} />
              </Dropdown>
              </>
            ) : (
              // Render Login button if user is not available
              <Link to={'/login'}>Login</Link>
            )}
          </Space>
        </div>
      </div>
    </section>
  );
};

export default NavBar;
