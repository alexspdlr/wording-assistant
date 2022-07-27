import styled from '@emotion/styled';
import Button from 'src/components/general/button';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';

/* -------------------------------- Container ------------------------------- */

interface ContainerProps {}

const Container = styled('div')(
  (props: ContainerProps) => ` 
display: flex;
align-items: flex-start; 
flex-direction: column; 
`
);

/* --------------------------------- Heading -------------------------------- */

interface HeadingProps {}

const Heading = styled('span')(
  (props: HeadingProps) => ` 
    font-size: 20px; 
    font-weight: 400; 
    margin-bottom: 20px; 
    max-width: 330px;
    line-height: 29px;  
`
);

/* -------------------------------------------------------------------------- */
/*                                 InfoUpperGuide                             */
/* -------------------------------------------------------------------------- */

const InfoUpperGuide = () => {
  return (
    <Container>
      <Heading>
        Become an expert - <strong>Learn about the Wording Assistant</strong>
      </Heading>
      <Button size='large'>Check out the guide</Button>
    </Container>
  );
};

export default InfoUpperGuide;
