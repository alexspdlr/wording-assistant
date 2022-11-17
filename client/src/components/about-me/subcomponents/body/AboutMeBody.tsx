import styled from '@emotion/styled';
import { useState } from 'react';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import AboutMeSwitchBodyButtonGroup from '../AboutMeSwitchBodyButtonGroup';
import AboutMeBodyCV from './subcomponents/AboutMeBodyCV';
import AboutMeBodyMotivationalLetter from './subcomponents/AboutMeBodyMotivationalLetter';

/* ---------------------------- Styled components --------------------------- */

const Wrapper = styled('div')(
  () => `  
    flex-grow: 1; 
    max-width: 860px; 
    position: relative;
     z-index: 1;
      `
);

interface ContainerProps {
  isMotivationalLetterActive: boolean;
  padding: string;
}

const Container = styled('div')(
  (props: ContainerProps) => (defaultProps) =>
    `  
    background-color: ${defaultProps.theme.palette.background.light};
    box-shadow: 0px 22px 32px rgb(0 0 0 / 10%);
    z-index: 10; 
    position: relative;
    font-size: 14px; 
    font-weight: 300; 
    line-height: 24px; 
    text-align: justify; 
    border-radius: ${
      props.isMotivationalLetterActive ? '0px 5px 5px 5px' : '5px'
    };
    padding:${props.padding};
      `
);

/* -------------------------------------------------------------------------- */
/*                                 AboutMeBody                                */
/* -------------------------------------------------------------------------- */

const AboutMeBody = () => {
  const [motivationalLetterActive, setMotivationalLetterActive] =
    useState(true);
  const activeBreakpoint = useBreakpoint();

  return (
    <Wrapper>
      <AboutMeSwitchBodyButtonGroup
        motivationalLetterActive={motivationalLetterActive}
        setMotivationalLetterActive={setMotivationalLetterActive}
      />

      <Container
        isMotivationalLetterActive={motivationalLetterActive}
        padding={
          compareBreakpoint(activeBreakpoint, '<', 'M')
            ? '35px 45px'
            : ' 70px 90px'
        }
      >
        {motivationalLetterActive ? (
          <AboutMeBodyMotivationalLetter />
        ) : (
          <AboutMeBodyCV />
        )}
      </Container>
    </Wrapper>
  );
};

export default AboutMeBody;
