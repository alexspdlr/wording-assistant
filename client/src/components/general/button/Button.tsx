import styled from '@emotion/styled';

type ButtonSize = 'medium' | 'large';
interface ButtonProps {
  size?: ButtonSize;
}

const Button = styled('button')(
  (props: ButtonProps) => `
  background-color : rgba(0, 99, 149, 1);  
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;  
  font-size: 16px; 
  color: #fff; 
  border: 0px;  
  border-radius: 4px; 
  cursor: pointer; 
  &:hover {
    background-color: rgba(15, 43, 70, 1);   
  }
  ${
    props.size === 'large'
      ? `padding: 12px 24px; font-weight: 500; `
      : `padding: 7px 16px; font-weight: 400; `
  }
  `
);

export default Button;
