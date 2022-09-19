import styled from '@emotion/styled';
import { Breakpoint } from 'src/types/breakpoint';
import calculateRephraseHintHeadingSize from 'src/utils/calculateRephraseHintHeadingSize';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';

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
    padding: 24px 56px 72px 36px; 
    cursor: default; 
    `
);

interface HintHeadingProps {
  fontSize: number;
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
