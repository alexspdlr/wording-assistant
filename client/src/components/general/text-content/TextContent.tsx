import styled from '@emotion/styled';
import Markdown from 'src/components/markdown/Markdown';
import { TextContentBody } from 'src/types/textContent';

/* ----------------------------- SectionHeading ----------------------------- */

const SectionHeading = styled('h1')(
  (props) => `  
          margin-bottom: 40px; 
          margin-top: 0px; 
          font-weight: 300; 
          line-height: 1.3; 
          font-size: 40px; 
          color: ${props.theme.palette.text.light};
        `
);

/* ----------------------------- SubSectionHeading ----------------------------- */

const SubSectionHeading = styled('h2')(
  (props) => `  
            margin-bottom: 20px; 
            margin-top: 80px; 
            font-weight: 400; 
            line-height: 1.3; 
            font-size: 32px; 
            color: ${props.theme.palette.text.light};
          `
);

/* -------------------------------------------------------------------------- */
/*                                 TextContent                                */
/* -------------------------------------------------------------------------- */

interface TextContentProps {
  type: 'section' | 'subsection';
  title: string;
  bodyItems?: TextContentBody[];
}

const TextContent = (props: TextContentProps) => {
  const { type, title, bodyItems } = props;

  return (
    <>
      {type === 'section' ? (
        <SectionHeading>{title}</SectionHeading>
      ) : (
        <SubSectionHeading>{title}</SubSectionHeading>
      )}
      {bodyItems?.map((bodyItem) => (
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

export default TextContent;
