import styled from '@emotion/styled';
import { useState } from 'react';
import addAlphaToHexColor from 'src/utils/addAlphaToHexColor';
import Tooltip from '../tooltip';

/* ----------------------------- Selection ---------------------------- */

type ItemPosition = 'start' | 'middle' | 'end';

interface SelectionProps {
  itemPosition: ItemPosition;
  leftOffsetPercentage: number;
}

/* ---------------------------------- Button --------------------------------- */

const ButtonStyled = styled('button')(
  (defaultProps) =>
    `
    z-index: 2; 
    float: left; 
    line-height: 32px;  
    font-size: 14px;
    padding: 0px 12px; 
    text-align: center;
    cursor: pointer; 
    transition: color 0.15s ease-out; 
    font-weight: 500; 
    font-family: 'Inter', sans-serif;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border-radius: 4px;
    background-color: ${defaultProps.theme.palette.background.light};
    border: 1px solid ${defaultProps.theme.palette.divider};
    color: ${defaultProps.theme.palette.primary.main};
    &:hover { 
      color: ${defaultProps.theme.palette.primary.light} 
    } 
  `
);

interface ButtonProps {
  title: string;
  onChange: Function;
}

const Button = (props: ButtonProps) => {
  const { title, onChange } = props;
  return <ButtonStyled onClick={() => onChange(title)}>{title}</ButtonStyled>;
};

/* -------------------------------------------------------------------------- */
/*                                ToggleButton                                */
/* -------------------------------------------------------------------------- */

interface ToggleButtonProps {
  values: string[];
  onSelectionChange: Function;
  initiallySelectedIndex?: number;
}

const ToggleButton = (props: ToggleButtonProps) => {
  const { values, initiallySelectedIndex, onSelectionChange } = props;
  const [selected, setSelected] = useState(
    (initiallySelectedIndex && values[initiallySelectedIndex]) || values[0]
  );

  const handleChange = (val: string) => {
    const newVal = values.find((val) => val !== selected);

    if (newVal) {
      setSelected(newVal);
      onSelectionChange(newVal);
    }
  };

  return (
    <Button
      title={values.find((val) => val !== selected) || selected}
      onChange={handleChange}
    />
  );
};

export default ToggleButton;
