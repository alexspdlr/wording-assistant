import styled from '@emotion/styled';
import { relative } from 'path/posix';
import { ReactNode, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from 'src/components/general/card';
import useBoundStore from 'src/store';
import copyToClipboard from 'src/utils/copyToClipboard';
import generateDefaultWorkerState from 'src/utils/generateDefaultWorkerState';
import useActiveElement from 'src/utils/hooks/useActiveElement';
import useClickAway from 'src/utils/hooks/useClickAway';
import isMobileDevice from 'src/utils/isMobileDevice';
import { isMap } from 'util/types';
import RephraseHint from './RephraseHint';
import SourceCopyButton from './source/subcomponents/action-buttons/SourceActionButtons';
import SourceTextArea from './source/subcomponents/SourceTextArea';
import RephraseTarget from './target/RephraseTarget';

/* --------------------------------- Header --------------------------------- */

interface HeaderProps {
  isSource: boolean;
}

const Header = styled('div')(
  (props: HeaderProps) => (defaultProps) =>
    `  
    display: flex;
    justify-content: space-between;
    align-items: center; 
    padding: 21px 12px 21px 26px;
    font-weight: 600; 
    color: ${
      defaultProps.theme.activeMode === 'dark'
        ? defaultProps.theme.palette.text.light
        : defaultProps.theme.palette.primary.dark
    };
    border: 1px solid ${defaultProps.theme.palette.border};
    border-right: ${props.isSource && `none`};
    border-left: ${!props.isSource && `none`};
    border-bottom: none; 
    border-radius: ${props.isSource ? `8px 0px 0px 0px` : `0px 8px 0px 0px`}; 

        `
);

/* ---------------------------- Body --------------------------- */

interface BodyProps {
  isSource: boolean;
}

const Body = styled('div')(
  (props: BodyProps) => (defaultProps) =>
    `    
  border-right: ${
    props.isSource && `1px solid ${defaultProps.theme.palette.border}`
  };
  border: 1px solid ${defaultProps.theme.palette.border};
  border-right: ${props.isSource && '1px solid transparent'};
  display: flex; 
  flex-grow: 1;
  border-radius: ${props.isSource ? `0px 0px 0px 8px` : `0px 0px 8px 0px`}; 
  &:focus-within {
    border: 1px solid ${defaultProps.theme.palette.primary.light};
  }

  transition: border 150ms linear;
        `
);

/* ---------------------------- ToolCardContainer --------------------------- */

interface ToolCardContainerProps {}

const ToolCardContainer = styled(Card)(
  (props: ToolCardContainerProps) => (defaultProps) =>
    `  
        display: flex; 
        width: 100%;  
        flex-direction: column;  
        border: none; 
        overflow: hidden;
        `
);

/* -------------------------------------------------------------------------- */
/*                                  ToolCard                                  */
/* -------------------------------------------------------------------------- */

interface RephraseToolLayoutProps {}

const RephraseToolLayout = (props: RephraseToolLayoutProps) => {
  const {} = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const sourceValue = searchParams.get('source-value');

  return (
    <ToolCardContainer
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: '56px 1fr',
        marginTop: '12px',
      }}
    >
      <Header isSource style={{ gridArea: '1 / 1 / 2 / 2' }}>
        Enter Text
      </Header>
      <Header isSource={false} style={{ gridArea: '1 / 2 / 2 / 3' }}>
        Paraphrase
      </Header>
      <Body
        id='source-container'
        isSource
        style={{
          gridArea: '2 / 1 / 3 / 2',
          display: 'flex',
          position: 'relative',
        }}
      >
        <RephraseHint
          hideHint={sourceValue ? sourceValue.length > 0 : false}
          title='Paste or write your text'
          subtitle='Paste (Ctrl + V) or write the complete input text here. You can then rephrase it sentence by sentence.'
        />
        <SourceTextArea
          value={sourceValue || ''}
          setValue={(newVal: any) =>
            setSearchParams({ 'source-value': newVal })
          }
        />
        {sourceValue && sourceValue.length > 0 && (
          <SourceCopyButton
            onClick={() => copyToClipboard(sourceValue || '')}
          />
        )}
      </Body>
      <Body
        id='target-container'
        isSource={false}
        style={{ gridArea: '2 / 2 / 3 / 3' }}
      >
        <RephraseTarget />
      </Body>
    </ToolCardContainer>
  );
};

export default RephraseToolLayout;
