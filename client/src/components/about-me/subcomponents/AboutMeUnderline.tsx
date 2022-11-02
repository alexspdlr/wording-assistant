import styled from '@emotion/styled';

/* -------------------------------------------------------------------------- */
/*                              AboutMeUnderline                              */
/* -------------------------------------------------------------------------- */

interface AboutMeUnderlineProps {
  width: number;
}

const AboutMeUnderline = styled('div')(
  (props: AboutMeUnderlineProps) => (defaultProps) =>
    `  
    position: absolute;
    margin-top: 8px;
    height: 2px;
    background-color: ${defaultProps.theme.palette.primary.light};
    width: ${props.width}px; 
          `
);

export default AboutMeUnderline;
