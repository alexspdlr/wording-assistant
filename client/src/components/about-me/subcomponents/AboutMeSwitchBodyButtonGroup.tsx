import styled from '@emotion/styled';
import Button from 'src/components/general/button';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import AboutMeUnderline from './AboutMeUnderline';

/* ---------------------------- Styled components --------------------------- */
interface SwitchBodyButtonProps {
  active: boolean;
}

const SwitchBodyButton = styled(Button)(
  (props: SwitchBodyButtonProps) => (defaultProps) =>
    `  
      position: relative;
      z-index: ${props.active ? '10' : '1'};
      background-color:  ${defaultProps.theme.palette.background.light}; 
      color: ${
        props.active
          ? defaultProps.theme.palette.text.main
          : defaultProps.theme.palette.primary.light
      }; 
      padding: ${props.active ? '20px 28px 26px 28px' : '20px 28px'}; 
      margin-bottom: ${props.active ? '0px' : '6px'};
      height: ${props.active ? '64px' : '58px'};
      border-radius: ${props.active ? '5px 5px 0px 0px' : '5px'};
      box-shadow: 0px 22px 32px rgb(0 0 0 / 10%);
      font-weight: 600;
      &:hover {
        background-color:  ${defaultProps.theme.palette.background.light};
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

/* -------------------------------------------------------------------------- */
/*                        AboutMeSwitchBodyButtonGroup                        */
/* -------------------------------------------------------------------------- */
interface AboutMeSwitchBodyButtonGroupProps {
  motivationalLetterActive: boolean;
  setMotivationalLetterActive: (boolean: boolean) => void;
}

const AboutMeSwitchBodyButtonGroup = (
  props: AboutMeSwitchBodyButtonGroupProps
) => {
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
