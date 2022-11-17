import styled from '@emotion/styled';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';

/* ---------------------------- Styled components --------------------------- */

interface WrapperProps {
  isBreakpointSmallerS: boolean;
  isBreakpointSmallerM: boolean;
  isBreakpointLargerS: boolean;
}
const Wrapper = styled('div')(
  (props: WrapperProps) => ` 
  display: flex; 
  grid-area: ${props.isBreakpointSmallerS ? '1 / 1 / 2 / 2' : '1 / 1 / 2 / 3'};
  justify-content: ${props.isBreakpointLargerS ? 'center' : 'flex-start'};
  margin-left: ${props.isBreakpointSmallerM ? '20px' : '0px'};
  margin-bottom: ${props.isBreakpointSmallerM ? '12px' : '0px'};
  `
);

interface HeadingProps {
  isBreakpointSmallerS: boolean;
}
const Heading = styled('span')(
  (props: HeadingProps) => ` 
  width: auto; 
  @keyframes fadeInAnimation {
    0% {opacity: 0;}
    30% {opacity: 0;}
    100% { opacity: 1; }
  }; 
  animation: fadeInAnimation ease 1.5s;
  animation-iteration-count: 1; 
  animation-fill-mode: forwards;
  font-size: ${props.isBreakpointSmallerS ? '28px' : '32px'};
  `
);

/* -------------------------------------------------------------------------- */
/*                       ProductInfoLowerSectionHeading                       */
/* -------------------------------------------------------------------------- */

const ProductInfoLowerSectionHeading = () => {
  const activeBreakpoint = useBreakpoint();
  return (
    <Wrapper
      isBreakpointLargerS={compareBreakpoint(activeBreakpoint, '>', 'S')}
      isBreakpointSmallerS={compareBreakpoint(activeBreakpoint, '<', 'S')}
      isBreakpointSmallerM={compareBreakpoint(activeBreakpoint, '<', 'M')}
    >
      <Heading
        isBreakpointSmallerS={compareBreakpoint(activeBreakpoint, '<', 'S')}
      >
        How the wording assistant was created
      </Heading>
    </Wrapper>
  );
};

export default ProductInfoLowerSectionHeading;
