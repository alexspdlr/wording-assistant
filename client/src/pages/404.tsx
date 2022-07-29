import Section from 'src/components/section';
import { ReactComponent as RobotOops } from 'src/assets/RobotOops.svg';
import styled from '@mui/styled-engine';
import { Link } from 'react-router-dom';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import compareBreakpoint from 'src/utils/compareBreakpoint';

const Heading = styled('div')(
  () => `  
    font-size: 40px;   
    font-weight: 300;
    line-height: 1.3;
    margin-bottom: 1rem; 
    `
);

const ErrorCode = styled('div')(
  () => `  
      font-size: 16px;   
      font-weight: 600;
      color: #0f2b46; 
      margin-bottom: 2em; 
      line-height: 24px;
      `
);

const Text = styled('div')(
  () => `  
        font-size: 16px;   
        font-weight: 400;
        color: #0f2b46; 
        margin-bottom: 1em; 
        line-height: 24px;
        `
);

const PageLink = styled(Link)(
  () => `  
          font-size: 16px;  
          color: #006494; 
          text-decoration: none;
          line-height: 24px;
          &:hover {
            color: #0f2b46;  
          }
          `
);

const Seperator = styled('div')(
  () => `  
            border-radius: 50%;
            background-color: #006494; 
            width: 2px; 
            height: 2px;
            margin: 12px 8px 0 8px; 
            `
);

interface LinkData {
  title: string;
  link: string;
}

const Page404 = () => {
  const activeBreakpoint = useBreakpoint();

  const links: LinkData[] = [
    { title: 'Wording Assistant', link: '/' },
    { title: 'Documentation', link: '/documentation' },
    { title: 'Process', link: '/process' },
    { title: 'Tech Stack', link: '/tech-stack' },
  ];

  return (
    <Section backgroundColor='#F1F1F1'>
      <div
        style={{
          minHeight: 'calc(100vh - 300px)',
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: 'space-evenly',
          paddingTop: '4em',
          paddingLeft: '1em',
          paddingRight: '1em',
        }}
      >
        <div
          style={{
            flexBasis: '650px',
            width: compareBreakpoint(activeBreakpoint, '<', 'M')
              ? '100%'
              : '50%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Heading>
            We’re sorry — we can’t find the page you’re looking for.
          </Heading>
          <ErrorCode>Error code: 404</ErrorCode>
          <Text>Here are some helpful links:</Text>
          <div style={{ display: 'flex', marginBottom: '36px' }}>
            {links.map((link, index) => (
              <>
                <PageLink to={link.link}>{link.title}</PageLink>
                {index !== links.length - 1 && <Seperator />}
              </>
            ))}
          </div>
        </div>
        {compareBreakpoint(activeBreakpoint, '>', 'S') && (
          <div style={{ width: '50%', marginTop: '48px' }}>
            <RobotOops
              width='100%'
              style={{
                maxWidth: '692px',
              }}
            />
          </div>
        )}
      </div>
    </Section>
  );
};

export default Page404;
