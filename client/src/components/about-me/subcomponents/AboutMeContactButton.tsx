import styled from '@emotion/styled';
import Button from 'src/components/general/button';

/* -------------------------------------------------------------------------- */
/*                            AboutMeContactButton                            */
/* -------------------------------------------------------------------------- */

const AboutMeContactButton = styled(Button)(
  () => `  
        background-color:  #0F2B46; 
        border-radius: 3px 3px 0px 0px;
        transform: rotate(90deg);
        position: fixed; 
        z-index: 10;
        left: 0;
        top: 220px; 
        margin-left: -31px; 
      
        &:hover {
          background-color:  #006494;  
        }
        `
);

export default AboutMeContactButton;
