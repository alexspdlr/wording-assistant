import styled from '@emotion/styled';
import Markdown from 'src/components/markdown/Markdown';
import { ContentBody } from 'src/types/content';

/* ----------------------------- SectionHeading ----------------------------- */

const SectionHeading = styled('h1')(
  () => `  
          margin-bottom: 40px; 
          margin-top: 0px; 
          font-weight: 300; 
          line-height: 1.3; 
          font-size: 40px; 
          color: #1b1e25;
        `
);

/* ----------------------------- SubSectionHeading ----------------------------- */

const SubSectionHeading = styled('h2')(
  () => `  
            margin-bottom: 20px; 
            margin-top: 80px; 
            font-weight: 400; 
            line-height: 1.3; 
            font-size: 32px; 
            color: #1b1e25;
            letter-spacing: -1px;
          `
);

interface ContentProps {
  type: 'section' | 'subsection';
  title: string;
  bodyItems?: ContentBody[];
}

const Content = (props: ContentProps) => {
  const { type, title, bodyItems } = props;

  return (
    <>
      {type === 'section' ? (
        <SectionHeading>{title}</SectionHeading>
      ) : (
        <SubSectionHeading>{title}</SubSectionHeading>
      )}
      {bodyItems?.map((bodyItem, index) => (
        <>
          {bodyItem.type === 'Markdown' ? (
            <Markdown md={bodyItem.value as string} />
          ) : (
            <>{bodyItem.value}</>
          )}
        </>
      ))}
    </>
  );
};

export default Content;
