import { useTheme } from '@emotion/react';

/* -------------------------------- Constants ------------------------------- */

interface CVSection {
  title: string;
  timeframe: string;
  bulletPoints: string[];
}

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

/* -------------------------------------------------------------------------- */
/*                                AboutMeBodyCV                               */
/* -------------------------------------------------------------------------- */

const AboutMeBodyCV = () => {
  const theme = useTheme();

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

export default AboutMeBodyCV;
