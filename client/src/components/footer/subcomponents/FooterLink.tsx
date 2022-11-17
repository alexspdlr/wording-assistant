import styled from '@emotion/styled';
import Chip from 'src/components/general/chip';

/* ---------------------------- Styled components --------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                 FooterLink                                 */
/* -------------------------------------------------------------------------- */

interface FooterLinkProps {
  title: string;
  href: string;
  chipTitle?: string;
}
const FooterLink = (props: FooterLinkProps) => {
  const { title, chipTitle, href } = props;
  return (
    <LinkContainer
      onClick={() =>
        // eslint-disable-next-line no-restricted-globals
        (location.href = `${href}`)
      }
    >
      <LinkTitle>{title}</LinkTitle>
      {chipTitle && <PositionedChip>{chipTitle}</PositionedChip>}
    </LinkContainer>
  );
};

export default FooterLink;
