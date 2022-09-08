import styled from '@emotion/styled';

const Chip = styled('div')(
  (props) => `
  border-radius: 4px; 
  background-color: ${props.theme.palette.secondary.main};
  font-size: 10px;
  font-weight: 600;
  color: ${props.theme.palette.secondary.contrastText};
  width: auto; 
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 8px; 
  padding-right:8px; 
`
);

export default Chip;
