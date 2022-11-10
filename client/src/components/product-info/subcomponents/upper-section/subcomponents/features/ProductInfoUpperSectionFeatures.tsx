import styled from '@emotion/styled';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import ProductInfoUpperSectionFeature from './subcomponents/ProductInfoUpperSectionFeature';

/* ---------------------------- Styled components --------------------------- */

interface ContainerProps {
  isBreakpointSmallerL: boolean;
}
const Container = styled('div')(
  (props: ContainerProps) => ` 
display: flex;
align-items: flex-start; 
column-gap: 24px;
row-gap: 36px;
${
  props.isBreakpointSmallerL
    ? 'flex-direction: column;'
    : 'flex-direction: row;'
}
`
);

interface SectionProps {
  isBreakpointSmallerL: boolean;
}
const Section = styled('div')(
  (props: SectionProps) => ` 
    width: ${props.isBreakpointSmallerL ? '100%' : '50%'};
`
);

const Heading = styled('span')(
  () => ` 
    font-size: 16px; 
    font-weight: 700; 
    line-height: 24px; 
`
);

const MoreFeaturesLink = styled('div')(
  (props) => ` 
         color: ${props.theme.palette.primary.light};
         font-size: 16px; 
         font-weight: 600; 
         cursor: pointer; 
         padding-top: 15px;
         margin-left: 3px;
         &:hover {
            text-decoration: underline ${props.theme.palette.primary.light}; 
          }
    `
);

/* -------------------------------------------------------------------------- */
/*                       ProductInfoUpperSectionFeatures                      */
/* -------------------------------------------------------------------------- */

const ProductInfoUpperSectionFeatures = () => {
  const activeBreakpoint = useBreakpoint();
  const isBreakpointSmallerL = compareBreakpoint(activeBreakpoint, '<', 'L');

  const currentFeatures = [
    'Rephrase up to 5,000 characters',
    'Auto-detect multiple languages',
    'Choose between multiple alternatives',
  ];

  const upcomingFeatures = [
    'Rephrase entire documents',
    'Full support for more languages',
    'Rephrase webpages',
  ];

  return (
    <Container isBreakpointSmallerL={isBreakpointSmallerL}>
      <Section isBreakpointSmallerL={isBreakpointSmallerL}>
        <Heading>You are using the free version</Heading>
        {currentFeatures.map((title) => (
          <ProductInfoUpperSectionFeature version='current' title={title} />
        ))}
      </Section>

      <Section isBreakpointSmallerL={isBreakpointSmallerL}>
        <Heading>Upcoming features</Heading>
        {upcomingFeatures.map((title) => (
          <ProductInfoUpperSectionFeature version='upcoming' title={title} />
        ))}

        <MoreFeaturesLink>See more features</MoreFeaturesLink>
      </Section>
    </Container>
  );
};

export default ProductInfoUpperSectionFeatures;
