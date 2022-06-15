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
  border-radius: 5px; 
  border: 0.1em solid transparent;
  color: #333333;
  font-size: 24px; 
  padding-top: 0.1em;
  padding-bottom: 0.1em;  
  padding-left: 0.035em;
  padding-right: 0.035em;
  &:hover {
    background-color: rgba(0, 99, 149, 0.075);
    border: 0.1em solid rgba(0, 99, 149, 1);
    padding-left: 0.3em;
    padding-right: 0.3em;
  }

  ${
    props.selected &&
    `    background-color: rgba(0, 99, 149, 1);
    border: 0.1em solid rgba(0, 99, 149, 1); 
    color: #fff; 
    padding-left: 0.3em;
    padding-right: 0.3em;`
  }
  }`
);

export default ClickableWord;
