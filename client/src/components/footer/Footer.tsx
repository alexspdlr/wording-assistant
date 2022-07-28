import styled from '@emotion/styled';
import Section from '../section';
import { ReactComponent as LogoCombined } from 'src/assets/LogoCombined.svg';
import { ReactComponent as TwitterIcon } from 'src/assets/TwitterIcon.svg';
import { ReactComponent as FacebookIcon } from 'src/assets/FacebookIcon.svg';
import { ReactComponent as LinkedinIcon } from 'src/assets/LinkedinIcon.svg';
import { ReactComponent as GithubIcon } from 'src/assets/GithubIcon.svg';
import Chip from '../general/chip';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import compareBreakpoint from 'src/utils/compareBreakpoint';
/* -------------------------------- UpperContainer ------------------------------- */

const PositionedChip = styled(Chip)(
  () => `
  position: relative; 
  line-height: 12px; 
  margin-left: 6px;
  &:hover {
    text-decoration: none;
  }
  `
);

interface UpperContainerProps {
  smallLayout: boolean;
}

const UpperContainer = styled('div')(
  (props: UpperContainerProps) => ` 
  display: flex;
  width: 100%;
  margin-top: 60px; 
  ${props.smallLayout && 'flex-direction: column; padding: 0 30px;'}
  `
);

const LowerContainer = styled('div')(
  () => ` 
  display: flex;
  width: 100%;
  margin-bottom: 40px; 
  padding-top: 16px; 
  justify-content: flex-end;
  gap: 13px; 
  `
);

const Left = styled('div')(
  () => ` 
  width: 25%;
  min-width: 160px;
  `
);

interface RightProps {
  smallLayout: boolean;
}

const Right = styled('div')(
  (props: RightProps) => ` 
  width: 75%;
  display: flex;
  justify-content: flex-end;
  ${props.smallLayout && 'flex-direction: column;'}
  `
);

const LinkSection = styled('div')(
  () => ` 
  width: 30%;
  padding-right: 40px;
  display: flex; 
  flex-direction: column; 
  align-items: flex-start; 
  font-size: 16px; 
  margin: 16px 0; 
  `
);

/* ---------------------------------- Link ---------------------------------- */

const LinkContainer = styled('div')(
  () => `
  margin-top: 13px; 
  cursor: pointer; 
  display: flex; 
  `
);

const LinkTitle = styled('span')(
  () => `
  font-size: 16px; 
  line-height: 24px; 
  &:hover {
    text-decoration: underline;
  }
  `
);

interface LinkProps {
  title: string;
  chipTitle?: string;
}

const Link = (props: LinkProps) => {
  const { title, chipTitle } = props;
  return (
    <LinkContainer>
      <LinkTitle>{title}</LinkTitle>
      {chipTitle && <PositionedChip>{chipTitle}</PositionedChip>}
    </LinkContainer>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   Footer                                   */
/* -------------------------------------------------------------------------- */

interface LinkData {
  title: string;
  chipTitle?: string;
}

const Footer = () => {
  const activeBreakpoint = useBreakpoint();

  const InformationLinks: LinkData[] = [
    { title: 'Documentation' },
    { title: 'Process' },
    { title: 'TechStack' },
    { title: 'Repository', chipTitle: 'GITHUB' },
  ];

  const ProductsLinks: LinkData[] = [
    { title: 'Translator' },
    { title: 'Wording Assistant' },
    { title: 'DeepL Pro' },
    { title: 'Apps' },
  ];

  const CompanyLinks: LinkData[] = [
    { title: 'Contact' },
    { title: 'Press' },
    { title: 'Careers' },
    { title: 'Publisher' },
  ];

  return (
    <Section backgroundColor='#ffffff'>
      <UpperContainer
        smallLayout={compareBreakpoint(activeBreakpoint, '<', 'XS')}
      >
        <Left>
          <LogoCombined style={{ cursor: 'pointer' }} />
        </Left>
        <Right smallLayout={compareBreakpoint(activeBreakpoint, '<', 'XS')}>
          <LinkSection>
            <strong>Information</strong>
            {InformationLinks.map((link) =>
              link.chipTitle ? (
                <Link title={link.title} chipTitle={link.chipTitle} />
              ) : (
                <Link title={link.title} />
              )
            )}
          </LinkSection>
          <LinkSection>
            <strong>Products</strong>
            {ProductsLinks.map((link) => (
              <Link title={link.title} />
            ))}
          </LinkSection>
          <LinkSection>
            <strong>Company</strong>
            {CompanyLinks.map((link) => (
              <Link title={link.title} />
            ))}
          </LinkSection>
        </Right>
      </UpperContainer>
      <LowerContainer>
        <TwitterIcon style={{ cursor: 'pointer' }} />
        <FacebookIcon style={{ cursor: 'pointer' }} />
        <LinkedinIcon style={{ cursor: 'pointer' }} />
        <GithubIcon style={{ cursor: 'pointer' }} />
      </LowerContainer>
    </Section>
  );
};

export default Footer;
