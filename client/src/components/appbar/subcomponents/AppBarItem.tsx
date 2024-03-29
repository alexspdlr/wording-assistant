import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

/* -------------------------------------------------------------------------- */
/*                                 AppBarItem                                 */
/* -------------------------------------------------------------------------- */
interface AppBarItemProps {
  isFirstItem?: boolean;
}

const AppBarItem = styled(Link)(
  (props: AppBarItemProps) => (defaultProps) =>
    `
  padding-bottom: 15px; 
  text-decoration: none; 
  color: ${defaultProps.theme.palette.primary.main};
  cursor: pointer;  
  border-bottom: 3px solid transparent; 
  transition: border-color 200ms ease-in-out, color 200ms ease-in-out; 
  &:hover {
    padding-bottom: 15px; 
    border-bottom: 3px solid ${defaultProps.theme.palette.primary.light};    
    ${
      !props.isFirstItem &&
      defaultProps.theme.activeMode === 'light' &&
      `color: ${defaultProps.theme.palette.primary.light};`
    } 
  } 
  ${!props.isFirstItem && 'margin-left: 30px;'}
`
);

export default AppBarItem;
