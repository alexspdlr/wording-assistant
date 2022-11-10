import styled from '@emotion/styled';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';

/* ---------------------------- Styled components --------------------------- */

interface ContainerProps {
  isBreakpointSmallerS: boolean;
}
const Container = styled('div')(
  (props: ContainerProps) => ` 
    padding: 42px 40px 0 70px;
    font-size: ${props.isBreakpointSmallerS ? '16px' : '19px'};
    line-height: ${props.isBreakpointSmallerS ? '26px' : '28px'};
    `
);

/* -------------------------------------------------------------------------- */
/*                                  QuoteText                                 */
/* -------------------------------------------------------------------------- */

const QuoteText = () => {
  const activeBreakpoint = useBreakpoint();
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat. Duis aute irure dolor in
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    pariatur.`;

  return (
    <Container
      isBreakpointSmallerS={compareBreakpoint(activeBreakpoint, '<', 'S')}
    >
      {text}
    </Container>
  );
};

export default QuoteText;
