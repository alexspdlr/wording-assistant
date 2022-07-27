import styled from '@emotion/styled';
import { ReactComponent as QuotesIcon } from 'src/assets/QuotesIcon.svg';
import PersonImage from 'src/assets/PersonImage.png';
import SignatureImage from 'src/assets/SignatureImage.png';
import Button from '../general/button';

/* -------------------------------- Container ------------------------------- */

interface ContainerProps {}

const Container = styled('div')(
  (props: ContainerProps) => ` 
  display: flex;
  align-items: flex-start; 
  justify-content: center; 
   padding: 120px 0;
  `
);

/* -------------------------------- Paper ------------------------------- */

const Paper = styled('div')(
  () => ` 
  background-color: #ffffff;
  flex-grow: 1; 
  max-width: 650px; 
  border-radius: 5px; 
  box-shadow: 0px 32px 40px rgb(0 0 0 / 8%); 
  position: relative; 
  display: flex; 
  flex-direction: column; 
  `
);

/* -------------------------------------------------------------------------- */
/*                                 QuoteSection                               */
/* -------------------------------------------------------------------------- */

const QuoteSection = () => {
  return (
    <Container>
      <Paper>
        <div style={{ position: 'absolute', top: -28, left: -28 }}>
          <QuotesIcon width='94px' />
        </div>
        <div
          style={{
            padding: '42px 40px 0 70px',
            fontSize: '20px',
            lineHeight: '28px',
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '14px 40px 0 70px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Button variant='contained'>Learn more </Button>

            <div style={{ marginBottom: 40 }}>
              <span style={{ fontSize: 16, fontWeight: 300 }}>
                <span style={{ fontWeight: 600 }}>Alexander Spindeler,</span>{' '}
                Applicant
              </span>
              <img
                src={SignatureImage}
                style={{ width: 120, paddingRight: 16, paddingTop: 10 }}
                alt='SignatureImage'
              />
            </div>
          </div>
          <img
            src={PersonImage}
            style={{ width: 200, paddingRight: 16 }}
            alt='PersonImage'
          />
        </div>
      </Paper>
    </Container>
  );
};

export default QuoteSection;
