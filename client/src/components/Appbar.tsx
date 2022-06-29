import React from 'react';
import styled from '@emotion/styled';
import { ReactComponent as Logo } from '../assets/Logo.svg';
import { ReactComponent as LogoText } from '../assets/LogoText.svg';
import Button from './Button';
import useBreakpoint from '../utils/hooks/useBreakpoint';
import { Breakpoint } from '../types/breakpoint';
import pageMarginFromBreakpoint from '../utils/pageMarginFromBreakpoint';

interface AppbarStyledProps {
  horizontalPadding: number;
}

const AppbarStyled = styled('div')(
  (props: AppbarStyledProps) => `
  background-color : rgba(255, 255, 255, 1);
  height: 60px; 
  display: flex; 
  flex-direction: column;
  align-items: center;
  width: auto;
  padding-left: ${props.horizontalPadding}px; 
  padding-right: ${props.horizontalPadding}px;   
  transition: all 0.5s ease; 
  `
);

const Container = styled('div')(
  (props) => ` 
  width: 100%;   
  max-width: 1600px; 
  height: 100%; 
  display: flex; 
  justify-content: space-between;  
  flex-direction: row;  
  height: 100%;
  `
);

const Left = styled('div')(
  (props) => `
display: flex; 
justify-content: flex-start;  
flex-direction: row;  
align-items: flex-end; 
height: 100%; 
font-weight: 500; 
`
);

const Right = styled('div')(
  (props) => `
display: flex; 
justify-content: flex-start;  
flex-direction: row;  
align-items: center; 
height: auto; 
font-weight: 500; 
`
);

interface LinkProps {
  isFirstItem?: boolean;
}

const Link = styled('div')(
  (props: LinkProps) => `
  padding-bottom: 15px; 
  ${!props.isFirstItem && 'margin-left: 32px;'} 
  pointer: cursor;  
  border-bottom: 3px solid #ffffff;   
  &:hover {
    border-bottom: 3px solid rgba(0, 99, 149, 1);  
    cursor: pointer;  
    ${!props.isFirstItem && 'color: rgba(0, 99, 149, 1);'} 
  }
`
);

const Chip = styled('div')(
  (props) => `
  border-radius: 4px; 
  background-color: #037171;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
  width: auto; 
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 8px; 
  padding-right:8px;  
  margin-left: 5px;
  margin-bottom: -3px; 
`
);

const Appbar = () => {
  const activeBreakpoint = useBreakpoint();
  return (
    <AppbarStyled
      horizontalPadding={pageMarginFromBreakpoint(activeBreakpoint)}
    >
      <Container>
        <Left>
          <div
            style={{
              fontSize: '16px',
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <Logo
              style={{
                marginBottom: '-11px',
                width: '50px',
                marginRight: '10px',
                cursor: 'pointer',
              }}
            />
          </div>
          <Link isFirstItem>
            <div>
              <LogoText
                style={{
                  width: '64px',
                  height: 'auto',
                  marginBottom: '-5px',
                  marginRight: '5px',
                }}
              />
              Wording Assistant
            </div>
          </Link>
          <Link>Documentation</Link>
          {!(
            activeBreakpoint === '3XS' ||
            activeBreakpoint === '2XS' ||
            activeBreakpoint === 'XS'
          ) && <Link>Idea</Link>}
          {!(
            activeBreakpoint === '3XS' ||
            activeBreakpoint === '2XS' ||
            activeBreakpoint === 'XS'
          ) && <Link>Tech Stack</Link>}
          {(activeBreakpoint === '2XL' ||
            activeBreakpoint === 'XL' ||
            activeBreakpoint === 'L') && (
            <Link>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-end',
                }}
              >
                Repository
                <Chip>GITHUB</Chip>
              </div>
            </Link>
          )}
        </Left>
        <Right>
          <Button>Need help ?</Button>
        </Right>
      </Container>
    </AppbarStyled>
  );
};

export default Appbar;
