import React from 'react';
import styled from '@emotion/styled';

interface ClickableWordProps {
  children: any;
  willBeReplaced: boolean;
  selected: boolean;
}

const ClickableWord = styled('span')<ClickableWordProps>(
  (props) => `
  display: inline-block;
  background-color: transparent;
  -webkit-transition: all 0.25s ease-out;
  -moz-transition: all 0.25s ease-out;
  -o-transition: all 0.25s ease-out;
  transition: all 0.25s ease-out; 
  box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  ${props.willBeReplaced && 'opacity:0.275;'};  
  cursor: pointer;  
  border-radius: 4px; 
  border: 2px solid transparent;
  color: #333333;
  font-size: 24px; 
  font-weight: 400; 
  padding-top: 0.1em;
  padding-bottom: 0.1em;  
  padding-left: 0.035em;
  padding-right: 0.035em;
  &:hover {
    background-color: rgba(0, 99, 149, 0.05);
    border: 2px solid rgba(0, 99, 149, 1);
    padding-left: 0.35em;
    padding-right: 0.35em;
  }

  ${
    props.selected &&
    `background-color: rgba(0, 99, 149, 0.05);
    border: 2px solid rgba(0, 99, 149, 1);
    padding-left: 0.35em;
    padding-right: 0.35em;
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
    `
  }
  }`
);

export default ClickableWord;
