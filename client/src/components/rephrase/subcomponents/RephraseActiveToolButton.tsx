import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { cloneElement, JSXElementConstructor, ReactElement } from 'react';
import Card from 'src/components/general/card';

/* ---------------------------- Styled components --------------------------- */
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
    transition: background-color 150ms ease-in-out; 
    ${
      props.active
        ? 'border-bottom: 0px; border-radius: 8px 8px 4px 4px;'
        : `border-radius: 8px; &:hover { background-color: ${
            defaultProps.theme.activeMode === 'light' ? '#F4F9FD' : '#1e1f21'
          }}`
    } 
    `
);

const Container = styled('div')(
  () =>
    `  
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 14px;
    padding-right: 14px;
    `
);

interface PrimaryTextProps {
  textColor: string;
}
const PrimaryText = styled('div')(
  (props: PrimaryTextProps) => `
  padding-left: 14px;
  font-weight: 600;
  font-size: 16px;
  color: ${props.textColor};
  margin-bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  fontFamily: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  `
);

const SecondaryText = styled('div')(
  (defaultProps) => `
  font-size: 14px;
  font-weight: 400;
  color: ${defaultProps.theme.palette.text.disabled};
  padding-top: 2px;
  `
);

interface IsActiveIndicatorProps {
  isActive: boolean;
}
const IsActiveIndicator = styled('div')(
  (props: IsActiveIndicatorProps) => (defaultProps) =>
    `
  height: 3px;
  width: 100%;
  background-color: ${
    props.isActive ? defaultProps.theme.palette.primary.light : 'transparent'
  };
  `
);
/* -------------------------------------------------------------------------- */
/*                          RephraseActiveToolButton                          */
/* -------------------------------------------------------------------------- */

interface RephraseActiveToolButtonProps {
  icon: ReactElement<any, string | JSXElementConstructor<any>>;
  text: string;
  subtitle: string;
  active: boolean;
  onClick?: () => void;
}

const RephraseActiveToolButton = (props: RephraseActiveToolButtonProps) => {
  const { active, icon, text, onClick, subtitle } = props;
  const theme = useTheme();
  const determineColor = () => {
    if (active) {
      return {
        iconColor: theme.palette.text.main,
        textColor: theme.palette.text.main,
      };
    }

    return {
      iconColor: theme.palette.primary.light,
      textColor: theme.palette.primary.light,
    };
  };

  const activeColors = determineColor();

  return (
    <Wrapper active={active} as='button' onClick={onClick}>
      <Container>
        {cloneElement(icon, {
          style: {
            color: activeColors.iconColor,
            height: 24,
          },
        })}
        <PrimaryText textColor={activeColors.textColor}>
          {text}
          <SecondaryText>{subtitle}</SecondaryText>
        </PrimaryText>
      </Container>
      <IsActiveIndicator isActive={active} />
    </Wrapper>
  );
};

export default RephraseActiveToolButton;
