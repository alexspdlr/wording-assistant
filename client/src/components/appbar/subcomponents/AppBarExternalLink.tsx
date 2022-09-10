import styled from '@emotion/styled';

interface AppBarExternalLinkProps {
  isFirstItem?: boolean;
}

const AppBarExternalLink = styled('a')(
  (props: AppBarExternalLinkProps) => (defaultProps) =>
    `
  padding-bottom: 18px; 
  text-decoration: none; 
  color: ${defaultProps.theme.palette.primary.main};
  cursor: pointer;  
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

export default AppBarExternalLink;
