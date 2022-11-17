import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import SignatureImageDark from 'src/assets/SignatureDark.png';
import SignatureImageLight from 'src/assets/SignatureLight.png';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import AboutMeSwitchBodyButtonGroup from './AboutMeSwitchBodyButtonGroup';

interface CVSection {
  title: string;
  timeframe: string;
  bulletPoints: string[];
}

const CV = () => {
  const theme = useTheme();
  const cvSectionsExperience: CVSection[] = [
    {
      title: 'Building Critbase',
      timeframe: 'August 2021 - Now',
      bulletPoints: [
        `Designed, planned and built the leading strategy planning tool for Valorant Esport teams (critbase.com) from the ground up using React.js & Typescript`,
        `Within less than 4 months, went from the first line of code to more than 1000 daily active users in the first 4 weeks post-launch`,
        `Converted ~4% of daily active users to paying customers buying subscriptions up to 180$ / year`,
        `Switched between tasks like graphic design, (NoSQL)-database engineering, KPI Tracking and unit testing on a daily basis to always tackle the most critical problem`,
      ],
    },

    {
      title: 'Working Student @ Bank-Verlag GmbH',
      timeframe: 'March 2020 - February 2021',
      bulletPoints: [
        `Researched how credit card transaction fraud protection can be optimized through the use of machine learning techniques`,
        `In a small team of four people, developed a methodology for analyzing areas with high optimization potential, derived concrete ideas from a theoretical basis and successively conceptualized prototypes`,
        `Evaluated the impact our solutions would have on the current billing system, which processes 30 million credit and debit cards and handles 600 million transactions per year`,
      ],
    },
    {
      title: 'Tutor @ Cologne University',
      timeframe: 'October 2019 - February 2020',
      bulletPoints: [
        `Taught first semester students the basics of information systems management as a tutor at the Faculty of Business and Economics`,
        `Together with other tutors, organized tutorials to familiarize the students with the theoretical knowledge covered in the lectures`,
        `Took on additional responsibilities such as advising students on their course of study and completing the first revision of the final exams in that course`,
      ],
    },
    {
      title: 'Volunteer @ Melamchi Gaon School (Nepal)',
      timeframe: 'October 2016 - February 2017',
      bulletPoints: [
        `Spent 5 months living in a small mountain village, where i was involved in a project that was established in the wake of the 2015 earthquake in Nepal`,
        `Taught students from grades 2-10 in English and assisted the school with the reorganization process that was necessary due to the damage caused by the earthquake`,
      ],
    },
  ];

  const cvSectionsEducation: CVSection[] = [
    {
      title: 'Software Architecture @ TH Köln',
      timeframe: 'July 2021 - Now',
      bulletPoints: [
        `As part of the Web Technologies module, developed a React.js Web Application that presents the works of Lucas Cranach in a walk-in 3D gallery`,
        `Conducted a workshop on "End-to-end testing with Cypress.io", where I introduced 20 fellow students to the basics of automated user testing`,
      ],
    },

    {
      title: 'Information Systems @ Cologne University',
      timeframe: 'October 2017 - September 2021',
      bulletPoints: [
        `In my bachelor thesis, screened 106 scientific papers on agile information systems development, filtered the 29 most relevant ones and compared their distribution across agile methods, agile practices and research approaches`,
        `Developed a chat application with "payment sharing" function for chat groups in a practical project in cooperation with Bank Verlag GmbH; taught myself React.js during the ongoing project and built the frontend from the ground up`,
      ],
    },
  ];

  return (
    <span>
      <span
        style={{
          fontSize: '16px',
          fontWeight: 600,
        }}
      >
        WORK & SOCIAL EXPERIENCE
      </span>
      <br />
      <br />
      {cvSectionsExperience.map((section) => (
        <span>
          <strong
            style={{
              color: theme.palette.primary.light,
            }}
          >
            {section.title}
          </strong>
          <br />
          <span style={{ fontSize: 13, fontWeight: 400 }}>
            {section.timeframe}
          </span>
          <ul
            style={{
              fontWeight: 300,
              marginTop: 10,
              paddingLeft: 22,
              paddingBottom: 10,
              marginBottom: 10,
            }}
          >
            {section.bulletPoints.map((bulletPoint) => (
              <li
                style={{
                  paddingLeft: 4,
                  paddingBottom: 10,
                  lineHeight: '20px',
                  fontSize: 11,
                  color: theme.palette.text.dark,
                }}
              >
                <span style={{ fontSize: 14, color: theme.palette.text.dark }}>
                  {bulletPoint}
                </span>
              </li>
            ))}
          </ul>
        </span>
      ))}
      <br />
      <span
        style={{
          fontSize: '16px',
          fontWeight: 600,
          paddingTop: '20px',
        }}
      >
        EDUCATION
      </span>
      <br />
      <br />

      {cvSectionsEducation.map((section) => (
        <span>
          <strong
            style={{
              color: theme.palette.primary.light,
            }}
          >
            {section.title}
          </strong>{' '}
          <br />
          <span style={{ fontSize: 13, fontWeight: 400 }}>
            {' '}
            {section.timeframe}{' '}
          </span>
          <ul
            style={{
              fontWeight: 300,
              marginTop: 10,
              paddingLeft: 22,
              paddingBottom: 10,
              marginBottom: 10,
            }}
          >
            {section.bulletPoints.map((bulletPoint) => (
              <li
                style={{
                  paddingLeft: 4,
                  paddingBottom: 10,
                  lineHeight: '20px',
                  fontSize: 11,
                  color: theme.palette.text.dark,
                }}
              >
                <span style={{ fontSize: 14, color: theme.palette.text.dark }}>
                  {bulletPoint}
                </span>
              </li>
            ))}
          </ul>
        </span>
      ))}
    </span>
  );
};

