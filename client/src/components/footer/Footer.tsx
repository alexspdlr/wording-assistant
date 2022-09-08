import styled from '@emotion/styled';
import Section from '../section';
import { ReactComponent as LogoCombinedLight } from 'src/assets/LogoCombinedLight.svg';
import { ReactComponent as LogoCombinedDark } from 'src/assets/LogoCombinedDark.svg';
import { ReactComponent as TwitterIcon } from 'src/assets/TwitterIcon.svg';
import { ReactComponent as FacebookIcon } from 'src/assets/FacebookIcon.svg';
import { ReactComponent as LinkedinIcon } from 'src/assets/LinkedinIcon.svg';
import { ReactComponent as GithubIcon } from 'src/assets/GithubIcon.svg';
import Chip from '../general/chip';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import { useTheme } from '@emotion/react';
import { ReactNode } from 'react';
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
  margin-top: 60px; 
  ${
    props.smallLayout
      ? 'flex-direction: column; width: auto; padding-left: 20px;'
      : 'width: 100%;'
  }
  `
);

interface UpperContainerProps {
  smallLayout: boolean;
}

const LowerContainer = styled('div')(
  (props: UpperContainerProps) => ` 
  display: flex;
  margin-bottom: 40px; 
  padding-top: 16px; 
  justify-content: flex-end;
  gap: 13px; 
  ${props.smallLayout && 'padding-right: 20px;'}
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

interface IconLinkProps {
  children: ReactNode;
  href: string;
}

const IconLink = (props: IconLinkProps) => (
  <a
    href={props.href}
    target='_blank'
    style={{ color: 'inherit' }}
    rel='noreferrer'
  >
    {props.children}
  </a>
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
  const theme = useTheme();

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
    <Section backgroundColor={theme.palette.background.main}>
      <UpperContainer
        smallLayout={compareBreakpoint(activeBreakpoint, '<', 'XS')}
      >
        <Left>
          {theme.activeMode === 'dark' ? (
            <LogoCombinedDark />
          ) : (
            <LogoCombinedLight />
          )}
        </Left>
        <Right smallLayout={compareBreakpoint(activeBreakpoint, '<', 'XS')}>
          <LinkSection>
            <strong>Information</strong>
            {InformationLinks.map((link, index) =>
              link.chipTitle ? (
                <Link
                  key={`information-link_${index}`}
                  title={link.title}
                  chipTitle={link.chipTitle}
                />
              ) : (
                <Link key={`information-link_${index}`} title={link.title} />
              )
            )}
          </LinkSection>
          <LinkSection>
            <strong>Products</strong>
            {ProductsLinks.map((link, index) => (
              <Link key={`product-link_${index}`} title={link.title} />
            ))}
          </LinkSection>
          <LinkSection>
            <strong>Company</strong>
            {CompanyLinks.map((link, index) => (
              <Link key={`company-link_${index}`} title={link.title} />
            ))}
          </LinkSection>
        </Right>
      </UpperContainer>
      <LowerContainer
        smallLayout={compareBreakpoint(activeBreakpoint, '<', 'XS')}
      >
        <IconLink href='https://twitter.com/deeplcom'>
          <TwitterIcon style={{ cursor: 'pointer' }} />
        </IconLink>
        <IconLink href='https://www.facebook.com/DeepLcom/'>
          <FacebookIcon style={{ cursor: 'pointer' }} />
        </IconLink>
        <IconLink href='https://www.linkedin.com/company/linkedin-com-company-deepl/'>
          <LinkedinIcon style={{ cursor: 'pointer' }} />
        </IconLink>
        <IconLink href='https://github.com/DeepLcom'>
          <GithubIcon style={{ cursor: 'pointer' }} />
        </IconLink>
      </LowerContainer>
    </Section>
  );
};

export default Footer;
