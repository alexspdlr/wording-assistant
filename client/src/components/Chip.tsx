import styled from '@emotion/styled';

const Chip = styled('div')(
  (props) => `
  border-radius: 4px; 
  background-color: #037171;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
  width: auto; 
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 8px; 
  padding-right:8px;  
  margin-left: 8px;
  margin-bottom: -3px; 
`
);

export default Chip;
