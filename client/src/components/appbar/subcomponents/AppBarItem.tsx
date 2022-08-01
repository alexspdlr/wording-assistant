import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

interface AppBarItemProps {
  isFirstItem?: boolean;
}

const AppBarItem = styled(Link)(
  (props: AppBarItemProps) => `
  padding-bottom: 15px; 
  text-decoration: none; 
  color: #0F2B46;
  cursor: pointer;  
  border-bottom: 3px solid #ffffff;  
  transition: border-color 0.2s; 
  &:hover {
    border-bottom: 3px solid rgba(0, 99, 149, 1);    
    ${!props.isFirstItem && 'color: rgba(0, 99, 149, 1);'} 
  } 
  ${!props.isFirstItem && 'margin-left: 30px;'}
`
);

export default AppBarItem;
