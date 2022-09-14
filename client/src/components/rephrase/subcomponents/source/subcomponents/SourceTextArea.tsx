import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import useBoundStore from 'src/store';
import addAlphaToHexColor from 'src/utils/addAlphaToHexColor';
import useClickAway from 'src/utils/hooks/useClickAway';
import useRephraseToolTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';
import wait from 'src/utils/wait';
import SourceClearButton from './SourceClearButton';

interface TextAreaProps {
  textSelected: boolean;
}

const TextArea = styled('textarea')(
  (props: TextAreaProps) => (defaultProps) =>
    ` width: 100%;
    border: none; 
    outline: none; 
    display: block;
    resize: none; 
    background-color: transparent;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica;
    font-weight: 400; 
    color: ${
      props.textSelected
        ? addAlphaToHexColor(defaultProps.theme.palette.text.main, 0.4)
        : defaultProps.theme.palette.text.main
    };   
    overflow: visible;
    margin: 0px 60px 0px 0px; 
    padding: 24px 0px 0px 36px;
    line-height: 0;
    position: relative; 
    flex-grow: 1;
    ::selection{
      background-color: ${addAlphaToHexColor(
        defaultProps.theme.palette.primary.light,
        0.175
      )};    
      color: ${addAlphaToHexColor(defaultProps.theme.palette.text.main, 1)};
    }
    ::-moz-selection{
      background-color: ${addAlphaToHexColor(
        defaultProps.theme.palette.primary.light,
        0.15
      )};    
      color: ${addAlphaToHexColor(defaultProps.theme.palette.text.main, 1)};
    }
    `
);

interface SourceTextAreaProps {
  value: string;
  setValue: Function;
}

const SourceTextArea = (props: SourceTextAreaProps) => {
  const { value, setValue } = props;
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const selectedSentence = useBoundStore((state) => state.originalSentence);
  useRephraseToolTextboxSize(value, textareaRef);

  const resetSelection = useBoundStore((state) => state.reset);

  const onClickAway = (event: any) => {
    const targetNode = event.target;
    const parentNode = event.target.parentNode;

    if (
      parentNode.id !== 'source-select-container' &&
      targetNode.id !== 'source-select-container'
    ) {
      resetSelection();
    } else {
      console.log(' select word or click parent   ');
    }
  };

  useClickAway(textareaRef, onClickAway);

  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const resetInput = () => {
    setValue('');
    if (textareaRef && textareaRef.current) {
      textareaRef.current.value = '';
    }
    textareaRef.current?.focus();
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.setSelectionRange(value.length, value.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TextArea
        id='source-value-input'
        ref={textareaRef}
        onChange={textAreaChange}
        autoFocus
        value={value}
        spellCheck={false}
        textSelected={!!selectedSentence}
      />
      {value && value.length > 0 && <SourceClearButton onClick={resetInput} />}
    </>
  );
};

export default SourceTextArea;
