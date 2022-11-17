import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import SignatureImageDark from 'src/assets/SignatureDark.png';
import SignatureImageLight from 'src/assets/SignatureLight.png';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';

/* ---------------------------- Styled components --------------------------- */

interface ContainerProps {
  width: string;
}

const Container = styled('div')(
  (props: ContainerProps) => `  
      position: absolute; 
      text-align: right; 
      width: ${props.width}
        `
);

/* -------------------------------------------------------------------------- */
/*                        AboutMeBodyMotivationalLetter                       */
/* -------------------------------------------------------------------------- */

const AboutMeBodyMotivationalLetter = () => {
  const activeBreakpoint = useBreakpoint();
  const theme = useTheme();
  return (
    <>
      <Container
        width={
          compareBreakpoint(activeBreakpoint, '<', 'M')
            ? 'calc(100% - 90px)'
            : 'calc(100% - 180px)'
        }
      >
        {compareBreakpoint(activeBreakpoint, '>', 'XS') && (
          <strong style={{ textAlign: 'right' }}>
            <i>November 17th, 2022</i>
          </strong>
        )}
      </Container>
      <strong>Ref: Frontend Developer</strong> <br />
      <br />
      <br />
      Dear Mr. Landwehr,
      <br />
      <br />
      If you had not published this vacancy, I would have sent a speculative
      application to DeepL within the next week, as I have been preparing this
      project to apply for this job for several months!
      <br />
      <br />
      You are looking for an outstanding frontend developer who can help you
      improve your apps and is capable of developing new exciting features. For
      the following reasons, I am convinced that I am the right person for the
      job.
      <br />
      <br />
      During my information systems studies, I was able to lay the foundation
      for my knowledge of algorithms, data structures, and design patterns. I
      then expanded and applied this knowledge when I developed the leading
      strategy planning tool for the Esport title Valorant: critbase.com. Within
      a few months, I took the idea from a first design to a mature web
      application built in React & Typescript. Besides designing and
      implementing a sophisticated frontend, I had to take on additional tasks
      in other disciplines, such as wireframing, KPI tracking, or database
      design. This has given me a good understanding of what designers, product
      managers, and backend developers are aiming for, and how to align the
      objectives of a frontend developer with theirs. I learned how to
      automatically verify that an application is working as intended when I
      prepared and conducted a workshop on "End-to-end testing with Cypress.io"
      during my master's degree. Furthermore, during the development
      of critbase.com, I unit-tested single components of the application with
      Jest.
      <br />
      <br />
      I am specifically interested in a job at your company because I strongly
      believe that DeepL has built up a unique expertise in the field of Natural
      Language Processing which still holds a lot of hidden potential for
      innovative products. Transforming this potential into products that pass
      on the maximum value to the user is a challenge that I would gladly
      dedicate myself to every day.
      <br />
      <br />
      If you are interested in discussing how I can help to overcome language
      barriers as part of your team, I look forward to a personal meeting with
      you - online or at one of your offices in Cologne or Paderborn.
      <br />
      <br />
      <i>
        P.S. Should I be accepted for the position, I would continue my Master's
        studies part-time in the evenings and on weekends.
      </i>
      <br />
      <br />
      Sincerely, <br />
      Alexander Spindeler
      <div style={{ width: '100%', marginTop: 50 }}>
        <img
          src={
            theme.activeMode === 'dark'
              ? SignatureImageDark
              : SignatureImageLight
          }
          style={{ width: '100%', maxWidth: 250 }}
          alt='SignatureImage'
        />
      </div>
    </>
  );
};

export default AboutMeBodyMotivationalLetter;
