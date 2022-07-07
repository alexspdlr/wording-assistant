import styled from '@emotion/styled';
import { cloneElement, JSXElementConstructor, ReactElement } from 'react';

interface ActiveToolButtonWrapperProps {
  active: boolean;
}

const ActiveToolButtonWrapper = styled('button')(
  (props: ActiveToolButtonWrapperProps) => ` 
    height: 65px; 
    background-color: #ffffff;
    border: 1px solid rgb(218, 225, 232);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 4px 0px;
    overflow: hidden;
    padding: 0px; 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
   ${
     props.active
       ? 'border-bottom: 0px; border-radius: 8px 8px 4px 4px;'
       : 'border-radius: 8px;'
   }
    ${!props.active && '&:hover {background-color: rgb(244, 249, 253)}'} 
    `
);

interface ActiveToolButtonProps {
  icon: ReactElement<any, string | JSXElementConstructor<any>>;
  text: string;
  active: boolean;
}

const ActiveToolButton = (props: ActiveToolButtonProps) => {
  const { active, icon, text } = props;

  return (
    <ActiveToolButtonWrapper active={active}>
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
    </ActiveToolButtonWrapper>
  );
};

export default ActiveToolButton;
