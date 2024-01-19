import React, { useEffect, useState } from 'react'
import { Card,Button } from 'antd';
import './DisplayData.css';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const DisplayData = ({input}) => {
    const [blocks, setBlocks] = useState([...input]);
    console.log('Input:', input);
    console.log('Blocks:', blocks);
    const isSingleBlock = blocks.length === 1;

    useEffect(() => {
        setBlocks([...input]);
      }, [input]);

    const moveUp = (index) => {
        if (index === 0) return; 
        const newBlocks = [...blocks];
        const temp = newBlocks[index - 1];
        newBlocks[index - 1] = newBlocks[index];
        newBlocks[index] = temp;
        setBlocks(newBlocks);
      };
     
      const moveDown = (index) => {
        if (index === blocks.length - 1) return; 
        const newBlocks = [...blocks];
        const temp = newBlocks[index + 1];
        newBlocks[index + 1] = newBlocks[index];
        newBlocks[index] = temp;
        setBlocks(newBlocks);
      };

  return (
    //[...input].reverse().map
    <div>
        {blocks.map((item, index) => {
            console.log(item);
           switch (item.type) {
             case 'text':
                  return (
                     <div key={index} className='card_spec_text'>
                         <div className="card_text_div" dangerouslySetInnerHTML={{__html: item.value}}/>
                            
                         <div className={`card_btn_bx ${isSingleBlock ? 'single-block' : ''}`}>
                         {index !== 0 && (
                            <Button className='button-30' onClick={() => moveUp(index)}><UpOutlined /></Button>
                          )}

                         {index !== blocks.length - 1 && (
                            <Button className='button-30' onClick={() => moveDown(index)}><DownOutlined /></Button>
                         )}
                         </div>
                           
                      </ div>
                );
             case 'image':
                  return (
                     <div key={index} className='card_spec' >
                        <div className="card_img">
                            <img src={item.value} alt="Selected" className='card_image' />
                        </div>
                         
                          
                        <div className={`card_btn_bx ${isSingleBlock ? 'single-block' : ''}`}>
                         {index !== 0 && (
                            <Button className='button-30' onClick={() => moveUp(index)}><UpOutlined /></Button>
                          )}

                         {index !== blocks.length - 1 && (
                            <Button  className='button-30' onClick={() => moveDown(index)}><DownOutlined /></Button>
                         )}
                         </div>
                     </div>
                );
             default:
                return null;
        }
    })}
    </div>
  )
}

export default DisplayData



