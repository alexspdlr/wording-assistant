import styled from '@emotion/styled';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import ProductInfoLowerSectionPageLink from './ProductInfoLowerSectionPageLink';

/* ---------------------------- Styled components --------------------------- */

interface ContainerProps {
  isBreakpointSmallerS: boolean;
}
const Container = styled('div')(
  (props: ContainerProps) => ` 
    display: flex; 
    align-items: flex-end; 
    grid-area: ${
      props.isBreakpointSmallerS ? '3 / 1 / 4 / 2' : '2 / 2 / 3 / 3'
    };
    `
);

interface DividerProps {
  isBreakpointSmallerS: boolean;
}
const Divider = styled('div')(
  (props: DividerProps) => (defaultProps) =>
    ` 
    margin-top: 48px; 
    height: calc(100% - 48px);
    background-color: ${defaultProps.theme.palette.divider}; 
    width: ${props.isBreakpointSmallerS ? '0px' : '1px'};
      `
);

interface PageLinkWrapperProps {
  isBreakpointSmallerS: boolean;
}
const PageLinkWrapper = styled('div')(
  (props: PageLinkWrapperProps) => ` 
      padding: ${props.isBreakpointSmallerS ? '32px 20px' : '32px 54px'};  
      `
);

/* -------------------------------------------------------------------------- */
/*                       ProductInfoLowerSectionProcess                       */
/* -------------------------------------------------------------------------- */

const ProductInfoLowerSectionProcess = () => {
  const activeBreakpoint = useBreakpoint();

  return (
    <Container
      isBreakpointSmallerS={compareBreakpoint(activeBreakpoint, '<', 'S')}
    >
      <Divider
        isBreakpointSmallerS={compareBreakpoint(activeBreakpoint, '<', 'S')}
      />
      <PageLinkWrapper
        isBreakpointSmallerS={compareBreakpoint(activeBreakpoint, '<', 'S')}
      >
        <ProductInfoLowerSectionPageLink
          title='Read about the development process'
          buttonVariant='outlined'
          buttonTitle='Go to process page'
        />
      </PageLinkWrapper>
    </Container>
  );
};

export default ProductInfoLowerSectionProcess;
