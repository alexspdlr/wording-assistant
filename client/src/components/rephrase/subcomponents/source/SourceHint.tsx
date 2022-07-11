import styled from '@emotion/styled';
import React from 'react';
import { Breakpoint } from 'src/types/breakpoint';
import calculateRephraseHintHeadingSize from 'src/utils/calculateRephraseHintHeadingSize';
import compareBreakpoint from 'src/utils/compareBreakpoint';

const HintContainer = styled('div')(
  () => `
    position: absolute; 
    z-index: 1; 
    display: flex;
    margin-left: 24px;
    margin-top: 24px;
    margin-right: 64px;
    margin-bottom: 80px;
    flex-grow: 1;
    `
);

interface HintHeadingProps {
  fontSize: number;
  lineHeight: number;
}

const HintHeading = styled('p')(
  (props: HintHeadingProps) => `
      font-weight: 300;
      color: rgb(110, 110, 110); 
      margin: 0px; 
      line-height: ${props.lineHeight}px;
      font-size: ${props.fontSize}px;
      `
);

const HintBody = styled('p')(
  () => `
      font-size: 16px;
      font-weight: 300;
      color: rgb(110, 110, 110); 
      line-height: 20px;
      margin: 0px; 
      padding-top: 7px;
      `
);

interface HintProps {
  hideHint: boolean;
  activeBreakpoint: Breakpoint;
}

const SourceHint = (props: HintProps) => {
  const HintHeadingTextSize = calculateRephraseHintHeadingSize(
    props.activeBreakpoint
  );

  return (
    <HintContainer>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'strech',
        }}
      >
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
          }}
        >
          <HintHeading
            fontSize={HintHeadingTextSize.fontSize}
            lineHeight={HintHeadingTextSize.lineHeight}
          >
            {!props.hideHint && 'Paste or write your text'}
          </HintHeading>
          <HintBody>
            {!props.hideHint &&
              compareBreakpoint(props.activeBreakpoint, '>', '2XS') &&
              'Paste (Ctrl + V) or write the complete input text here. You can then rephrase it sentence by sentence.'}
          </HintBody>
        </div>
      </div>
    </HintContainer>
  );
};

export default SourceHint;
