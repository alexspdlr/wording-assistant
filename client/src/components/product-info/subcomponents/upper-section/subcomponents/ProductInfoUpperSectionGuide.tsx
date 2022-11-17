import styled from '@emotion/styled';
import Button from 'src/components/general/button';

/* ---------------------------- Styled components --------------------------- */

const Container = styled('div')(
  () => ` 
display: flex;
align-items: flex-start; 
flex-direction: column; 
`
);

const Heading = styled('span')(
  () => ` 
    font-size: 20px; 
    font-weight: 400; 
    margin-bottom: 20px; 
    max-width: 330px;
    line-height: 29px;  
`
);

/* -------------------------------------------------------------------------- */
/*                        ProductInfoUpperSectionGuide                        */
/* -------------------------------------------------------------------------- */

const ProductInfoUpperSectionGuide = () => {
  return (
    <Container>
      <Heading>
        Become an expert - <strong>Learn about the Wording Assistant</strong>
      </Heading>

      <Button
        size='large'
        onClick={() =>
          // eslint-disable-next-line no-restricted-globals
          (location.href = '/process')
        }
      >
        Check out the process
      </Button>
    </Container>
  );
};

export default ProductInfoUpperSectionGuide;
