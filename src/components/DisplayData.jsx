import React, { useEffect, useState } from 'react'
import { Card,Button } from 'antd';
import './DisplayData.css';

const DisplayData = ({input}) => {
    const [blocks, setBlocks] = useState([...input]);
    console.log('Input:', input);
    console.log('Blocks:', blocks);

    useEffect(() => {
        setBlocks([...input]);
      }, [input]);

    const moveUp = (index) => {
        if (index === 0) return; // Don't move the first block
        const newBlocks = [...blocks];
        const temp = newBlocks[index - 1];
        newBlocks[index - 1] = newBlocks[index];
        newBlocks[index] = temp;
        setBlocks(newBlocks);
      };
     
      const moveDown = (index) => {
        if (index === blocks.length - 1) return; // Don't move the last block
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
                     <div key={index} className='card_spec '>
                         <div className="card_text_div" dangerouslySetInnerHTML={{__html: item.value}}/>
                            
                         <div className='card_btn_bx'>
                         {index !== 0 && (
                            <Button className='button-30' onClick={() => moveUp(index)}>Up</Button>
                          )}

                         {index !== blocks.length - 1 && (
                            <Button className='button-30' onClick={() => moveDown(index)}>Down</Button>
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
                         
                          
                         <div className='card_btn_bx'>
                         {index !== 0 && (
                            <Button className='button-30' onClick={() => moveUp(index)}>Up</Button>
                          )}

                         {index !== blocks.length - 1 && (
                            <Button  className='button-30' onClick={() => moveDown(index)}>Down</Button>
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



