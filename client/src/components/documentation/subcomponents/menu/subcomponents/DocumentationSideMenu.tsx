import styled from '@emotion/styled';

/* -------------------------------------------------------------------------- */
/*                          DocumentationMenuSection                          */
/* -------------------------------------------------------------------------- */

const DocumentationSideMenu = styled('div')(
  (props) => ` 
        width: 300px; 
        border-right: 1px solid ${props.theme.palette.divider}; 
        `
);

export default DocumentationSideMenu;
