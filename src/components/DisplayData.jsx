import React from 'react'
import { Card } from 'antd';
import './DisplayData.css';

const DisplayData = ({input}) => {
  return (
    <div>
        {[...input].reverse().map((item, index) => {
  switch (item.type) {
      case 'text':
          return (
              <Card key={index} className='card_text '>
                 <p>{item.value}</p>
              </Card>
          );
      case 'image':
          return (
              <Card key={index} className='card_spec' >
                 <img src={item.value} alt="Selected" className='card_image' />
              </Card>
          );
      default:
          return null;
  }
})}
    </div>
  )
}

export default DisplayData



