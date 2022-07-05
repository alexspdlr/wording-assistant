import styled from '@emotion/styled';
import { breakpoints } from '@mui/system';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Breakpoint } from '../types/breakpoint';
import compareBreakpoint from '../utils/breakpointIsInRange';
import useBreakpoint from '../utils/hooks/useBreakpoint';
import useWindowHeight from '../utils/hooks/useWindowSize';

interface TextSize {
  fontSize: number;
  lineHeight: number;
}

const inputTextSize = (
  breakpoint: Breakpoint,
  textLength: number
): TextSize => {
  switch (breakpoint) {
    case '2XL':
      if (textLength < 55) {
        return {
          fontSize: 26,
          lineHeight: 39,
        };
      }

      if (textLength < 175) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      return {
        fontSize: 20,
        lineHeight: 30,
      };

    case 'XL':
      if (textLength < 50) {
        return {
          fontSize: 26,
          lineHeight: 39,
        };
      }

      if (textLength < 175) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      return {
        fontSize: 20,
        lineHeight: 30,
      };

    case 'L':
      if (textLength < 45) {
        return {
          fontSize: 26,
          lineHeight: 39,
        };
      }

      if (textLength < 150) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      return {
        fontSize: 20,
        lineHeight: 30,
      };

    case 'M':
      if (textLength < 40) {
        return {
          fontSize: 26,
          lineHeight: 39,
        };
      }

      if (textLength < 125) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      return {
        fontSize: 20,
        lineHeight: 30,
      };

    case 'S':
      if (textLength < 35) {
        return {
          fontSize: 26,
          lineHeight: 39,
        };
      }

      if (textLength < 105) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      return {
        fontSize: 20,
        lineHeight: 30,
      };

    case 'XS':
      if (textLength < 25) {
        return {
          fontSize: 26,
          lineHeight: 39,
        };
      }

      if (textLength < 85) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      return {
        fontSize: 20,
        lineHeight: 30,
      };

    case '2XS':
      if (textLength < 50) {
        return {
          fontSize: 26,
          lineHeight: 39,
        };
      }

      if (textLength < 155) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      return {
        fontSize: 20,
        lineHeight: 30,
      };

    default:
      if (textLength < 55) {
        return {
          fontSize: 22,
          lineHeight: 33,
        };
      }

      return {
        fontSize: 20,
        lineHeight: 30,
      };
  }
};
/* 2XL 

0-54 -> 26px, 39px
55- 175 -> 22px, 33px
176 - inf -> 20px, 30px 

*/

/* XL 
0-49 -> 26px, 39px
50- 175 -> 22px, 33px
176 - inf -> 20px, 30px 
*/

/* L 
0-44 -> 26px, 39px
50- 149 -> 22px, 33px
150 - inf -> 20px, 30px 
*/

/* M
0-39 -> 26px, 39px
39- 124 -> 22px, 33px
125 - inf -> 20px, 30px 
*/

/* S
0-34 -> 26px, 39px
34- 104 -> 22px, 33px
105 - inf -> 20px, 30px 
*/

/* XS
0-24 -> 26px, 39px
25- 84 -> 22px, 33px
85 - inf -> 20px, 30px 
*/

/* 2XS
0-49 -> 26px, 39px
50- 154 -> 22px, 33px
155 - inf -> 20px, 30px 
*/

/* 3XS
0 -> 26px, 39px
0- 54 -> 22px, 33px
55 - inf -> 20px, 30px 
*/

const InputContainer = styled('div')(
  (props) => `
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

const inputHintHeadingFontSize = (activeBreakpoint: Breakpoint): TextSize => {
  if (compareBreakpoint(activeBreakpoint, '>', 'S')) {
    return {
      fontSize: 26,
      lineHeight: 32.5,
    };
  }

  if (compareBreakpoint(activeBreakpoint, '>', '2XS')) {
    return {
      fontSize: 24,
      lineHeight: 30,
    };
  }

  return {
    fontSize: 16,
    lineHeight: 20,
  };
};
interface InputHintHeadingProps {
  fontSize: number;
  lineHeight: number;
}

const InputHintHeading = styled('p')(
  (props: InputHintHeadingProps) => `
    font-weight: 300;
    color: rgb(110, 110, 110); 
    margin: 0px; 
    line-height: ${props.lineHeight}px;
    font-size: ${props.fontSize}px;
    `
);

const InputHintBody = styled('p')(
  (props) => `
    font-size: 16px;
    font-weight: 300;
    color: rgb(110, 110, 110); 
    line-height: 20px;
    margin: 0px; 
    padding-top: 8px;
    `
);

interface InputProps {
  hideHint: boolean;
  activeBreakpoint: Breakpoint;
}

const Input = (props: InputProps) => {
  const inputHintHeadingTextSize = inputHintHeadingFontSize(
    props.activeBreakpoint
  );

  return (
    <InputContainer>
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
          <InputHintHeading
            fontSize={inputHintHeadingTextSize.fontSize}
            lineHeight={inputHintHeadingTextSize.lineHeight}
          >
            {!props.hideHint && 'Paste or write your text.'}
          </InputHintHeading>
          <InputHintBody>
            {!props.hideHint &&
              compareBreakpoint(props.activeBreakpoint, '>', '2XS') &&
              'Paste (Ctrl + V) or write the complete input text here. You can then rephrase it sentence by sentence.'}
          </InputHintBody>
        </div>
      </div>
    </InputContainer>
  );
};

const TextArea = styled('textarea')(
  (props) => `
    margin-left: 24px;
    margin-top: 24px;
    margin-right: 64px;
    margin-bottom: 80px;
    padding: 0;
    flex-grow: 1;
    outline: none;
    border: none;
    display: block;
    resize: none;
    z-index: 2;
    background-color: transparent;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica;
    font-weight: 400;
    color: rgb(51, 51, 51);  
    overflow: visible;
      `
);

function InputEl() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const activeBreakpoint = useBreakpoint();
  const windowHeight = useWindowHeight();

  // The value of the textarea
  const [value, setValue] = useState<String>();

  // This function is triggered when textarea changes
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';

      // set text size
      const textSize = inputTextSize(
        activeBreakpoint,
        value ? value.length : 0
      );
      textareaRef.current.style.fontSize = textSize.fontSize + 'px';
      textareaRef.current.style.lineHeight = textSize.lineHeight + 'px';
    }
  }, [value, activeBreakpoint, windowHeight]);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        minHeight: '55vh',
        alignContent: 'stretch',
        alignItems: 'stretch',
        position: 'relative',
      }}
    >
      <Input
        hideHint={value ? value.length > 0 : false}
        activeBreakpoint={activeBreakpoint}
      />
      <TextArea ref={textareaRef} onChange={textAreaChange}>
        {value}
      </TextArea>
    </div>
  );
}

export { InputEl };