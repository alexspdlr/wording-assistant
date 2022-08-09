import styled from '@emotion/styled';
import { ReactComponent as HireMeRobot } from 'src/assets/HireMeRobot.svg';

/* ---------------------------- Styled Components --------------------------- */

const Container = styled('div')(
  () => `  
        width: 130px;
        min-width: 130px;
        position: relative;
        z-index: 0;
            `
);

const StyledHireMeRobot = styled(HireMeRobot)(
  () => `  
    width: 155%;
      margin-left: -52%;
      margin-top: 45px;

              `
);

/* -------------------------------------------------------------------------- */
/*                                AboutMeRobot                                */
/* -------------------------------------------------------------------------- */

const AboutMeRobot = () => {
  return (
    <Container>
      <StyledHireMeRobot />
    </Container>
  );
};

export default AboutMeRobot;
