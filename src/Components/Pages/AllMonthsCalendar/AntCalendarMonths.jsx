import React, { useContext, useEffect, useState } from "react";
import { Modal, Select, Form, Input, Button, Spin } from "antd";
import emptyImg from "../../../../public/empty.png";
import { AuthContext } from "../../../AuthContext/AuthaContext";
import { Link } from "react-router-dom";
import axios from "axios";
import ImageKit from "imagekit";

const { Option } = Select;

const AntCalendarMonths = () => {
  const {
    selectedYear,
    setSelectedYear,
    monthImages,
    setMonthImages,
    tasks,
    setTasks,
    selectedDate,
    setSelectedDate,
    taskFormVisible,
    setTaskFormVisible,
    uniqueId,
    user
  } = useContext(AuthContext);
  const [isDataPosted, setIsDataPosted] = useState(false);
  const [isLoading, setLoading] = useState(false);
  // const history = useHistory();
  console.log(user);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = (year, month) => new Date(year, month, 1).getDay();

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const newImages = [...monthImages];
      newImages[index] = reader.result;
      setMonthImages(newImages);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDayClick = (dayNumber, monthIndex) => {
    setSelectedDate({ day: dayNumber, month: monthIndex });
    setTaskFormVisible(true);
  };

  const handleAddTask = (values) => {
    const newTask = { ...selectedDate, description: values.description };
    setTasks([...tasks, newTask]);
    setTaskFormVisible(false);
    setSelectedDate(null);
  };

  const renderTasksForDate = (dayNumber, monthIndex) => {
    const tasksForDate = tasks.filter(
      (task) => task.day === dayNumber && task.month === monthIndex
    );
    return tasksForDate.map((task, index) => (
      <p key={index} className="task">
        {task.description}
      </p>
    ));
  };

  const handleCancel = () => {
    setTaskFormVisible(false);
    setSelectedDate(null);
  };

  // const handlePrint = () => {
  //   window.print();
  // };

  const imagekit = new ImageKit({
    publicKey: "public_BEloy/Bwr7mhQslyVkMtinahNfU=",
    privateKey: "private_SH9o7pdADy/itxGGz9N3AyeinIo=",
    urlEndpoint: "https://ik.imagekit.io/appgas2t34",
  });

  const handleNextButtonClick = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("year", selectedYear);

    // Use Promise.all to upload all images to ImageKit
    Promise.all(
      monthImages.map((image, index) => {
        if (image) {
          return new Promise((resolve, reject) => {
            const fileName = `month_${index + 1}.png`; // Change the extension as per the image type

            imagekit.upload(
              {
                file: image,
                fileName: fileName,
                folder: "/calendar", // Optional: You can add a folder for better organization
              },
              (error, result) => {
                if (error) {
                  console.error(
                    `Error uploading image ${fileName} to ImageKit:`,
                    error
                  );
                  reject(error);
                } else {
                  resolve(result.url);
                }
              }
            );
          });
        } else {
          return Promise.resolve(""); // Return an empty URL for non-selected images
        }
      })
    )
      .then((uploadedImageUrls) => {
        const dataToSave = {
          year: selectedYear,
          monthImages: uploadedImageUrls,
          tasks: tasks,
          productId: uniqueId,
          buyer: user?.email
        };

        axios
          .post("http://localhost:5000/yearinfo", dataToSave)
          .then((response) => {
            console.log("Data posted to MongoDB:", response.data);

            setLoading(false);
            //   // Get the unique ID from the API response
            // const uniqueId = response.data.id;
            setIsDataPosted(true); // Set the state to indicate that data is successfully posted

            // // Set the unique ID in state
            // setUniqueId(uniqueId);

            // Optionally, you can reset the monthImages and tasks state if needed.
            // setMonthImages(Array.from({ length: 12 }, () => ''));
            // setTasks([]);
          })
          .catch((error) => {
            console.error("Error posting data to MongoDB:", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading images to ImageKit:", error);
      });
  };

  // useEffect(() => {
  //   console.log("uniqueId set in AntCalendarMonths:", uniqueId); // Add this line
  // }, [uniqueId]);

  return (
    <div className="ant-calendar-months w-[80%] mx-auto">
      <h1>Full Year Calendar </h1>
      <Select
        defaultValue={selectedYear}
        style={{ width: 120 }}
        onChange={handleYearChange}
      >
        <Option value={selectedYear}>{selectedYear}</Option>
        {/* <Option value={currentYear + 1}>{currentYear + 1}</Option>
        <Option value={currentYear + 1}>{currentYear + 1}</Option>
        <Option value={currentYear + 1}>{currentYear + 1}</Option> */}
      </Select>
      <div className="flex flex-wrap   justify-between items-stretch ">
        {months.map((month, index) => (
          <div key={month} className="month-calendar w-4/12 p-10 ">
            <h2>{month}</h2>
            <div className="image-container w-full h-[250px] overflow-hidden ">
                {/* Display the image here */}
                {monthImages[index] ? (
                  <img
                    src={monthImages[index]}
                    alt={month}
                    className="month-image object-cover w-full h-full"
                  />
                ) : (
                  <img src={emptyImg} alt="" className="month-image" />
                )}
              </div>
            <input type="file" onChange={(e) => handleImageChange(e, index)} />
            <div className="  ">
            <table className="calendar-table w-full h-44 text-xs">
              <thead>
                <tr>
                  <th className="px-2">Sun</th>
                  <th className="px-2">Mon</th>
                  <th className="px-2">Tue</th>
                  <th className="px-2">Wed</th>
                  <th className="px-2">Thu</th>
                  <th className="px-2">Fri</th>
                  <th className="px-2">Sat</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }, (_, weekIndex) => (
                  <tr key={weekIndex} className="py-4">
                    {Array.from({ length: 7 }, (_, dayOfWeek) => {
                      const dayNumber =
                        weekIndex * 7 +
                        dayOfWeek -
                        firstDayOfWeek(selectedYear, index) +
                        1;
                      return (
                        <td
                          className="border w-10  h-16 text-xs"
                          key={dayOfWeek}
                          onClick={() => handleDayClick(dayNumber, index)}
                          style={{ wordBreak: 'break-all' }}
                        >
                          {dayNumber > 0 &&
                          dayNumber <= daysInMonth(selectedYear, index)
                            ? dayNumber
                            : ""}
                          <div className="task-container w-full  break-words text-[8px] flex items-center justify-center text-center ">
                            {renderTasksForDate(dayNumber, index)}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            {/* <Button type="primary" onClick={handlePrint}>
              Print {month}
            </Button> */}
          </div>
        ))}
      </div>
      <Modal
        title={`Add Task for ${
          selectedDate
            ? `${months[selectedDate.month]} ${selectedDate.day}`
            : ""
        }`}
        open={taskFormVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleAddTask}>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please enter a task description" },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter task description" />
          </Form.Item>
          <Form.Item>
            <Button  htmlType="submit">
              Add Task
            </Button>
            <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {isDataPosted ? (
        <div className="py-20">
          <Link to={`/printReview/:${uniqueId}`}>
            <Button>Next</Button>
          </Link>
        </div>
      ) : isLoading ? (
        <div className="example py-20">
          <Spin />
        </div>
      ) : (
        <div className="py-20">
          <Button  onClick={handleNextButtonClick}>Add Data</Button>
        </div>
      )}
    </div>
  );
};

export default AntCalendarMonths;
