import styled from '@emotion/styled';

/* -------------------------------------------------------------------------- */
/*                              AboutMeUnderline                              */
/* -------------------------------------------------------------------------- */

interface AboutMeUnderlineProps {
  width: number;
}

const AboutMeUnderline = styled('div')(
  (props: AboutMeUnderlineProps) => `  
    position: absolute;
    margin-top: 8px;
    height: 2px;
    background-color: #006494;
    width: ${props.width}px; 
          `
);

export default AboutMeUnderline;
