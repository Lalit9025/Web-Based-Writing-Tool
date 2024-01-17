import React, { useState } from 'react';
import { Button,Modal, Form, Input } from 'antd';


const AddText = ({input,setInput,opentext,setOpentext}) => {


    const [form] = Form.useForm();
    const [wordCount, setWordCount] = useState(0);
    const MAX_WORDS = 250;

    const handleTextChange = (event) => {
      const text = event.target.value;
      const words = text.split(/\s+/).filter(word => word !== '');
      if (words.length > MAX_WORDS) {
       event.preventDefault();
       return;
      }
      setWordCount(words.length);
      form.setFieldsValue({ Text: text });
     };


     const handlePaste = (event) => {
      event.preventDefault();
      const text = event.clipboardData.getData('text');
      const words = text.split(/\s+/).filter(word => word !== '');
      if (words.length > MAX_WORDS) {
      const trimmedText = words.slice(0, MAX_WORDS).join(' ');
      event.target.value = trimmedText;
      setWordCount(MAX_WORDS);
      form.setFieldsValue({ Text: trimmedText });
      } else {
      event.target.value = text;
      setWordCount(words.length);
      form.setFieldsValue({ Text: text });
      }
     };
     
     const handleKeyPress = (event) => {
      const text = event.target.value + event.key;
      const words = text.split(/\s+/).filter(word => word !== '');
      if (words.length >= MAX_WORDS && event.key !== 'Backspace') {
      event.preventDefault();
      }
     };
     

    const handleOk = () => {
      const textValue = form.getFieldValue('Text');
      const words = textValue.split(/\s+/).filter(word => word !== '');
    
      if (words.length > 0) {
        form.validateFields().then((values) => {
          console.log('Received values of form: ', values);
          setInput([...input, { type: 'text', value: values.Text }]);
          console.log(input);
          form.setFieldsValue({ Text: '' });
          setWordCount(0);
        });
      } else {
        console.error('No words entered');
        console.warn("please wir");
        Modal.warning({
          title: 'Warning',
          content: ' Please write something before clicking "Add".',
      });
      return; 
      }
    
      setOpentext(false);
    };
    


    const handleCancel = () => {
        setOpentext(false);
        form.setFieldsValue({ Text: '' });
        setWordCount(0);
        };

  return (
    <Modal
       visible={opentext}
       onCancel={handleCancel}
       title='Enter text'
       footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="add" type="primary" onClick={handleOk}>
          Add
        </Button>,
      ]}
     >
       <Form form={form} layout="vertical">
         <Form.Item name="Text" rules={[{ required: true }]}>
           <Input.TextArea  placeholder='enter the text' onChange={handleTextChange} onPaste={handlePaste}  onKeyPress={handleKeyPress}/>
           
         </Form.Item>
         <p>{250-wordCount}/250</p>
       </Form>
     </Modal>
  );
};
export default AddText;

