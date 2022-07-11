import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as ClearIcon } from 'src/assets/ClearIcon.svg';
import { ReactComponent as CopyIcon } from 'src/assets/CopyIcon.svg';
import calculateRephraseToolTextSize from 'src/utils/calculateRephraseToolTextSize';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import useLocalStorage from 'src/utils/hooks/useLocalStorage';
import useWindowHeight from 'src/utils/hooks/useWindowSize';
import InputControlButton from '../../../InputControlButton';
import Tooltip from '../../../Tooltip';
import SourceHint from './SourceHint';

interface TextAreaProps {
  minHeight: string;
}

const TextArea = styled('textarea')(
  (props: TextAreaProps) => `
    min-height: ${props.minHeight};
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

const Source = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const activeBreakpoint = useBreakpoint();
  const windowHeight = useWindowHeight();
  const isMobileLayout = compareBreakpoint(activeBreakpoint, '<', 'S');
  const [value, setValue] = useLocalStorage('source-value', '');

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
      const textSize = calculateRephraseToolTextSize(
        activeBreakpoint,
        value ? value.length : 0
      );

      textareaRef.current.style.fontSize = textSize.fontSize + 'px';
      textareaRef.current.style.lineHeight = textSize.lineHeight + 'px';
    }
  }, [value, activeBreakpoint, windowHeight]);

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.setSelectionRange(value.length, value.length);
    }
  }, [value]);

  const resetInput = () => {
    setValue('');
    if (textareaRef && textareaRef.current) {
      textareaRef.current.value = '';
    }
    textareaRef.current?.focus();
  };

  const copyValue = () => {
    navigator.clipboard
      .writeText(value || '')
      .then(() => {
        alert(`"${value}" was copied to clipboard.`);
      })
      .catch((err) => {
        alert(`Error copying text to clipboard: ${err}`);
      });
  };

  const minHeightInput = isMobileLayout
    ? '17vh'
    : windowHeight > 990
    ? '439px'
    : '45vh';

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignContent: 'stretch',
        alignItems: 'stretch',
        position: 'relative',
      }}
    >
      <SourceHint
        hideHint={value ? value.length > 0 : false}
        activeBreakpoint={activeBreakpoint}
      />
      <TextArea
        ref={textareaRef}
        onChange={textAreaChange}
        autoFocus
        minHeight={minHeightInput}
      >
        {value}
      </TextArea>
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
        }}
      >
        {value && value.length > 0 && (
          <InputControlButton
            onClick={resetInput}
            icon={<ClearIcon />}
            variant='dynamic'
          />
        )}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '16px',
          display: 'flex',
        }}
      >
        <Tooltip content='Copy to Clipboard' direction='top'>
          <InputControlButton
            onClick={copyValue}
            icon={<CopyIcon />}
            variant='permanent'
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default Source;
