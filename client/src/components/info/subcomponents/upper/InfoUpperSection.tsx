import styled from '@emotion/styled';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import { Breakpoint } from 'src/types/breakpoint';
import InfoUpperGuide from './subcomponents/InfoUpperGuide';
import InfoUpperFeatures from './subcomponents/InfoUpperFeatures';

/* ---------------------------------- utils --------------------------------- */

const gridLayoutByBreakpoint = (activeBreakpoint: Breakpoint) => {
  if (compareBreakpoint(activeBreakpoint, '>', 'M')) {
    return `
    display: grid;
      grid-template-columns: 1fr 2fr;
      grid-template-rows: 1fr;
      grid-column-gap: 24px;
      grid-row-gap: 0px;
      `;
  }

  if (
    compareBreakpoint(activeBreakpoint, '<', 'L') &&
    compareBreakpoint(activeBreakpoint, '>', 'XS')
  ) {
    return `
    display: grid;
grid-template-columns: repeat(2, 1fr);
grid-template-rows: 1fr;
grid-column-gap: 24px;
grid-row-gap: 0px;
      `;
  }

  return `
  display: grid;
grid-template-columns: 1fr;
grid-template-rows: repeat(2, auto);
grid-column-gap: 0px;
grid-row-gap: 38px;
  `;
};

/* --------------------------------- Wrapper -------------------------------- */

interface WrapperProps {}

const Wrapper = styled('div')(
  (props: WrapperProps) => ` 
    width: 100%;
    padding: 50px 0; 
    border-bottom: 1px solid rgb(198, 205, 213); 
  `
);

/* -------------------------------- Container ------------------------------- */

interface ContainerProps {
  gridLayout: string;
}

const Container = styled('div')(
  (props: ContainerProps) => ` 
    ${props.gridLayout}
    margin: 0 24px; 
  `
);

/* -------------------------------------------------------------------------- */
/*                                 InfoUpperSection                           */
/* -------------------------------------------------------------------------- */

const InfoUpperSection = () => {
  const activeBreakpoint = useBreakpoint();
  return (
    <Wrapper>
      <Container gridLayout={gridLayoutByBreakpoint(activeBreakpoint)}>
        <div
          style={{
            gridArea: '1 / 1 / 2 / 2',
          }}
        >
          <InfoUpperGuide />
        </div>
        <div
          style={{
            gridArea: compareBreakpoint(activeBreakpoint, '<', 'S')
              ? '2 / 1 / 3 / 2'
              : '1 / 2 / 2 / 3',
          }}
        >
          <InfoUpperFeatures />
        </div>
      </Container>
    </Wrapper>
  );
};

export default InfoUpperSection;
