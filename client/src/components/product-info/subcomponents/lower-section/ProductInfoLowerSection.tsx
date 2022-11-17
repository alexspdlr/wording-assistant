import styled from '@emotion/styled';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import ProductInfoLowerSectionCodebase from './subcomponents/ProductInfoLowerSectionCodebase';
import ProductInfoLowerSectionHeading from './subcomponents/ProductInfoLowerSectionHeading';
import ProductInfoLowerSectionProcess from './subcomponents/ProductInfoLowerSectionProcess';

/* ---------------------------- Styled components --------------------------- */

interface WrapperProps {}
const Wrapper = styled('div')(
  (props: WrapperProps) => ` 
    width: calc(100% - 40px);
    padding: 50px 20px; 
  `
);

interface ContainerProps {
  smallLayout: boolean;
}
const Container = styled('div')(
  (props: ContainerProps) => ` 
  display: grid;
  grid-column-gap: 0px; 
  grid-row-gap: 0px;
  ${
    props.smallLayout
      ? `grid-template-columns: 1fr; grid-template-rows: repeat(3, auto);`
      : `grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, auto);`
  }
  `
);
/* -------------------------------------------------------------------------- */
/*                           ProductInfoLowerSection                          */
/* -------------------------------------------------------------------------- */

const ProductInfoLowerSection = () => {
  const activeBreakpoint = useBreakpoint();

  return (
    <Wrapper>
      <Container smallLayout={compareBreakpoint(activeBreakpoint, '<', 'S')}>
        <ProductInfoLowerSectionHeading />
        <ProductInfoLowerSectionCodebase />
        <ProductInfoLowerSectionProcess />
      </Container>
    </Wrapper>
  );
};

export default ProductInfoLowerSection;
