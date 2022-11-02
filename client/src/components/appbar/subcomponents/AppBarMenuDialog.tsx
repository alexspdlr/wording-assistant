import styled from '@emotion/styled';
import Dialog from 'src/components/general/dialog';
import IconButton from 'src/components/general/icon-button';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import { ReactComponent as ClearIcon } from 'src/assets/ClearIcon.svg';
import { Link } from 'react-router-dom';

const Container = styled('div')(
  () =>
    `  
    width: 268px;
    padding: 16px 36px;
    position: relative;
  
      `
);

const MenuExternalLink = styled('a')(
  (defaultProps) =>
    `  
    width: fit-content;  
    font-size: 20px;
    line-height: 46px; 
    text-decoration: none; 
    font-weight: 300;
    cursor: pointer; 
    color: ${defaultProps.theme.palette.text.main};
    &: hover {
      color: ${defaultProps.theme.palette.primary.light}
    }
      `
);

const MenuLink = styled(Link)(
  (defaultProps) =>
    `  
  
    width: fit-content;  
    font-size: 20px;
    line-height: 46px; 
    text-decoration: none; 
     
    font-weight: 300;
    cursor: pointer; 
    color: ${defaultProps.theme.palette.text.main};
    &: hover {
      color: ${defaultProps.theme.palette.primary.light}
    }
      `
);

const IconButtonWrapper = styled('div')(
  () => `
  position: absolute;
  top: 0;
  right: 0;
  margin: 16px; 
  `
);

const Divider = styled('div')(
  (defaultProps) => `
  width: 100%;
  border-top: 1px solid ${defaultProps.theme.palette.divider}; 
  margin: 28px 0; 
  
  `
);

interface MenuItem {
  title: string;
  link: string;
}

const upperMenuItems: MenuItem[] = [
  {
    title: 'Wording Assistant',
    link: '/',
  },
  {
    title: 'Documentation',
    link: '/documentation',
  },
  {
    title: 'Process',
    link: '/process',
  },
  {
    title: 'About Me',
    link: '/about-me',
  },
  {
    title: 'Repository',
    link: 'https://github.com',
  },
  {
    title: 'DeepL Translator',
    link: 'https://www.deepl.com/translator',
  },
  {
    title: 'Apps',
    link: 'https://www.deepl.com/en/app/',
  },
  {
    title: 'Contact Sales',
    link: 'https://www.deepl.com/contact-us?cta=pageFooter',
  },
  {
    title: 'Press',
    link: 'https://www.deepl.com/press-release/',
  },
  {
    title: 'Careers',
    link: 'https://jobs.deepl.com/',
  },
  {
    title: 'Publisher',
    link: 'https://www.deepl.com/publisher/',
  },
];

const lowerMenuItems: MenuItem[] = [
  {
    title: 'Sign Up',
    link: 'https://www.deepl.com/pro?cta=menu-signup',
  },
  {
    title: 'DeepL Pro',
    link: 'https://www.deepl.com/pro?cta=header-pro',
  },
];
interface AppBarMenuDialogProps {
  open: boolean;
  setOpen: Function;
}

const AppBarMenuDialog = (props: AppBarMenuDialogProps) => {
  const { open, setOpen } = props;
  const activeBreakpoint = useBreakpoint();
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      transitionDuration={150}
      horizontalPosition='end'
      verticalPosition='start'
      darkenBackground={compareBreakpoint(activeBreakpoint, '<', '3XL')}
    >
      {/* TODO: Replace example menu with menu component */}
      <Container>
        <IconButtonWrapper>
          <IconButton
            onClick={() => setOpen(false)}
            icon={<ClearIcon />}
            variant='dynamic'
          />
        </IconButtonWrapper>

        {upperMenuItems.map((item, i) => (
          <>
            {item.link.startsWith('https') ? (
              <MenuExternalLink
                key={`side-menu-nav-item_${i}`}
                href={item.link}
                target='_blank'
                rel='noopener'
              >
                {item.title}
              </MenuExternalLink>
            ) : (
              <MenuLink
                key={`side-menu-nav-item_${i}`}
                to={item.link}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </MenuLink>
            )}
            <br />
          </>
        ))}
        <Divider />
        {lowerMenuItems.map((item, i) => (
          <>
            {item.link.startsWith('https') ? (
              <MenuExternalLink
                key={`side-menu-nav-item_${i}`}
                href={item.link}
                target='_blank'
                rel='noopener'
              >
                {item.title}
              </MenuExternalLink>
            ) : (
              <MenuLink
                key={`side-menu-nav-item_${i}`}
                to={item.link}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </MenuLink>
            )}
            <br />
          </>
        ))}
      </Container>
    </Dialog>
  );
};

export default AppBarMenuDialog;
