import styled from '@emotion/styled';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import { ReactComponent as LogoCombinedLight } from 'src/assets/LogoCombinedLight.svg';
import { ReactComponent as LogoCombinedDark } from 'src/assets/LogoCombinedDark.svg';
import { LinkData } from '../Footer';
import { useTheme } from '@emotion/react';
import FooterLink from './FooterLink';

/* ---------------------------- Styled components --------------------------- */

interface ContainerProps {
  smallLayout: boolean;
}
const Container = styled('div')(
  (props: ContainerProps) => ` 
    display: flex;
    margin-top: 60px; 
    ${
      props.smallLayout
        ? 'flex-direction: column; width: auto; padding-left: 20px;'
        : 'width: 100%;'
    }
    `
);

interface LeftSectionProps {}
const LeftSection = styled('div')(
  (props: LeftSectionProps) => ` 
    width: 25%;
    min-width: 160px;
    `
);

interface RightSectionProps {
  smallLayout: boolean;
}
const Right = styled('div')(
  (props: RightSectionProps) => ` 
    width: 75%;
    display: flex;
    justify-content: flex-end;
    ${props.smallLayout && 'flex-direction: column;'}
    `
);

interface LinkSectionProps {}
const LinkSection = styled('div')(
  (props: LinkSectionProps) => ` 
    width: 30%;
    padding-right: 40px;
    display: flex; 
    flex-direction: column; 
    align-items: flex-start; 
    font-size: 16px; 
    margin: 16px 0; 
    `
);

/* -------------------------------------------------------------------------- */
/*                            FooterUpperContainer                            */
/* -------------------------------------------------------------------------- */
interface FooterUpperContainerProps {
  informationLinks: LinkData[];
  productsLinks: LinkData[];
  companyLinks: LinkData[];
}
const FooterUpperContainer = (props: FooterUpperContainerProps) => {
  const { informationLinks, productsLinks, companyLinks } = props;
  const activeBreakpoint = useBreakpoint();
  const theme = useTheme();

  return (
    <Container smallLayout={compareBreakpoint(activeBreakpoint, '<', 'XS')}>
      <LeftSection>
        {theme.activeMode === 'dark' ? (
          <LogoCombinedDark />
        ) : (
          <LogoCombinedLight />
        )}
      </LeftSection>
      <Right smallLayout={compareBreakpoint(activeBreakpoint, '<', 'XS')}>
        <LinkSection>
          <strong>Information</strong>
          {informationLinks.map((link, index) =>
            link.chipTitle ? (
              <FooterLink
                key={`information-link_${index}`}
                title={link.title}
                href={link.href}
                chipTitle={link.chipTitle}
              />
            ) : (
              <FooterLink
                key={`information-link_${index}`}
                href={link.href}
                title={link.title}
              />
            )
          )}
        </LinkSection>
        <LinkSection>
          <strong>Products</strong>
          {productsLinks.map((link, index) => (
            <FooterLink
              key={`product-link_${index}`}
              href={link.href}
              title={link.title}
            />
          ))}
        </LinkSection>
        <LinkSection>
          <strong>Company</strong>
          {companyLinks.map((link, index) => (
            <FooterLink
              key={`company-link_${index}`}
              href={link.href}
              title={link.title}
            />
          ))}
        </LinkSection>
      </Right>
    </Container>
  );
};

export default FooterUpperContainer;