const Container = styled('div')(
  () => `  
    flex-grow: 1; 
    max-width: 860px; 
    position: relative;
     z-index: 1;
      `
);

const AboutMeBody = () => {
  const [motivationalLetterActive, setMotivationalLetterActive] =
    useState(true);
  const theme = useTheme();
  const activeBreakpoint = useBreakpoint();

  return (
    <Container>
      <AboutMeSwitchBodyButtonGroup
        motivationalLetterActive={motivationalLetterActive}
        setMotivationalLetterActive={setMotivationalLetterActive}
      />

      <div
        style={{
          backgroundColor: theme.palette.background.light,
          borderRadius: motivationalLetterActive ? '0px 5px 5px 5px' : '5px',
          padding: compareBreakpoint(activeBreakpoint, '<', 'M')
            ? '35px 45px'
            : ' 70px 90px',
          boxShadow: '0px 22px 32px rgb(0 0 0 / 10%)',
          position: 'relative',
          zIndex: 10,
          fontSize: 14,
          fontWeight: 300,
          lineHeight: '24px',
          textAlign: 'justify',
        }}
      >
        {motivationalLetterActive ? (
          <>
            <span
              style={{
                position: 'absolute',
                textAlign: 'right',
                width: compareBreakpoint(activeBreakpoint, '<', 'M')
                  ? 'calc(100% - 90px)'
                  : 'calc(100% - 180px)',
              }}
            >
              {compareBreakpoint(activeBreakpoint, '>', 'XS') && (
                <strong style={{ textAlign: 'right' }}>
                  <i>November 17th, 2022</i>
                </strong>
              )}
            </span>
            <strong>Ref: Frontend Developer (f/m/d) - GER, UK, NL, PL</strong>{' '}
            <br />
            <br />
            <br />
            Dear Mr. Landwehr,
            <br />
            <br />
            If you had not published this vacancy, I would have sent a
            speculative application to DeepL within the next week, as I have
            been preparing this project to apply for this job for several
            months!
            <br />
            <br />
            You are looking for an outstanding frontend developer who can help
            you improve your apps and is capable of developing new exciting
            features. For the following reasons, I am convinced that I am the
            right person for the job.
            <br />
            <br />
            During my information systems studies, I was able to lay the
            foundation for my knowledge of algorithms, data structures, and
            design patterns. I then expanded and applied this knowledge when I
            developed the leading strategy planning tool for the Esport
            title Valorant: critbase.com. Within a few months, I took the idea
            from a first design to a mature web application built in React &
            Typescript. Besides designing and implementing a sophisticated
            frontend, I had to take on additional tasks in other disciplines,
            such as wireframing, KPI tracking, or database design. This has
            given me a good understanding of what designers, product managers,
            and backend developers are aiming for, and how to align the
            objectives of a frontend developer with theirs. I learned how to
            automatically verify that an application is working as intended when
            I prepared and conducted a workshop on "End-to-end testing
            with Cypress.io" during my master's degree. Furthermore, during the
            development of critbase.com, I unit-tested single components of the
            application with Jest.
            <br />
            <br />
            I am specifically interested in a job at your company because I
            strongly believe that DeepL has built up a unique expertise in the
            field of Natural Language Processing which still holds a lot of
            hidden potential for innovative products. Transforming this
            potential into products that pass on the maximum value to the user
            is a challenge that I would gladly dedicate myself to every day.
            <br />
            <br />
            If you are interested in discussing how I can help to overcome
            language barriers as part of your team, I look forward to a personal
            meeting with you - online or at one of your offices in Cologne or
            Paderborn.
            <br />
            <br />
            <i>
              P.S. Should I be accepted for the position, I would continue my
              Master's studies part-time in the evenings and on weekends.
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
        ) : (
          <CV />
        )}
      </div>
    </Container>
  );
};

export default AboutMeBody;
