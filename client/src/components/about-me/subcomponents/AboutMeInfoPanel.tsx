import { useTheme } from '@emotion/react';
import { useState } from 'react';
import PersonCutout from 'src/assets/PersonCutout.png';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import AboutMeUnderline from './AboutMeUnderline';

const AboutMeInfoPanel = () => {
  const [personCutoutLoading, setPersonCutoutLoading] = useState(true);
  const activeBreakpoint = useBreakpoint();
  const isSmallLayout = compareBreakpoint(activeBreakpoint, '<', 'XS');

  const theme = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.light,
        flexGrow: 1,
        maxWidth: isSmallLayout ? 1000 : 210,
        borderRadius: 5,
        marginRight: isSmallLayout ? 0 : 10,
        marginTop: isSmallLayout ? 0 : 64,
        marginBottom: isSmallLayout ? 64 : 0,
        boxShadow: '-8px 22px 32px rgb(0 0 0 / 10%)',
        position: 'relative',
        zIndex: 2,
        padding: 30,
      }}
    >
      <img
        src={PersonCutout}
        onLoad={() => setPersonCutoutLoading(false)}
        style={{
          display: personCutoutLoading ? 'none' : 'block',
          width: 'calc(100% - 40px)',
          backgroundColor: theme.palette.background.main,
          padding: '20px 20px 0 20px',
          borderRadius: '5px 5px 0 0',
        }}
        alt='PersonCutout'
      />
      {personCutoutLoading && (
        <div
          style={{
            padding: '20px 20px 0 20px',
            height: 289,
            backgroundColor: theme.palette.background.dark,
            width: 'calc(100% - 40px)',
          }}
        />
      )}
      <div
        style={{
          padding: '0 10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          lineHeight: '24px',
          fontWeight: 300,
        }}
      >
        <span
          style={{
            color: theme.palette.primary.main,
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: 4,
            textAlign: 'center',
            margin: '24px 0',
          }}
        >
          ALEXANDER
          <br />
          SPINDELER
        </span>

        <span
          style={{
            textAlign: 'center',
            fontSize: 14,
            padding: '0 10px 30px 10px',
          }}
        >
          23-year-old software architecture student with a passion for creating
          useful, easy-to-use software products
        </span>

        <div
          style={{
            height: '1px',
            backgroundColor: theme.palette.divider,
            width: '80%',
          }}
        />
        <div style={{ padding: '30px' }}>
          <span style={{ fontWeight: 600 }}>Skills</span>

          <AboutMeUnderline width={42} />
        </div>
        <span
          style={{
            textAlign: 'center',
            fontSize: 14,
            padding: '0 10px 30px 10px',
          }}
        >
          React, Javascript, Python, Jira, NoSQL, Figma, Firebase, Google, Open
          Office, Dropbox, Youtube, Tic Tac Toe
        </span>
        <div style={{ padding: '10px 30px 30px 30px' }}>
          <span style={{ fontWeight: 600 }}>Contact</span>

          <AboutMeUnderline width={62} />
        </div>
        <span
          style={{
            textAlign: 'center',
            fontSize: 14,
            padding: '0 10px 30px 10px',
          }}
        >
          +49 172 7761296 a.spindeler@web.de
          <br />
          <br />
          Ebertplatz 7
          <br />
          50668 Köln
        </span>
      </div>
    </div>
  );
};

export default AboutMeInfoPanel;
