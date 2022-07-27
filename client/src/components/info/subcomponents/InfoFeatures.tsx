import styled from '@emotion/styled';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import { ReactComponent as CheckIcon } from 'src/assets/CheckIcon.svg';
import { ReactComponent as LockIcon } from 'src/assets/LockIcon.svg';

/* -------------------------------- Container ------------------------------- */

interface ContainerProps {
  smallLayout: boolean;
}

const Container = styled('div')(
  (props: ContainerProps) => ` 
display: flex;
align-items: flex-start; 
gap: 24px;
${props.smallLayout ? 'flex-direction: column;' : 'flex-direction: row;'}
`
);

/* --------------------------------- Heading -------------------------------- */

interface HeadingProps {}

const Heading = styled('span')(
  (props: HeadingProps) => ` 
    font-size: 16px; 
    font-weight: 700; 
    line-height: 24px; 
`
);

/* --------------------------------- Feature -------------------------------- */

const FeatureContainer = styled('div')(
  (props: HeadingProps) => ` 
    display: flex;
    align-items: flex-start;    
    margin-top: 14px; 
`
);

const FeatureText = styled('span')(
  (props: HeadingProps) => ` 
         font-size: 16px; 
         width: calc(100% - 24px);
         padding-left: 7px; 
  `
);

interface FeatureProps {
  version: 'current' | 'upcoming';
  title: string;
}

const Feature = (props: FeatureProps) => {
  const { title, version } = props;
  return (
    <FeatureContainer>
      {version === 'current' ? (
        <CheckIcon width='25px' />
      ) : (
        <LockIcon height='19px' width='26px' />
      )}
      <FeatureText>{title}</FeatureText>
    </FeatureContainer>
  );
};

/* ---------------------------- MoreFeaturesLink ---------------------------- */

const MoreFeaturesLink = styled('div')(
  () => ` 
         color: rgb(0, 94, 139);
         font-size: 16px; 
         font-weight: 600; 
         cursor: pointer; 
         padding-top: 15px;
         margin-left: 3px;
         &:hover {
            text-decoration: underline rgb(0, 94, 139); 
          }
    `
);

/* -------------------------------------------------------------------------- */
/*                                 InfoFeatures                                */
/* -------------------------------------------------------------------------- */

const InfoFeatures = () => {
  const activeBreakpoint = useBreakpoint();
  const isSmallLayout = compareBreakpoint(activeBreakpoint, '<', 'L');

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
    <Container smallLayout={isSmallLayout}>
      <div
        style={{
          width: isSmallLayout ? '100%' : '50%',
        }}
      >
        <Heading>You are using the free version</Heading>
        {currentFeatures.map((title) => (
          <Feature version='current' title={title} />
        ))}
      </div>
      <div
        style={{
          width: isSmallLayout ? '100%' : '50%',
        }}
      >
        <Heading>Upcoming features</Heading>
        {upcomingFeatures.map((title) => (
          <Feature version='upcoming' title={title} />
        ))}

        <MoreFeaturesLink>See more features</MoreFeaturesLink>
      </div>
    </Container>
  );
};

export default InfoFeatures;
