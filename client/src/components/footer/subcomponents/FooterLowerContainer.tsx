import styled from '@emotion/styled';
import { ReactNode } from 'react';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import { ReactComponent as TwitterIcon } from 'src/assets/TwitterIcon.svg';
import { ReactComponent as FacebookIcon } from 'src/assets/FacebookIcon.svg';
import { ReactComponent as LinkedinIcon } from 'src/assets/LinkedinIcon.svg';
import { ReactComponent as GithubIcon } from 'src/assets/GithubIcon.svg';

/* ---------------------------- Styled components --------------------------- */

interface ContainerProps {
  smallLayout: boolean;
}

const Container = styled('div')(
  (props: ContainerProps) => ` 
    display: flex;
    margin-bottom: 40px; 
    padding-top: 16px; 
    justify-content: flex-end;
    gap: 13px; 
    ${props.smallLayout && 'padding-right: 20px;'}
    `
);

/* -------------------------------- Icon Link ------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                            FooterLowerContainer                            */
/* -------------------------------------------------------------------------- */

const FooterLowerContainer = () => {
  const activeBreakpoint = useBreakpoint();

  return (
    <Container smallLayout={compareBreakpoint(activeBreakpoint, '<', 'XS')}>
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
    </Container>
  );
};

export default FooterLowerContainer;
