import React from 'react';
import styled from '@emotion/styled';
import { ReactComponent as Logo } from '../assets/Logo.svg';
import { ReactComponent as LogoText } from '../assets/LogoText.svg';
import Button from './Button';
import useBreakpoint from '../utils/hooks/useBreakpoint';
import { Breakpoint } from '../types/breakpoint';
import pageMarginFromBreakpoint from '../utils/pageMarginFromBreakpoint';
import useScrollPosition from '../utils/hooks/useScrollPosition';
import compareBreakpoint from '../utils/breakpointIsInRange';
import ActiveToolButton from './ActiveToolButton';
import ToggleSwitch from './ToggleSwitch';
import { InputEl } from './InputEl';
import useWindowHeight from '../utils/hooks/useWindowSize';

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
}

const Container = styled('div')(
  (props: ContainerProps) => ` 
  max-width: 1400px; 
  padding-top: 18px; 
  padding-bottom: 56px; 
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 76px auto 58px; 
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
  return (
    <AppBodyStyled
      horizontalPadding={pageMarginFromBreakpoint(activeBreakpoint)}
    >
      <Container horizontalPadding={pageMarginFromBreakpoint(activeBreakpoint)}>
        <div style={{ display: 'flex', gridArea: '1 / 1 / 2 / 3' }}>
          <ActiveToolButton />
        </div>
        <Paper gridArea='2 / 1 / 3 / 2'>
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
              Input text <ToggleSwitch />
            </div>
            <InputEl />
          </div>
        </Paper>
        <Paper gridArea='2 / 2 / 3 / 3'>
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
        <Paper gridArea='3 / 1 / 4 / 3'>
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
