import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import SignatureDark from 'src/assets/SignatureDark.png';
import SignatureLight from 'src/assets/SignatureLight.png';

/* ---------------------------- Styled components --------------------------- */

const Container = styled('div')(
  () => ` 
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    `
);

const Text = styled('span')(
  () => ` 
    font-size: 16px;
    font-weight: 300;
      `
);

const FatText = styled('span')(
  () => ` 
    font-weight: 600;
      `
);

const Signature = styled('img')(
  () => ` 
    width: 160px;
    padding-right: 16px;
    padding-top: 10px; 
        `
);

/* -------------------------------------------------------------------------- */
/*                               QuoteSignature                               */
/* -------------------------------------------------------------------------- */

const QuoteSignature = () => {
  const theme = useTheme();

  return (
    <Container>
      <Text>
        <FatText>Alexander Spindeler,</FatText> Applicant
      </Text>
      <Signature
        src={theme.activeMode === 'dark' ? SignatureDark : SignatureLight}
        alt='SignatureImage'
      />
    </Container>
  );
};

export default QuoteSignature;
