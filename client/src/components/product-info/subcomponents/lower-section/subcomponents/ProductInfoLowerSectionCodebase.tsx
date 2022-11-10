import compareBreakpoint from 'src/utils/compareBreakpoint';
import { ReactComponent as DesktopCodebaseLight } from 'src/assets/DesktopCodebaseLight.svg';
import { ReactComponent as DesktopCodebaseDark } from 'src/assets/DesktopCodebaseDark.svg';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import { useTheme } from '@emotion/react';
import ProductInfoLowerSectionPageLink from './ProductInfoLowerSectionPageLink';
import styled from '@emotion/styled';

/* ---------------------------- Styled components --------------------------- */

const Container = styled('div')(
  () => ` 
      display: flex; 
      align-items: flex-end; 
      grid-area: 2 / 1 / 3 / 2;
  `
);

interface PageLinkWrapperProps {
  isBreakpointLargerXL: boolean;
}
const PageLinkWrapper = styled('div')(
  (props: PageLinkWrapperProps) => ` 
    padding: ${props.isBreakpointLargerXL ? '32px 42px' : '32px 20px'};  
    `
);

/* -------------------------------------------------------------------------- */
/*                       ProductInfoLowerSectionCodebase                      */
/* -------------------------------------------------------------------------- */

const ProductInfoLowerSectionCodebase = () => {
  const activeBreakpoint = useBreakpoint();
  const theme = useTheme();

  return (
    <Container>
      {compareBreakpoint(activeBreakpoint, '>', 'S') &&
        (theme.activeMode === 'light' ? (
          <DesktopCodebaseLight />
        ) : (
          <DesktopCodebaseDark />
        ))}
      <PageLinkWrapper
        isBreakpointLargerXL={compareBreakpoint(activeBreakpoint, '>', 'XL')}
      >
        <ProductInfoLowerSectionPageLink
          title='Explore the codebase'
          buttonVariant='contained'
          buttonTitle='View Repository'
        />
      </PageLinkWrapper>
    </Container>
  );
};

export default ProductInfoLowerSectionCodebase;
