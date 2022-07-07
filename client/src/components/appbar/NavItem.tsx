import styled from '@emotion/styled';

interface NavItemProps {
  isFirstItem?: boolean;
}

const NavItem = styled('div')(
  (props: NavItemProps) => `
  padding-bottom: 15px; 
  ${!props.isFirstItem && 'margin-left: 30px;'} 
  pointer: cursor;  
  border-bottom: 3px solid #ffffff;   
  &:hover {
    border-bottom: 3px solid rgba(0, 99, 149, 1);  
    cursor: pointer;  
    ${!props.isFirstItem && 'color: rgba(0, 99, 149, 1);'} 
  } 
`
);

export default NavItem;
