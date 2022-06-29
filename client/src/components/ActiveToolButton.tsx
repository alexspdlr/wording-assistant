import styled from '@emotion/styled';
import { ReactComponent as IconRephrase } from '../assets/IconRephrase.svg';

const ActiveToolButtonWrapper = styled('button')(
  (props) => ` 
    height: 65px; 
    background-color: #ffffff;
    border-radius: 8px;
    border: 1px solid rgb(218, 225, 232);
    border-bottom: 0px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 4px 0px;
    overflow: hidden;
    padding: 0px; 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    `
);

const ActiveToolButton = () => {
  return (
    <ActiveToolButtonWrapper>
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <IconRephrase fill='rgb(27, 30, 37)' />
        <div
          style={{
            paddingLeft: 15,
            fontWeight: 600,
            fontSize: 16,
            color: 'rgb(27, 30, 37)',
            marginBottom: -2,
            fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;`,
          }}
        >
          Rephrase text
        </div>
      </div>
      <div
        style={{
          height: 3,
          width: '100%',
          backgroundColor: 'rgba(0, 99, 149, 1)',
        }}
      />
    </ActiveToolButtonWrapper>
  );
};

export default ActiveToolButton;
