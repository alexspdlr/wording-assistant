import React from 'react';
import styled from '@emotion/styled';

const Button = styled('button')(
  (props) => `
  background-color : rgba(0, 99, 149, 1); 
  margin-top: 20px; 
  padding: 13px; 
  padding-left: 20px; 
  padding-right: 20px; 
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;  
  font-weight: 500; 
  font-size: 16px; 
  color: #fff; 
  border: 0px; 
  border-radius: 4px; 
  cursor: pointer; 
  `
);

export default Button;
