import styled from '@emotion/styled';
import { useState } from 'react';

const Switch = styled('div')(
  () => `
  position: relative;
  height: 34px;
  background-color: #F9F9F9; 
  border-radius: 5px;
  border: 1px solid #e9e9e9;
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  overflow: hidden; 
`
);

const SwitchRadio = styled('input')(
  () => `
    display: none;
  `
);

interface SwitchSelectionProps {
  isLeftItem: boolean;
}
const SwitchSelection = styled('span')(
  (props: SwitchSelectionProps) => `
    display: block;
    position: absolute;
    z-index: 1; 
    top: 0px;
    left: 0px;
    width: 80px;
    height: 34px;
    background-color: #fff; 
    ${
      props.isLeftItem
        ? 'border-right: 1px solid #e9e9e9;'
        : 'border-left: 1px solid #e9e9e9;'
    } 
    ${
      props.isLeftItem
        ? 'border-radius: 5px 0px 0px 5px;'
        : 'border-radius: 0px 5px 5px 0px;'
    } 
    transition: left 200ms ease-out, border-radius 200ms ease;
  `
);

interface SwitchLabelProps {
  active: boolean;
}

const SwitchLabel = styled('label')(
  (props: SwitchLabelProps) => `
    position: relative;
    z-index: 2; 
    float: left;
    width: 80px;
    line-height: 32px;
    border-radius: 5px;
    font-size: 13px;
    text-align: center;
    cursor: pointer; 
    color: ${props.active ? '#0F2B46;' : '#949494;'}  
    transition: color 0.15s ease-out; 
    font-weight: 500; 
    font-family: 'Inter', sans-serif;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    &:hover {
      color: ${props.active ? 'rgba(0, 99, 149, 1);' : '#818181;'}
    }
  `
);

interface ClickableLabelProps {
  title: string;
  onChange: Function;
  active: boolean;
}

const ClickableLabel = (props: ClickableLabelProps) => {
  const { title, onChange, active } = props;
  return (
    <SwitchLabel onClick={() => onChange(title)} active={active}>
      {title}
    </SwitchLabel>
  );
};

interface ConcealedRadioProps {
  value: any;
  selected: any;
}

const ConcealedRadio = (props: ConcealedRadioProps) => {
  const { value, selected } = props;
  return (
    <SwitchRadio type='radio' name='switch' checked={selected === value} />
  );
};

const ToggleSwitch = () => {
  const [selected, setSelected] = useState('Edit');

  const values = ['Edit', 'Rephrase'];

  const handleChange = (val: string) => {
    setSelected(selected === 'Edit' ? 'Rephrase' : 'Edit');
  };

  const selectionStyle = () => {
    return {
      left: `${(values.indexOf(selected) / values.length) * 100}%`,
    };
  };

  return (
    <Switch>
      {values.map((val, i) => {
        return (
          <span>
            <ConcealedRadio value={val} selected={selected} />
            <ClickableLabel
              title={val}
              active={selected === val}
              onChange={handleChange}
            />
          </span>
        );
      })}
      <SwitchSelection
        style={selectionStyle()}
        isLeftItem={selected === values[0]}
      />
    </Switch>
  );
};

export default ToggleSwitch;
