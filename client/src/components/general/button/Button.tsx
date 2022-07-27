import styled from '@emotion/styled';

type ButtonSize = 'medium' | 'large';
interface ButtonProps {
  size?: ButtonSize;
  variant?: 'contained' | 'outlined';
}

const Button = styled('button')(
  (props: ButtonProps) => `
  background-color : ${
    props.variant === 'outlined' ? '#ffffff' : 'rgba(0, 99, 149, 1)'
  };  
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;  
  font-size: 16px; 
  color : ${props.variant === 'outlined' ? 'rgba(0, 99, 149, 1)' : '#fff'};  
  border: 0px;  
  border-radius: 4px; 
  cursor: pointer; 
  &:hover {
    background-color: ${
      props.variant !== 'outlined' && 'rgba(15, 43, 70, 1)'
    };    
    color: ${props.variant === 'outlined' && 'rgba(15, 43, 70, 1)'};    
    border : ${
      props.variant === 'outlined' && '1px solid rgba(15, 43, 70, 1)'
    }; 
  }
  border : ${props.variant === 'outlined' && '1px solid rgba(0, 99, 149, 1)'}; 
  ${
    props.size === 'large'
      ? `padding: 16px 24px; font-weight: 500; `
      : `padding: 7px 16px; font-weight: 400; `
  }
  `
);

export default Button;
