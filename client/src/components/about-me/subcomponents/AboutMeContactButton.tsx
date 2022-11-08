import styled from '@emotion/styled';
import Button from 'src/components/general/button';

/* -------------------------------------------------------------------------- */
/*                            AboutMeContactButton                            */
/* -------------------------------------------------------------------------- */

const AboutMeContactButton = styled(Button)(
  (props) => `  
        background-color: ${
          props.theme.activeMode === 'light'
            ? props.theme.palette.primary.main
            : props.theme.palette.primary.dark
        }; 
        border-radius: 3px 3px 0px 0px;
        transform: rotate(90deg);
        position: fixed;  
        z-index: 10;
        left: 0;
        top: 220px; 
        margin-left: -31px; 
      
        &:hover {
          background-color:  ${props.theme.palette.primary.light};   
        }
        `
);

export default AboutMeContactButton;
