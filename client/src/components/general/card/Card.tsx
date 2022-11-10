import styled from '@emotion/styled';

/* -------------------------------------------------------------------------- */
/*                                    Card                                    */
/* -------------------------------------------------------------------------- */

const Card = styled('div')(
  (props) => `
  background-color: ${props.theme.palette.background.light}; 
  border-radius: 8px; 
  border: 1px solid ${props.theme.palette.border}; 
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 4px 0px; 
  `
);

export default Card;
