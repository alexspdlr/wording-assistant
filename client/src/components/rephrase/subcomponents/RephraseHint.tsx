import styled from '@emotion/styled';
import calculateRephraseHintHeadingSize from 'src/utils/calculateRephraseHintHeadingSize';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';

/* ---------------------------- Styled components --------------------------- */

const Container = styled('div')(
  () => `
    position: absolute; 
    z-index: 0;  
    display: flex; 
    flex-grow: 1;
    justify-content: center;
    align-items: strech;
    flex-direction: column;
    text-align: left;
    padding: 29px 56px 72px 28px; 
    cursor: default;  
    animation: fade 300ms;
    @keyframes fade {
      0% { opacity: 0; } 
      50% {opacity: 0.8;}
      100% { opacity: 1; }
    } 

    `
);

interface HintHeadingProps {
  fontSize: number | string;
  lineHeight: number;
}

const HintHeading = styled('p')(
  (props: HintHeadingProps) => (defaultProps) =>
    `
      font-weight: 300;
      color: ${defaultProps.theme.palette.text.disabled};  
      margin: 0px; 
      line-height: ${props.lineHeight}px;
      font-size: ${props.fontSize}px;
      `
);

const HintBody = styled('p')(
  (props) => `
      font-size: 16px;
      font-weight: 300;
      color: ${props.theme.palette.text.disabled};  
      line-height: 20px;
      margin: 0px; 
      padding-top: 7px;
      `
);

/* -------------------------------------------------------------------------- */
/*                                RephraseHint                                */
/* -------------------------------------------------------------------------- */

interface RephraseHintProps {
  hideHint: boolean;
  title: string;
  subtitle: string;
}

const RephraseHint = (props: RephraseHintProps) => {
  const { hideHint, title, subtitle } = props;
  const activeBreakpoint = useBreakpoint();
  const HintHeadingTextSize =
    calculateRephraseHintHeadingSize(activeBreakpoint);

  return (
    <Container>
      <HintHeading
        fontSize={HintHeadingTextSize.fontSize}
        lineHeight={HintHeadingTextSize.lineHeight}
      >
        {!hideHint && title}
      </HintHeading>
      <HintBody>
        {!hideHint &&
          compareBreakpoint(activeBreakpoint, '>', '2XS') &&
          subtitle}
      </HintBody>
    </Container>
  );
};

export default RephraseHint;
