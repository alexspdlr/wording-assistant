import styled from '@emotion/styled';
import { useState } from 'react';

/* -------------------------------- Container ------------------------------- */
const Container = styled('div')(
  () => `
  position: relative;
  height: 32px;
  background-color: #F9F9F9; 
  border-radius: 4px;
  border: 1px solid #eaeaea;
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  overflow: hidden; 
`
);

/* ----------------------------- SwitchSelection ---------------------------- */

type ItemPosition = 'start' | 'middle' | 'end';

interface SwitchSelectionProps {
  itemPosition: ItemPosition;
  leftOffsetPercentage: number;
}

const SwitchSelection = styled('span')(
  (props: SwitchSelectionProps) => `
    display: block;
    position: absolute;
    z-index: 1; 
    width: 85px;
    height: 32px;
    background-color: #fff; 
    transition: left 200ms ease-out, border-radius 200ms ease;
    box-shadow: #e9e9e9 0px 0px 0px 1px;
    left: ${props.leftOffsetPercentage}%; 
  `
);

/* ---------------------------------- Label --------------------------------- */

interface LabelStyledProps {
  active: boolean;
}

const LabelStyled = styled('label')(
  (props: LabelStyledProps) => `
    z-index: 2; 
    float: left;
    width: 85px;
    line-height: 32px;  
    font-size: 13px;
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
    color: ${props.active ? '#0F2B46;' : '#949494;'}  
    &:hover {
      color: ${props.active ? 'rgba(0, 99, 149, 1);' : '#818181;'}
     ${!props.active && ' background-color: rgba(0,0,0, 0.02);'}
    }
  `
);

interface LabelProps {
  title: string;
  onChange: Function;
  active: boolean;
}

const Label = (props: LabelProps) => {
  const { title, onChange, active } = props;
  return (
    <LabelStyled onClick={() => onChange(title)} active={active}>
      {title}
    </LabelStyled>
  );
};

/* ---------------------------------- Radio --------------------------------- */

const HiddenRadio = styled('input')(
  () => `
    display: none;
  `
);

interface RadioProps {
  value: any;
  selected: any;
}

const Radio = (props: RadioProps) => {
  const { value, selected } = props;
  return (
    <HiddenRadio type='radio' name='switch' checked={selected === value} />
  );
};

/* ------------------------------ util ----------------------------- */

const determineItemPosition = (
  selected: string,
  values: string[]
): ItemPosition => {
  if (selected === values[0]) {
    return 'start';
  }
  if (selected === values[values.length - 1]) {
    return 'end';
  }

  return 'middle';
};

/* -------------------------------------------------------------------------- */
/*                                ToggleButton                                */
/* -------------------------------------------------------------------------- */

interface ToggleButtonProps {
  values: string[];
  initiallySelectedIndex?: number;
}

const ToggleButton = (props: ToggleButtonProps) => {
  const { values, initiallySelectedIndex } = props;
  const [selected, setSelected] = useState(
    (initiallySelectedIndex && values[initiallySelectedIndex]) || values[0]
  );

  const handleChange = (val: string) => {
    setSelected(val);
  };

  return (
    <Container>
      {values.map((val, i) => {
        return (
          <>
            <Radio value={val} selected={selected} />
            <Label
              title={val}
              active={selected === val}
              onChange={handleChange}
            />
          </>
        );
      })}
      <SwitchSelection
        leftOffsetPercentage={(values.indexOf(selected) / values.length) * 100}
        itemPosition={determineItemPosition(selected, values)}
      />
    </Container>
  );
};

export default ToggleButton;
