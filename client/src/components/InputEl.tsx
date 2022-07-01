import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';

const InputContainer = styled('div')(
  (props) => `
    display: flex;
    position: absolute; 
    z-index: 1; 
    margin-left: 24px;
    margin-top: 24px;
    margin-right: 64px;
    margin-bottom: 80px;
    flex-grow: 1;
    `
);

const InputHintHeading = styled('p')(
  (props) => `
    font-size: 24px;
    font-weight: 300;
    color: rgb(110, 110, 110); 
    margin: 0px; 
    line-height: 30px;
    `
);

const InputHintBody = styled('p')(
  (props) => `
    font-size: 16px;
    font-weight: 300;
    color: rgb(110, 110, 110); 
    line-height: 20px;
    margin: 0px; 
    padding-top: 12px;
    `
);

interface InputProps {
  hideHint: boolean;
}

const Input = (props: InputProps) => {
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
          <InputHintHeading>
            {!props.hideHint && 'Paste or write your text.'}
          </InputHintHeading>
          <InputHintBody>
            {!props.hideHint &&
              'Paste (Ctrl + V) or write the complete input text here. You can then rephrase it sentence by sentence.'}
          </InputHintBody>
        </div>
      </div>
    </InputContainer>
  );
};

const TextArea = styled('textarea')(
  (props) => `
    z-index: 2;
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
    min-height: 500px;
    background-color: transparent;
    font-size: 24px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica;
    font-weight: 400;
    color: rgb(51, 51, 51); 
    line-height: 33px;
    overflow: visible;
      `
);

function InputEl() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // The value of the textarea
  const [value, setValue] = useState<String>();

  // This function is triggered when textarea changes
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, [value]);

  return (
    <div
      style={{
        width: '100%',
        position: 'relative',
        display: 'flex',
      }}
    >
      <Input hideHint={value ? value.length > 0 : false} />
      <TextArea ref={textareaRef} onChange={textAreaChange}>
        {value}
      </TextArea>
    </div>
  );
}

export { InputEl };
