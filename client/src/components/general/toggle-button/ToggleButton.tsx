import styled from '@emotion/styled';
import { useState } from 'react';
import addAlphaToHexColor from 'src/utils/addAlphaToHexColor';

/* -------------------------------- Container ------------------------------- */
const Container = styled('div')(
  (props) => `
  position: relative;
  height: 32px;
  background-color: ${props.theme.palette.background.dark}; 
  border-radius: 4px;
  border: 1px solid ${props.theme.palette.border};
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  overflow: hidden; 
`
);

/* ----------------------------- Selection ---------------------------- */

type ItemPosition = 'start' | 'middle' | 'end';

interface SelectionProps {
  itemPosition: ItemPosition;
  leftOffsetPercentage: number;
}

const Selection = styled('span')(
  (props: SelectionProps) => (defaultProps) =>
    `
    display: block;
    position: absolute;
    z-index: 1; 
    width: 95px;
    height: 32px;
    background-color: ${defaultProps.theme.palette.background.main}; 
    transition: left 200ms ease-out, border-radius 200ms ease;
    box-shadow: ${defaultProps.theme.palette.border} 0px 0px 0px 1px;
    left: ${props.leftOffsetPercentage}%;  
  `
);

/* ---------------------------------- Label --------------------------------- */

interface LabelStyledProps {
  active: boolean;
}

const LabelStyled = styled('label')(
  (props: LabelStyledProps) => (defaultProps) =>
    `
    z-index: 2; 
    float: left;
    width: 95px;
    line-height: 32px;  
    font-size: 14px;
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
    color: ${
      props.active
        ? `${defaultProps.theme.palette.primary.main};`
        : `${defaultProps.theme.palette.text.disabled};`
    }  
    &:hover {
      color: ${
        props.active
          ? `${defaultProps.theme.palette.primary.main};`
          : `${defaultProps.theme.palette.text.disabled};`
      }
     ${
       !props.active &&
       `background-color: ${addAlphaToHexColor(
         defaultProps.theme.palette.text.light,
         0.05
       )};`
     }
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
  return <HiddenRadio type='radio' checked={selected === value} />;
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
  onSelectionChange: Function;
  initiallySelectedIndex?: number;
}

const ToggleButton = (props: ToggleButtonProps) => {
  const { values, initiallySelectedIndex, onSelectionChange } = props;
  const [selected, setSelected] = useState(
    (initiallySelectedIndex && values[initiallySelectedIndex]) || values[0]
  );

  const handleChange = (val: string) => {
    setSelected(val);
    onSelectionChange(val);
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
      <Selection
        leftOffsetPercentage={(values.indexOf(selected) / values.length) * 100}
        itemPosition={determineItemPosition(selected, values)}
      />
    </Container>
  );
};

export default ToggleButton;
