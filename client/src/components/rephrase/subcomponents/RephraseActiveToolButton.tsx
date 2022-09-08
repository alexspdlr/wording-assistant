import { Theme, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { cloneElement, JSXElementConstructor, ReactElement } from 'react';
import Card from 'src/components/general/card';
import addAlphaToHexColor from 'src/utils/addAlphaToHexColor';

const determineColor = (active: boolean, theme: Theme) => {
  if (active) {
    if (theme.activeMode === 'dark') {
      return {
        iconColor: theme.palette.text.main,
        textColor: theme.palette.text.main,
      };
    }
    return {
      iconColor: theme.palette.text.main,
      textColor: theme.palette.text.main,
    };
  }

  if (theme.activeMode === 'dark') {
    return {
      iconColor: theme.palette.primary.light,
      textColor: theme.palette.primary.light,
    };
  }

  return {
    iconColor: theme.palette.primary.light,
    textColor: theme.palette.primary.light,
  };
};
interface WrapperProps {
  active: boolean;
}

const Wrapper = styled(Card)(
  (props: WrapperProps) => (defaultProps) =>
    `  
    height: 65px; 
    overflow: hidden;
    padding: 0px; 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    border: 1px solid ${defaultProps.theme.palette.border}; 
    ${
      props.active
        ? 'border-bottom: 0px; border-radius: 8px 8px 4px 4px;'
        : `border-radius: 8px; &:hover {background-color: ${
            defaultProps.theme.activeMode === 'light' ? '#F4F9FD' : '#1e1f21'
          }}`
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
  const theme = useTheme();
  const colors = determineColor(active, theme);
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
            color: colors.iconColor,
            height: 24,
          },
        })}
        <div
          style={{
            paddingLeft: 14,
            fontWeight: 600,
            fontSize: 16,
            color: colors.textColor,
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
          backgroundColor: active ? theme.palette.primary.light : 'transparent',
        }}
      />
    </Wrapper>
  );
};

export default RephraseActiveToolButton;
