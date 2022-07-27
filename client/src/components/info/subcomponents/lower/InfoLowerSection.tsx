import styled from '@emotion/styled';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import { Breakpoint } from 'src/types/breakpoint';
import { ReactComponent as DesktopCodebase } from 'src/assets/DesktopCodebase.svg';
import Button from 'src/components/general/button';

/* --------------------------------- Wrapper -------------------------------- */

interface WrapperProps {}

const Wrapper = styled('div')(
  (props: WrapperProps) => ` 
    width: 100%;
    padding: 50px 0; 
  `
);

/* -------------------------------- Container ------------------------------- */

const Container = styled('div')(
  () => ` 
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  `
);

/* --------------------------------- Heading -------------------------------- */

interface HeadingProps {}

const Heading = styled('span')(
  (props: HeadingProps) => ` 
    font-size: 32px; 
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
  return (
    <Wrapper>
      <Container>
        <div
          style={{
            gridArea: '1 / 1 / 2 / 3',
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
          <Heading>How the wording Assistant was created</Heading>
        </div>
        <div
          style={{
            gridArea: '2 / 1 / 3 / 2',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          {compareBreakpoint(activeBreakpoint, '>', 'S') && <DesktopCodebase />}
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
            gridArea: '2 / 2 / 3 / 3',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              width: '1px',
              marginTop: '48px',
              backgroundColor: 'rgb(198, 205, 213)',
              height: 'calc(100% - 48px)',
            }}
          />
          <div style={{ padding: '32px 54px' }}>
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
