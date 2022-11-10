import { useTheme } from '@emotion/react';
import Section from '../appbody-section';
import FooterLowerContainer from './subcomponents/FooterLowerContainer';
import FooterUpperContainer from './subcomponents/FooterUpperContainer';

/* ---------------------------- Shared interfaces --------------------------- */

export interface LinkData {
  title: string;
  chipTitle?: string;
}

/* -------------------------------------------------------------------------- */
/*                                   Footer                                   */
/* -------------------------------------------------------------------------- */

const Footer = () => {
  const theme = useTheme();

  const informationLinks: LinkData[] = [
    { title: 'Documentation' },
    { title: 'Process' },
    { title: 'TechStack' },
    { title: 'Repository', chipTitle: 'GITHUB' },
  ];

  const productsLinks: LinkData[] = [
    { title: 'Translator' },
    { title: 'Wording Assistant' },
    { title: 'DeepL Pro' },
    { title: 'Apps' },
  ];

  const companyLinks: LinkData[] = [
    { title: 'Contact' },
    { title: 'Press' },
    { title: 'Careers' },
    { title: 'Publisher' },
  ];

  return (
    <Section backgroundColor={theme.palette.background.main}>
      <FooterUpperContainer
        informationLinks={informationLinks}
        productsLinks={productsLinks}
        companyLinks={companyLinks}
      />
      <FooterLowerContainer />
    </Section>
  );
};

export default Footer;
