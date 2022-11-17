import styled from '@emotion/styled';
import ImageAlexHexagonsLight from 'src/assets/ImageAlexHexagonsLight.png';
import ImageAlexHexagonsDark from 'src/assets/ImageAlexHexagonsDark.png';
import { ReactComponent as QuotesIcon } from 'src/assets/QuotesIcon.svg';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import Button from '../general/button';
import QuoteSignature from './subcomponents/QuoteSignature';
import QuoteText from './subcomponents/QuoteText';
import { useTheme } from '@emotion/react';

/* ---------------------------- Styled components --------------------------- */

interface ContainerProps {
  isBreakpointSmallerS: boolean;
}
const Container = styled('div')(
  (props: ContainerProps) => ` 
  display: flex;
  align-items: flex-start; 
  justify-content: center; 
   padding: 120px 0;
   ${props.isBreakpointSmallerS ? 'padding: 60px 0;' : 'padding: 120px 0;'}
  `
);

interface QuoteCardProps {
  isBreakpointSmallerS: boolean;
}
const QuoteCard = styled('div')(
  (props: QuoteCardProps) => (defaultProps) =>
    ` 
  background-color: ${defaultProps.theme.palette.background.light};
  flex-grow: 1; 
  max-width: 650px; 
  border-radius: 5px; 
  box-shadow: 0px 32px 40px rgb(0 0 0 / 8%); 
  position: relative; 
  display: flex; 
  flex-direction: column; 
  ${props.isBreakpointSmallerS && 'margin: 0 16px;'}
  `
);

const PositionedQuoteIcon = styled(QuotesIcon)(
  (defaultProps) =>
    ` 
    width: 94px;
    position: absolute; 
    top: -28px;
    left: -28px;
    color: ${
      defaultProps.theme.activeMode === 'light'
        ? defaultProps.theme.palette.primary.main
        : defaultProps.theme.palette.primary.dark
    };
  `
);

const LowerSection = styled('div')(
  () => ` 
  display: flex;
  justify-content: space-between;
  padding: 14px 40px 0 60px;
  `
);

const LowerSectionLeft = styled('div')(
  () => ` 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  `
);

const PositionedImageAlex = styled('img')(
  () => ` 
  width: 220px;
  padding-right: 16px;
  `
);

/* -------------------------------------------------------------------------- */
/*                                 QuoteSection                               */
/* -------------------------------------------------------------------------- */

const QuoteSection = () => {
  const activeBreakpoint = useBreakpoint();
  const isBreakpointSmallerS = compareBreakpoint(activeBreakpoint, '<', 'S');
  const theme = useTheme();

  return (
    <Container isBreakpointSmallerS={isBreakpointSmallerS}>
      <QuoteCard isBreakpointSmallerS={isBreakpointSmallerS}>
        <PositionedQuoteIcon />
        <QuoteText />

        <LowerSection>
          <LowerSectionLeft>
            <Button
              variant='contained'
              onClick={() =>
                // eslint-disable-next-line no-restricted-globals
                (location.href = '/Process')
              }
            >
              Learn more{' '}
            </Button>
            <QuoteSignature />
          </LowerSectionLeft>
          {compareBreakpoint(activeBreakpoint, '>', 'XS') && (
            <PositionedImageAlex
              src={
                theme.activeMode === 'light'
                  ? ImageAlexHexagonsLight
                  : ImageAlexHexagonsDark
              }
              alt='Image of Alex'
            />
          )}
        </LowerSection>
      </QuoteCard>
    </Container>
  );
};

export default QuoteSection;
