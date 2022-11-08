import styled from '@emotion/styled';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import { ReactComponent as DesktopCodebaseLight } from 'src/assets/DesktopCodebaseLight.svg';
import { ReactComponent as DesktopCodebaseDark } from 'src/assets/DesktopCodebaseDark.svg';
import Button from 'src/components/general/button';
import { useTheme } from '@emotion/react';

/* --------------------------------- Wrapper -------------------------------- */

interface WrapperProps {}

const Wrapper = styled('div')(
  (props: WrapperProps) => ` 
    width: calc(100% - 40px);
    padding: 50px 20px; 
  `
);

/* -------------------------------- Container ------------------------------- */

interface ContainerProps {
  smallLayout: boolean;
}

const Container = styled('div')(
  (props: ContainerProps) => ` 
  display: grid;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  ${
    props.smallLayout
      ? `
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, auto);
  `
      : `
grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
`
  }
  `
);

/* --------------------------------- Heading -------------------------------- */

interface HeadingProps {}

const Heading = styled('span')(
  (props: HeadingProps) => ` 
    @keyframes fadeInAnimation {
      0% {
          opacity: 0;
      }
      30% {
        opacity: 0;
    }
      100% {
          opacity: 1;
       }
  }; 
  animation: fadeInAnimation ease 1.5s;
    animation-iteration-count: 1; 
    animation-fill-mode: forwards;
  `
);

/* -------------------------------- PageLink -------------------------------- */

const PageLinkContainer = styled('div')(
  () => ` 
    display: flex; 
    flex-direction: column; 
  `
);

const PageLinkHeading = styled('span')(
  () => ` 
    font-size: 20px; 
    font-weight: 600; 
    margin-bottom: 14px; 
  `
);

interface PageLinkProps {
  title: string;
  buttonTitle: string;
  buttonVariant: 'contained' | 'outlined';
}

const PageLink = (props: PageLinkProps) => {
  const { title, buttonTitle, buttonVariant } = props;
  return (
    <PageLinkContainer>
      <PageLinkHeading>{title}</PageLinkHeading>
      <Button size='large' variant={buttonVariant}>
        {buttonTitle}
      </Button>
    </PageLinkContainer>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 InfoLowerSection                           */
/* -------------------------------------------------------------------------- */

const InfoLowerSection = () => {
  const activeBreakpoint = useBreakpoint();
  const theme = useTheme();

  return (
    <Wrapper>
      <Container smallLayout={compareBreakpoint(activeBreakpoint, '<', 'S')}>
        <div
          style={{
            gridArea: compareBreakpoint(activeBreakpoint, '<', 'S')
              ? '1 / 1 / 2 / 2'
              : '1 / 1 / 2 / 3',
            display: 'flex',
            justifyContent: compareBreakpoint(activeBreakpoint, '>', 'S')
              ? 'center'
              : 'flex-start',

            marginLeft: compareBreakpoint(activeBreakpoint, '<', 'M')
              ? '20px'
              : '0',

            marginBottom: compareBreakpoint(activeBreakpoint, '<', 'M')
              ? '12px'
              : '0',
          }}
        >
          <Heading
            style={{
              width: 'auto',
              fontSize: compareBreakpoint(activeBreakpoint, '<', 'S')
                ? '28px'
                : '32px',
            }}
          >
            How the wording assistant was created
          </Heading>
        </div>
        <div
          style={{
            gridArea: '2 / 1 / 3 / 2',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          {compareBreakpoint(activeBreakpoint, '>', 'S') &&
            (theme.activeMode === 'light' ? (
              <DesktopCodebaseLight />
            ) : (
              <DesktopCodebaseDark />
            ))}
          <div
            style={{
              padding: compareBreakpoint(activeBreakpoint, '>', 'XL')
                ? '32px 42px'
                : '32px 20px',
            }}
          >
            <PageLink
              title='Explore the codebase'
              buttonVariant='contained'
              buttonTitle='View Repository'
            />
          </div>
        </div>
        <div
          style={{
            gridArea: compareBreakpoint(activeBreakpoint, '<', 'S')
              ? '3 / 1 / 4 / 2'
              : '2 / 2 / 3 / 3',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              width: compareBreakpoint(activeBreakpoint, '<', 'S') ? 0 : '1px',
              marginTop: '48px',
              backgroundColor: theme.palette.divider,
              height: 'calc(100% - 48px)',
            }}
          />
          <div
            style={{
              padding: compareBreakpoint(activeBreakpoint, '<', 'S')
                ? '32px 20px'
                : '32px 54px',
            }}
          >
            <PageLink
              title='Look at the development process'
              buttonVariant='outlined'
              buttonTitle='Go to process page'
            />
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

export default InfoLowerSection;
