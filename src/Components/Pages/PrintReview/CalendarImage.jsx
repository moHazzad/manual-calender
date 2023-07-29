import React from 'react';
import { ReactToImage } from '@hcorta/react-to-image';
import emptyImg from '/empty.png'

const CalendarImage = ({ monthData }) => {
  // Extract month image URL and tasks from monthData
  const monthImage = monthData.monthImages[0] || ''; // Replace 0 with the correct index for the month you want to capture
  const tasksForMonth = monthData.tasks || [];

  // Create a ref for the component that we want to capture (in this case, the <div> containing the month image and tasks)
  const componentRef = React.useRef();

  return (
    <div ref={componentRef}>
      {/* Display the month image */}
      {monthImage ? (
        <img src={monthImage} alt="Month" className="month-image h-full w-full" />
      ) : (
        <img src={emptyImg} alt="Empty" className="month-image h-full w-full" />
      )}

      {/* Display the tasks */}
      <div className="task-container w-full break-words text-[8px] flex items-center justify-center text-center">
        {tasksForMonth.map((task, taskIndex) => (
          <p key={taskIndex} className="task w-full">
            {task.description}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CalendarImage;