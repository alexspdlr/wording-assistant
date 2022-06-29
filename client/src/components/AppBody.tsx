import React from 'react';
import styled from '@emotion/styled';
import { ReactComponent as Logo } from '../assets/Logo.svg';
import { ReactComponent as LogoText } from '../assets/LogoText.svg';
import { ReactComponent as IconRephrase } from '../assets/IconRephrase.svg';
import Button from './Button';
import useBreakpoint from '../utils/hooks/useBreakpoint';
import { Breakpoint } from '../types/breakpoint';
import pageMarginFromBreakpoint from '../utils/pageMarginFromBreakpoint';
import useScrollPosition from '../utils/hooks/useScrollPosition';
import compareBreakpoint from '../utils/breakpointIsInRange';

interface AppBodyStyledProps {
  horizontalPadding: number;
}

const AppBodyStyled = styled('div')(
  (props: AppBodyStyledProps) => `
  background-color: #f7f7f7; 
  height: 830px; 
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
  padding-top: 20px; 
  padding-bottom: 56px; 
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 76px 604px 58px;
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  width: calc(100% - ${2 * props.horizontalPadding}px); 
  `
);

const ActiveToolButton = styled('button')(
  (props) => ` 
  height: 65px; 
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid rgb(218, 225, 232);
  border-bottom: 0px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 4px 0px;
  overflow: hidden;
  padding: 0px; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  `
);

const AppBody = () => {
  const activeBreakpoint = useBreakpoint();
  return (
    <AppBodyStyled
      horizontalPadding={pageMarginFromBreakpoint(activeBreakpoint)}
    >
      <Container horizontalPadding={pageMarginFromBreakpoint(activeBreakpoint)}>
        <div
          style={{
            gridArea: '1 / 1 / 2 / 3',
            display: 'flex',
          }}
        >
          <ActiveToolButton>
            <div
              style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 16,
                paddingRight: 16,
              }}
            >
              <IconRephrase fill='rgb(27, 30, 37)' />
              <div
                style={{
                  paddingLeft: 15,
                  fontWeight: 600,
                  fontSize: 16,
                  color: 'rgb(27, 30, 37)',
                  marginBottom: -2,
                  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;`,
                }}
              >
                Rephrase text
              </div>
            </div>
            <div
              style={{
                height: 4,
                width: '100%',
                backgroundColor: 'rgba(0, 99, 149, 1)',
              }}
            />
          </ActiveToolButton>
        </div>
        <div
          style={{
            gridArea: '2 / 1 / 3 / 2',
            backgroundColor: '#ffffff',
            borderRadius: 8,
            border: '1px solid rgb(218, 225, 232)',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px 0px',
          }}
        ></div>
        <div
          style={{
            gridArea: '2 / 2 / 3 / 3',
            backgroundColor: '#ffffff',
            borderRadius: 8,
            border: '1px solid rgb(218, 225, 232)',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px 0px',
          }}
        ></div>
        <div
          style={{
            gridArea: '3 / 1 / 4 / 3',
            backgroundColor: '#ffffff',
            borderRadius: 8,
            border: '1px solid rgb(218, 225, 232)',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px 0px',
          }}
        ></div>
      </Container>
    </AppBodyStyled>
  );
};

export default AppBody;
