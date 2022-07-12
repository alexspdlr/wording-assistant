import styled from '@emotion/styled';
import { cloneElement, JSXElementConstructor, ReactElement } from 'react';
import Card from 'src/components/general/card';

interface WrapperProps {
  active: boolean;
}

const Wrapper = styled(Card)(
  (props: WrapperProps) => `  
    height: 65px; 
    overflow: hidden;
    padding: 0px; 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer; 
    ${
      props.active
        ? 'border-bottom: 0px; border-radius: 8px 8px 4px 4px;'
        : 'border-radius: 8px; &:hover {background-color: rgb(244, 249, 253)}'
    } 
    `
);

interface ActiveToolButtonProps {
  icon: ReactElement<any, string | JSXElementConstructor<any>>;
  text: string;
  active: boolean;
}

const RephraseActiveToolButton = (props: ActiveToolButtonProps) => {
  const { active, icon, text } = props;

  return (
    <Wrapper active={active} as='button'>
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 14,
          paddingRight: 14,
        }}
      >
        {cloneElement(icon, {
          style: {
            color: active ? 'rgb(27, 30, 37)' : 'rgba(0, 99, 149, 1)',
            height: 24,
          },
        })}
        <div
          style={{
            paddingLeft: 14,
            fontWeight: 600,
            fontSize: 16,
            color: active ? 'rgb(27, 30, 37)' : 'rgba(0, 99, 149, 1)',
            marginBottom: 0,
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          }}
        >
          {text}
        </div>
      </div>
      <div
        style={{
          height: 3,
          width: '100%',
          backgroundColor: active ? 'rgba(0, 99, 149, 1)' : 'transparent',
        }}
      />
    </Wrapper>
  );
};

export default RephraseActiveToolButton;
