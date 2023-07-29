import React from 'react'
import { Carousel } from 'antd';

const SliderMonths = ({monthsData}) => {
      // Split the monthsData array into chunks of 4 months each
  const chunks = monthsData.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 4);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);


  return (
    <Carousel effect="fade">
      {chunks.map((chunk, index) => (
        <div key={index}>
          <div className="grid grid-cols-4 gap-4">
            {chunk.map((monthData) => (
              <div key={monthData.month} className="month-slide">
                <h3>{monthData.month}</h3>
                <img src={monthData.image} alt={monthData.month} className="month-image" />
                <div className="tasks">
                  {monthData.tasks.map((task, index) => (
                    <p key={index}>{task.description}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Carousel>
  )
}

export default SliderMonths