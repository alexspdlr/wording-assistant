import styled from '@emotion/styled';

interface AppBarItemProps {
  isFirstItem?: boolean;
}

const AppBarItem = styled('div')(
  (props: AppBarItemProps) => `
  padding-bottom: 15px; 
  cursor: pointer;  
  border-bottom: 3px solid #ffffff;  
  &:hover {
    border-bottom: 3px solid rgba(0, 99, 149, 1);    
    ${!props.isFirstItem && 'color: rgba(0, 99, 149, 1);'} 
  } 
  ${!props.isFirstItem && 'margin-left: 30px;'}
`
);

export default AppBarItem;
