import React from 'react';
import styled from '@emotion/styled';
import useBreakpoint from '../../utils/hooks/useBreakpoint';
import useScrollPosition from '../../utils/hooks/useScrollPosition';
import pageMarginFromBreakpoint from '../../utils/pageMarginFromBreakpoint';
import Button from '../Button';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { ReactComponent as LogoText } from '../../assets/LogoText.svg';

interface AppBarStyledProps {
  horizontalPadding: number;
  isScrolledToTop: boolean;
}

const AppBarStyled = styled('div')(
  (props: AppBarStyledProps) => `
  background-color : rgba(255, 255, 255, 1);
  top: 0; 
  height: 60px; 
  display: flex; 
  justify-content: center; 
  position: fixed;  
  width: 100%; 
  padding-right: ${props.horizontalPadding}; 
  padding-left: ${props.horizontalPadding};   
  ${
    !props.isScrolledToTop && 'box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 10px 0px;'
  } 
  `
);

interface ContainerProps {
  horizontalPadding: number;
}

const Container = styled('div')(
  (props: ContainerProps) => ` 
  max-width: 1400px; 
  height: 100%;  
  display: flex; 
  justify-content: space-between;  
  flex-direction: row;  
  height: 100%;
  width: calc(100% - ${2 * props.horizontalPadding}px);     
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

const AppBar = () => {
  const activeBreakpoint = useBreakpoint();
  const scrollPosition = useScrollPosition();
  return (
    <AppBarStyled
      horizontalPadding={pageMarginFromBreakpoint(activeBreakpoint)}
      isScrolledToTop={scrollPosition === 0}
    >
      <Container horizontalPadding={pageMarginFromBreakpoint(activeBreakpoint)}>
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
          {!(activeBreakpoint === '3XS' || activeBreakpoint === '2XS') && (
            <Link>Documentation</Link>
          )}
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
    </AppBarStyled>
  );
};

export default AppBar;
