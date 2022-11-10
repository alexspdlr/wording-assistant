import styled from '@emotion/styled';
import Button from 'src/components/general/button';

/* ---------------------------- Styled components --------------------------- */

const Container = styled('div')(
  () => ` 
    display: flex; 
    flex-direction: column; 
`
);

const Heading = styled('span')(
  () => ` 
    font-size: 20px; 
    font-weight: 600; 
    margin-bottom: 14px; 
`
);

/* -------------------------------------------------------------------------- */
/*                       ProductInfoLowerSectionPageLink                      */
/* -------------------------------------------------------------------------- */

interface ProductInfoLowerSectionPageLinkProps {
  title: string;
  buttonTitle: string;
  buttonVariant: 'contained' | 'outlined';
}

const ProductInfoLowerSectionPageLink = (
  props: ProductInfoLowerSectionPageLinkProps
) => {
  const { title, buttonTitle, buttonVariant } = props;
  return (
    <Container>
      <Heading>{title}</Heading>
      <Button size='large' variant={buttonVariant}>
        {buttonTitle}
      </Button>
    </Container>
  );
};

export default ProductInfoLowerSectionPageLink;
