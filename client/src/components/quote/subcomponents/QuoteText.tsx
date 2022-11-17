import styled from '@emotion/styled';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';

/* ---------------------------- Styled components --------------------------- */

interface ContainerProps {
  isBreakpointSmallerS: boolean;
}
const Container = styled('div')(
  (props: ContainerProps) => ` 
    padding: 42px 40px 10px 70px;
    font-size: ${props.isBreakpointSmallerS ? '16px' : '19px'};
    line-height: ${props.isBreakpointSmallerS ? '26px' : '28px'};
    `
);

/* -------------------------------------------------------------------------- */
/*                                  QuoteText                                 */
/* -------------------------------------------------------------------------- */

const QuoteText = () => {
  const activeBreakpoint = useBreakpoint();
  const text = `I strongly believe that DeepL has built up a unique expertise in the field of Natural Language Processing which still holds a lot of hidden potential for innovative products. Transforming this potential into products that pass on the maximum value to the user is a challenge that I would gladly dedicate myself to every day.`;

  return (
    <Container
      isBreakpointSmallerS={compareBreakpoint(activeBreakpoint, '<', 'S')}
    >
      {text}
    </Container>
  );
};

export default QuoteText;
