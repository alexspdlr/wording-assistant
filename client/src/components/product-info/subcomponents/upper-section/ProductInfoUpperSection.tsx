import styled from '@emotion/styled';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import { Breakpoint } from 'src/types/breakpoint';
import ProductInfoUpperSectionGuide from './subcomponents/ProductInfoUpperSectionGuide';
import ProductInfoUpperSectionFeatures from './subcomponents/features/ProductInfoUpperSectionFeatures';

/* ---------------------------------- Utils --------------------------------- */

const gridLayoutByBreakpoint = (activeBreakpoint: Breakpoint) => {
  if (compareBreakpoint(activeBreakpoint, '>', 'M')) {
    return `
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-template-rows: 1fr;
      grid-column-gap: 24px;
      grid-row-gap: 0px;
      `;
  }

  if (
    compareBreakpoint(activeBreakpoint, '<', 'L') &&
    compareBreakpoint(activeBreakpoint, '>', 'XS')
  ) {
    return `
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 24px;
    grid-row-gap: 0px;
      `;
  }

  return `
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, auto);
  grid-column-gap: 0px;
  grid-row-gap: 38px;
  `;
};

/* ---------------------------- Styled components --------------------------- */

const Wrapper = styled('div')(
  (props) => ` 
    width: 100%; 
    padding: 50px 0; 
    border-bottom: 1px solid ${props.theme.palette.divider}; 
  `
);

interface ContainerProps {
  gridLayout: string;
}
const Container = styled('div')(
  (props: ContainerProps) => ` 
    ${props.gridLayout}
    margin: 0 36px; 
  `
);

const GuidePosition = styled('div')(
  () => ` 
    grid-area: 1 / 1 / 2 / 2;
  `
);

interface FeaturesPositionProps {
  isBreakpointSmallerS: boolean;
}
const FeaturesPosition = styled('div')(
  (props: FeaturesPositionProps) => ` 
  grid-area: ${props.isBreakpointSmallerS ? '2 / 1 / 3 / 2' : '1 / 2 / 2 / 3'};
  `
);

/* -------------------------------------------------------------------------- */
/*                           ProductInfoUpperSection                          */
/* -------------------------------------------------------------------------- */

const ProductInfoUpperSection = () => {
  const activeBreakpoint = useBreakpoint();
  return (
    <Wrapper>
      <Container gridLayout={gridLayoutByBreakpoint(activeBreakpoint)}>
        <GuidePosition>
          <ProductInfoUpperSectionGuide />
        </GuidePosition>
        <FeaturesPosition
          isBreakpointSmallerS={compareBreakpoint(activeBreakpoint, '<', 'S')}
        >
          <ProductInfoUpperSectionFeatures />
        </FeaturesPosition>
      </Container>
    </Wrapper>
  );
};

export default ProductInfoUpperSection;
