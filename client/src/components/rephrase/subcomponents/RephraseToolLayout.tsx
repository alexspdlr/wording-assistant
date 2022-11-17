import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';
import Card from 'src/components/general/card';
import RephraseHint from './RephraseHint';
import SourceActionButtons from './source/subcomponents/action-buttons/SourceActionButtons';
import SourceTextArea from './source/subcomponents/SourceTextArea';
import RephraseTarget from './target/RephraseTarget';

/* ---------------------------- Styled components --------------------------- */

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
    border-bottom: none; 
    border-right: ${props.isSource && `none`};
    border-left: ${!props.isSource && `none`};
    border-radius: ${props.isSource ? `8px 0px 0px 0px` : `0px 8px 0px 0px`}; 
      `
);

interface BodyProps {
  isSource: boolean;
}
const Body = styled('div')(
  (props: BodyProps) => (defaultProps) =>
    `    
    display: flex; 
    flex-grow: 1;
    transition: border 150ms linear;
    border-right: ${
      props.isSource && `1px solid ${defaultProps.theme.palette.border}`
    };
    border: 1px solid ${defaultProps.theme.palette.border};
    border-right: ${props.isSource && '1px solid transparent'};
    border-radius: ${props.isSource ? `0px 0px 0px 8px` : `0px 0px 8px 0px`}; 
    &:focus-within {
    border: 1px solid ${defaultProps.theme.palette.primary.light};
    }
    `
);

const ToolCardContainer = styled(Card)(
  () =>
    `  
    display: flex; 
    width: 100%;  
    flex-direction: column;  
    border: none; 
    overflow: hidden;
  `
);

/* -------------------------------------------------------------------------- */
/*                             RephraseToolLayout                             */
/* -------------------------------------------------------------------------- */

const RephraseToolLayout = () => {
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
        Enter Text - English only
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
          title='Paste or type your text'
          subtitle={`Paste (${
            navigator.userAgent.indexOf('Mac') !== -1 ? '⌘' : 'Ctrl'
          } + V) or type the complete input text here. You can then rephrase it sentence by sentence.`}
        />
        <SourceTextArea
          value={sourceValue || ''}
          setValue={(newVal: any) =>
            setSearchParams({ 'source-value': newVal })
          }
        />
        {sourceValue && sourceValue.length > 0 && <SourceActionButtons />}
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
