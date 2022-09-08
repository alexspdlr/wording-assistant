import styled from '@emotion/styled';

interface AppBarExternalLinkProps {
  isFirstItem?: boolean;
}

const AppBarExternalLink = styled('a')(
  (props: AppBarExternalLinkProps) => (defaultProps) =>
    `
  padding-bottom: 15px; 
  text-decoration: none; 
  color: ${defaultProps.theme.palette.primary.main};
  cursor: pointer;  
  border-bottom: 3px solid ${defaultProps.theme.palette.background.light}; 
  transition: border-color 0.2s; 
  &:hover {
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

export default AppBarExternalLink;
