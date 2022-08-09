import styled from '@emotion/styled';
import { useState } from 'react';
import SignatureImage from 'src/assets/SignatureImage.png';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import AboutMeSwitchBodyButtonGroup from './AboutMeSwitchBodyButtonGroup';

interface CVSection {
  title: string;
  timeframe: string;
  bulletPoints: string[];
}

const CV = () => {
  const cvSections: CVSection[] = [
    {
      title: 'Building Critbase',
      timeframe: 'February 2021 - now',
      bulletPoints: [
        `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
     diam nonumy eirmod tempor invidunt ut labore et dolore magna
     aliquyam erat, sed diam voluptua`,
        `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
     diam nonumy eirmod tempor invidunt ut labore et dolore magna
     aliquyam erat, sed diam voluptua`,
        `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
     diam nonumy eirmod tempor invidunt ut labore et dolore magna
     aliquyam erat, sed diam voluptua`,
      ],
    },

    {
      title: 'Working Student @ Bank-Verlag GmbH',
      timeframe: 'February 2019 - February 2020',
      bulletPoints: [
        `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
     diam nonumy eirmod tempor invidunt ut labore et dolore magna
     aliquyam erat, sed diam voluptua`,
        `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
     diam nonumy eirmod tempor invidunt ut labore et dolore magna
     aliquyam erat, sed diam voluptua`,
        `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
     diam nonumy eirmod tempor invidunt ut labore et dolore magna
     aliquyam erat, sed diam voluptua`,
      ],
    },
    {
      title: 'Tutoring @ University Cologne',
      timeframe: 'February 2018 - February 2019',
      bulletPoints: [
        `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
     diam nonumy eirmod tempor invidunt ut labore et dolore magna
     aliquyam erat, sed diam voluptua`,
        `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
     diam nonumy eirmod tempor invidunt ut labore et dolore magna
     aliquyam erat, sed diam voluptua`,
        `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
     diam nonumy eirmod tempor invidunt ut labore et dolore magna
     aliquyam erat, sed diam voluptua`,
      ],
    },
  ];

  return (
    <>
      {cvSections.map((section) => (
        <span>
          <strong>{section.title}</strong> <br />
          <span style={{ fontSize: 13, fontWeight: 400 }}>
            {' '}
            {section.timeframe}{' '}
          </span>
          <ul
            style={{
              fontWeight: 300,
              marginTop: 15,
              paddingLeft: 22,
              paddingBottom: 28,
            }}
          >
            {section.bulletPoints.map((bulletPoint) => (
              <li
                style={{
                  paddingLeft: 4,
                  paddingBottom: 16,
                  lineHeight: '20px',
                  fontSize: 11,
                  color: '#000000',
                }}
              >
                <span style={{ fontSize: 14, color: '#000' }}>
                  {bulletPoint}
                </span>
              </li>
            ))}
          </ul>
        </span>
      ))}
    </>
  );
};

const Container = styled('div')(
  () => `  
    flex-grow: 1; 
    max-width: 900px; 
    position: relative;
     z-index: 1;
      `
);

const AboutMeBody = () => {
  const [motivationalLetterActive, setMotivationalLetterActive] =
    useState(true);

  const activeBreakpoint = useBreakpoint();

  return (
    <Container>
      <AboutMeSwitchBodyButtonGroup
        motivationalLetterActive={motivationalLetterActive}
        setMotivationalLetterActive={setMotivationalLetterActive}
      />

      <div
        style={{
          backgroundColor: '#ffffff',
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
                  <i>August 3rd, 2022</i>
                </strong>
              )}
            </span>
            <strong>Ref: InitiativeBewerbung IT - DeepL</strong> <br />
            <br />
            <br />
            Dear Mrs. Someone,
            <br />
            <br />
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
            dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua. <br />
            <br />
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
            kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
            amet. Duis autem vel eum iriure dolor in hendrerit in vulputate
            velit esse molestie consequat, vel illum dolore eu feugiat nulla
            facilisis at vero eros et accumsan et iusto odio dignissim qui
            blandit praesent luptatum zzril delenit augue duis dolore te feugait
            nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing
            elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore
            magna aliquam erat volutpat.
            <br />
            <br />
            Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper
            suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis
            autem vel eum iriure dolor in hendrerit in vulputate velit esse
            molestie consequat, vel illum dolore eu feugiat nulla facilisis at
            vero eros et accumsan et iusto odio dignissim qui blandit praesent
            luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
            <br />
            <br />
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
            kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
            amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
            diam nonumy eirmod tempor invidunt ut labore et dolore magna
            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
            duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
            consetetur sadipscing elitr, At accusam aliquyam diam diam dolore
            dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt
            justo labore Stet clita ea et gubergren, kasd magna no rebum.
            sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit
            amet. Lorem ipsum dolor sit amet, consetetur.
            <br />
            <br />
            Sincerely,
            <div style={{ width: '100%', marginTop: 50 }}>
              <img
                src={SignatureImage}
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
