import { useTheme } from '@emotion/react';
import Section from '../appbody-section';
import FooterLowerContainer from './subcomponents/FooterLowerContainer';
import FooterUpperContainer from './subcomponents/FooterUpperContainer';

/* ---------------------------- Shared interfaces --------------------------- */

export interface LinkData {
  title: string;
  href: string;
  chipTitle?: string;
}

/* -------------------------------------------------------------------------- */
/*                                   Footer                                   */
/* -------------------------------------------------------------------------- */

const Footer = () => {
  const theme = useTheme();

  const informationLinks: LinkData[] = [
    { title: 'Documentation', href: '/documentation' },
    { title: 'Process', href: '/process' },
    { title: 'About Me', href: '/about-me' },
    {
      title: 'Repository',
      href: 'https://github.com/alexspdlr/wording-assistant',
      chipTitle: 'GITHUB',
    },
  ];

  const productsLinks: LinkData[] = [
    { title: 'Translator', href: 'https://www.deepl.com/en/translator' },
    { title: 'Wording Assistant', href: '/' },
    { title: 'DeepL Pro', href: 'https://www.deepl.com/pro?cta=header-pro' },
    { title: 'Apps', href: 'https://www.deepl.com/en/app/' },
  ];

  const companyLinks: LinkData[] = [
    {
      title: 'Contact',
      href: 'https://www.deepl.com/contact-us?cta=pageFooter/',
    },
    { title: 'Press', href: 'https://www.deepl.com/press-release/' },
    { title: 'Careers', href: 'https://jobs.deepl.com/' },
    { title: 'Publisher', href: 'https://www.deepl.com/publisher/' },
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
