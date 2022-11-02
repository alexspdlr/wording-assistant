import styled from '@emotion/styled';
import Markdown from 'markdown-to-jsx';

const CustomP = styled('p')(
  () => ` 
      line-height: 1.5;
      margin-bottom: 20px;  
      `
);

const CustomUl = styled('ul')(
  () => ` 
    list-style-type: none;
    margin-left:0px;
    padding-left:20px;
        `
);

const CustomLi = styled('li')(
  () => ` 
  line-height: 1.5;
          `
);

const CustomA = styled('a')(
  (props) => ` 
    color: ${props.theme.palette.primary.light}; 
    text-decoration: none;
    &:hover{
        color:  ${props.theme.palette.primary.main};
    }
    transition: color 0.2s; 
            `
);

/* -------------------------------------------------------------------------- */
/*                                 Markdown                                   */
/* -------------------------------------------------------------------------- */

interface MarkdownProps {
  md: string;
}

const MarkdownComponent = (props: MarkdownProps) => {
  const { md } = props;
  return (
    <Markdown
      options={{
        overrides: {
          p: { component: CustomP },
          ul: { component: CustomUl },
          li: { component: CustomLi },
          a: { component: CustomA },
        },
      }}
    >
      {md}
    </Markdown>
  );
};

export default MarkdownComponent;
