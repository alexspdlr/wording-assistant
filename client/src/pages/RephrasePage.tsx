import Section from 'src/components/section';
import RephraseTool from 'src/components/rephrase';
import QuoteSection from 'src/components/quote';
import InfoSection from 'src/components/info/InfoSection';
import { useTheme } from '@emotion/react';
import { useContext, useEffect } from 'react';
import SocketContext from 'src/contexts/SocketContext';

const RephrasePage = () => {
  const theme = useTheme();
  const { socket, uid, users } = useContext(SocketContext).SocketState;

  return (
    <>
      <Section backgroundColor={theme.palette.background.dark}>
        <RephraseTool />
      </Section>

      <Section backgroundColor={theme.palette.background.main}>
        <InfoSection />
      </Section>

      <Section backgroundColor={theme.palette.background.dark}>
        <QuoteSection />
      </Section>

      <div>
        <h2>Socket IO Information:</h2>
        <p>
          Your user ID: <strong>{uid}</strong>
          <br />
          Users online: <strong>{users.length}</strong>
          <br />
          Users:{' '}
          <strong>
            {users.map((user) => (
              <>
                <br />
                {user}
              </>
            ))}
          </strong>
          <br />
          Socket ID: <strong>{socket?.id}</strong>
          <br />
        </p>
      </div>
    </>
  );
};

export default RephrasePage;
