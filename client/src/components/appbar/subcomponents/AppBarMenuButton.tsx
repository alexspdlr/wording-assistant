import styled from '@emotion/styled';

const AppBarMenuButtonStyled = styled('button')(
  (props) => `
  border: 0; 
  width: 26px; 
  height: 24px; 
  border-radius: 4px;  
  padding: 0px; 
  margin: 4px; 
  border-color:  #000; 
  background-color: transparent; 
  cursor: pointer; 
  display: flex;
  justify-content: space-around; 
  align-items: stretch; 
  /* flex-flow: column; */ 
  flex-direction: column;  
  &:hover{
    border-color: rgba(0, 99, 149, 1); 
`
);

interface LineProps {}
const Line = styled('div')(
  (props: LineProps) => `
    border-bottom: 1px solid; 
    border-color: inherit; 
    width: 100%
  `
);

interface AppBarMenuButtonProps {
  onClick: () => void;
}

const AppBarMenuButton = (props: AppBarMenuButtonProps) => {
  const { onClick } = props;
  return (
    <AppBarMenuButtonStyled onClick={onClick}>
      <Line />
      <Line />
      <Line />
    </AppBarMenuButtonStyled>
  );
};
export default AppBarMenuButton;
