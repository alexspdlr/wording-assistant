import styled from '@emotion/styled';
import React from 'react';
import compareBreakpoint from '../utils/compareBreakpoint';
import useBreakpoint from '../utils/hooks/useBreakpoint';
import pageMarginFromBreakpoint from '../utils/pageMarginFromBreakpoint';
import ActiveToolButton from './ActiveToolButton';
import { InputEl } from './InputEl';
import ToggleSwitch from './ToggleSwitch';
import { ReactComponent as RephraseTextIcon } from '../assets/RephraseTextIcon.svg';
import { ReactComponent as RephraseFilesIcon } from '../assets/RephraseFilesIcon.svg';
import Tooltip from './Tooltip';

interface AppBodyStyledProps {
  horizontalPadding: number;
}

const AppBodyStyled = styled('div')(
  (props: AppBodyStyledProps) => `
  background-color: #f7f7f7;   
  margin-top: 60px;
  display: flex; 
  justify-content: center; 
  width: 100%;  
  padding-right: ${props.horizontalPadding}; 
  padding-left: ${props.horizontalPadding};   
  `
);

interface ContainerProps {
  horizontalPadding: number;
  isMobileLayout: boolean;
}

const Container = styled('div')(
  (props: ContainerProps) => ` 
  max-width: 1400px; 
  padding-top: 18px; 
  padding-bottom: 56px; 
  display: grid;
  ${
    props.isMobileLayout
      ? 'grid-template-columns: 100%; grid-template-rows: repeat(2, 1fr) 58px;'
      : 'grid-template-columns: repeat(2, 1fr); grid-template-rows: 78px auto 58px;'
  }
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  width: calc(100% - ${2 * props.horizontalPadding}px); 
  `
);

interface PaperProps {
  gridArea?: string;
}

const Paper = styled('div')(
  (props: PaperProps) => ` 
  background-color: #ffffff; 
  border-radius: 8px; 
  border: 1px solid rgb(218, 225, 232);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 4px 0px; 
  display: flex; 
  &:focus-within {
    border: 1px solid rgb(0, 99, 149);
  }
  ${props.gridArea && `grid-area: ${props.gridArea};`} 
  `
);

const AppBody = () => {
  const activeBreakpoint = useBreakpoint();
  const isMobileLayout = compareBreakpoint(activeBreakpoint, '<', 'S');
  return (
    <AppBodyStyled
      horizontalPadding={pageMarginFromBreakpoint(activeBreakpoint)}
    >
      <Container
        horizontalPadding={pageMarginFromBreakpoint(activeBreakpoint)}
        isMobileLayout={isMobileLayout}
      >
        {!isMobileLayout && (
          <div
            style={{
              display: 'flex',
              gridArea: '1 / 1 / 2 / 3',
              gap: '10px',
            }}
          >
            <ActiveToolButton
              icon={<RephraseTextIcon />}
              text='Rephrase text'
              active
            />
            <ActiveToolButton
              icon={<RephraseFilesIcon />}
              text='Rephrase files'
              active={false}
            />
          </div>
        )}
        <Paper gridArea={isMobileLayout ? '1 / 1 / 2 / 2' : '2 / 1 / 3 / 2'}>
          <div
            style={{
              width: '100%',
              height: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                height: 56,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #F1F1F1',
                paddingLeft: 24,
                paddingRight: 24,
                fontWeight: 600,
              }}
            >
              Input text{' '}
              <Tooltip
                content='Switch between Edit & Rephrase Mode'
                delay={1000}
              >
                <ToggleSwitch />
              </Tooltip>
            </div>
            <InputEl />
          </div>
        </Paper>
        <Paper gridArea={isMobileLayout ? '2 / 1 / 3 / 2' : '2 / 2 / 3 / 3'}>
          <div
            style={{
              width: '100%',
              height: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                height: 56,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #F1F1F1',
                paddingLeft: 24,
                paddingRight: 24,
                fontWeight: 600,
              }}
            >
              Rephrase
            </div>
            <div>{''}</div>
          </div>
        </Paper>
        <Paper gridArea={isMobileLayout ? '3 / 1 / 4 / 2' : '3 / 1 / 4 / 3'}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              fontWeight: 400,
              color: 'rgb(110, 110, 110)',
              paddingLeft: 24,
              paddingRight: 24,
            }}
          >
            Switch between Edit &amp; Rephrase mode to craft beautiful text.
          </div>
        </Paper>
      </Container>
    </AppBodyStyled>
  );
};

export default AppBody;
