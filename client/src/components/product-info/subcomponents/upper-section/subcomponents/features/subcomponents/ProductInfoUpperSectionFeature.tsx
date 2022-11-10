import styled from '@emotion/styled';
import { ReactComponent as CheckIcon } from 'src/assets/CheckIcon.svg';
import { ReactComponent as LockIcon } from 'src/assets/LockIcon.svg';

/* ---------------------------- Styled components --------------------------- */

const Container = styled('div')(
  () => ` 
    display: flex;
    align-items: flex-start;    
    margin-top: 14px; 
  `
);

const Text = styled('span')(
  () => ` 
    font-size: 16px; 
    width: calc(100% - 24px);
    padding-left: 7px; 
    `
);

const StyledCheckIcon = styled(CheckIcon)(
  (defaultProps) => ` 
      width: 25px;
      color: ${defaultProps.theme.palette.secondary.main};
      `
);

const StyledLockIcon = styled(LockIcon)(
  (defaultProps) => ` 
        width: 26px;
        height: 19px;
        color: ${defaultProps.theme.palette.text.disabled};
        `
);

/* -------------------------------------------------------------------------- */
/*                       ProductInfoUpperSectionFeature                       */
/* -------------------------------------------------------------------------- */

interface ProductInfoUpperSectionFeatureProps {
  version: 'current' | 'upcoming';
  title: string;
}

const ProductInfoUpperSectionFeature = (
  props: ProductInfoUpperSectionFeatureProps
) => {
  const { version, title } = props;

  return (
    <Container>
      {version === 'current' ? <StyledCheckIcon /> : <StyledLockIcon />}
      <Text>{title}</Text>
    </Container>
  );
};

export default ProductInfoUpperSectionFeature;
