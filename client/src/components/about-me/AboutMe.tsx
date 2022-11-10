import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import Section from 'src/components/appbody-section';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import AboutMeBody from './subcomponents/AboutMeBody';
import AboutMeContactButton from './subcomponents/AboutMeContactButton';
import AboutMeInfoPanel from './subcomponents/AboutMeInfoPanel';
import AboutMeRobot from './subcomponents/AboutMeRobot';

/* ---------------------------- Styled components --------------------------- */

interface ContainerProps {
  isSmallLayout: boolean;
}

const Container = styled('div')(
  (props: ContainerProps) => `  
    display: flex;
    justify-content: center;
    align-items: ${props.isSmallLayout ? 'center' : 'flex-start'};;
    margin: 65px 0;
    flex-direction: ${props.isSmallLayout ? 'column' : 'row'};
          `
);

const ColoredBackgroundSection = styled('div')(
  (props) => `  
    position: absolute;
    width: 100%;
    height: 528px;
    background-color: ${props.theme.palette.background.dark}; 
    top: 0;
            `
);

/* -------------------------------------------------------------------------- */
/*                                 AboutMe                                    */
/* -------------------------------------------------------------------------- */

const InfoSection = () => {
  const activeBreakpoint = useBreakpoint();
  const theme = useTheme();
  return (
    <>
      <AboutMeContactButton size='large'>Contact</AboutMeContactButton>
      <ColoredBackgroundSection />
      <Section
        backgroundColor={
          compareBreakpoint(activeBreakpoint, '<', 'XS')
            ? theme.palette.background.dark
            : theme.palette.background.main
        }
      >
        <Container
          isSmallLayout={compareBreakpoint(activeBreakpoint, '<', 'XS')}
        >
          <AboutMeInfoPanel />
          <AboutMeBody />
          {compareBreakpoint(activeBreakpoint, '>', 'M') && <AboutMeRobot />}
        </Container>
      </Section>
    </>
  );
};

export default InfoSection;
