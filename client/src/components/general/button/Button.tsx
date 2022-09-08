import styled from '@emotion/styled';

type ButtonSize = 'medium' | 'large';
interface ButtonProps {
  size?: ButtonSize;
  variant?: 'contained' | 'outlined';
}

const Button = styled('button')(
  (props: ButtonProps) => (defaultProps) =>
    `
  background-color : ${
    props.variant === 'outlined'
      ? defaultProps.theme.palette.background.main
      : defaultProps.theme.palette.primary.light
  };  
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;  
  font-size: 16px; 
  color : ${
    props.variant === 'outlined'
      ? defaultProps.theme.palette.primary.light
      : defaultProps.theme.palette.primary.contrastText
  };  
  border: 0px;  
  border-radius: 4px; 
  cursor: pointer; 
  &:hover {
    background-color: ${
      props.variant !== 'outlined' && defaultProps.theme.activeMode === 'dark'
        ? defaultProps.theme.palette.primary.dark
        : defaultProps.theme.palette.primary.main
    };    
    color: ${
      props.variant === 'outlined' && defaultProps.theme.palette.primary.main
    };    
    border : ${
      props.variant === 'outlined' &&
      `1px solid ${defaultProps.theme.palette.primary.main}`
    }; 
  }
  border : ${
    props.variant === 'outlined' &&
    `1px solid ${defaultProps.theme.palette.primary.light}`
  }; 
  ${
    props.size === 'large'
      ? `padding: 14px 24px; font-weight: 500; `
      : `padding: 7px 16px; font-weight: 400; `
  }
  `
);

export default Button;
