import styled from '@emotion/styled';
import { useState } from 'react';
import SignatureImage from 'src/assets/SignatureImage.png';
import Button from 'src/components/general/button';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import AboutMeUnderline from './AboutMeUnderline';

interface SwitchBodyButtonProps {
  active: boolean;
}

const SwitchBodyButton = styled(Button)(
  (props: SwitchBodyButtonProps) => `  
      position: relative;
      z-index: ${props.active ? '10' : '1'};
      background-color:  #ffffff; 
      color: ${props.active ? '#0F2B46' : '#006494'}; 
      padding: ${props.active ? '20px 28px 26px 28px' : '20px 28px'}; 
      margin-bottom: ${props.active ? '0px' : '6px'};
      height: ${props.active ? '64px' : '58px'};
      border-radius: ${props.active ? '5px 5px 0px 0px' : '5px'};
      box-shadow: 0px 22px 32px rgb(0 0 0 / 10%);
      font-weight: 600;
      &:hover {
        background-color:  #f0f9ff;  
      }
      transition: all 0.15s; 
      `
);

const SwitchBodyButtonGroupContainer = styled('div')(
  () => `  
        display: flex;
        gap: 6px; 
        `
);

interface SwitchBodyButtonGroupProps {
  motivationalLetterActive: boolean;
  setMotivationalLetterActive: (boolean: boolean) => void;
}

const AboutMeSwitchBodyButtonGroup = (props: SwitchBodyButtonGroupProps) => {
  const { motivationalLetterActive, setMotivationalLetterActive } = props;
  const activeBreakpoint = useBreakpoint();
  const isSmallLayout = compareBreakpoint(activeBreakpoint, '<', 'S');

  return (
    <SwitchBodyButtonGroupContainer>
      <SwitchBodyButton
        active={motivationalLetterActive}
        onClick={() => setMotivationalLetterActive(true)}
      >
        {isSmallLayout ? 'Motivation' : 'Motivational Letter'}
        {motivationalLetterActive && (
          <AboutMeUnderline width={isSmallLayout ? 80 : 142} />
        )}
      </SwitchBodyButton>
      <SwitchBodyButton
        active={!motivationalLetterActive}
        onClick={() => setMotivationalLetterActive(false)}
      >
        {isSmallLayout ? 'CV' : ' Curriculum Vitae'}

        {!motivationalLetterActive && (
          <AboutMeUnderline width={isSmallLayout ? 23 : 128} />
        )}
      </SwitchBodyButton>
    </SwitchBodyButtonGroupContainer>
  );
};

export default AboutMeSwitchBodyButtonGroup;
