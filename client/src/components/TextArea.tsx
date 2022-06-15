import React from 'react';
import styled from '@emotion/styled';

const TextArea = styled('textarea')(
  () => `
  border-radius: 8px; 
  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
  border: 1px solid #dae1e8;
  width: 600px; 
  padding: 30px; 
  resize: none; 
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;  
  line-height: 1.5; 
  font-size: 24px;  
  font-weight: 300;  
  color: #838383;   
`
);

export default TextArea;
