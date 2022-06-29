import React from 'react';
import styled from '@emotion/styled';

const Button = styled('button')(
  (props) => `
  background-color : rgba(0, 99, 149, 1);  
  padding: 7px;   
  padding-left: 16px; 
  padding-right: 16px;  
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;  
  font-weight: 400; 
  font-size: 16px; 
  color: #fff; 
  border: 0px;  
  border-radius: 4px; 
  cursor: pointer; 
  &:hover {
    background-color: rgba(15, 43, 70, 1);   
  }
  `
);

export default Button;
