import styled from '@emotion/styled';

interface AppBarExternalLinkProps {
  isFirstItem?: boolean;
}

const AppBarExternalLink = styled('a')(
  (props: AppBarExternalLinkProps) => `
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

export default AppBarExternalLink;
