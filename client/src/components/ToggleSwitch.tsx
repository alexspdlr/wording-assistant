import styled from '@emotion/styled';
import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import Tooltip from './Tooltip';

const Switch = styled('div')(
  () => `
  position: relative;
  height: 34px;
  background-color: #fafafa; 
  border-radius: 5px;
  box-shadow: inset #e7e7e7 0px 0px 0px 1px;
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
    box-shadow: inset #e7e7e7 0px 0px 0px 1px;
    border-radius: 5px;
    transition: left 200ms ease-out, border-radius 200ms ease;
  `
);

interface SwitchLabel {
  active: boolean;
}
const SwitchLabel = styled('label')(
  (props: SwitchLabel) => `
    position: relative;
    z-index: 2; 
    float: left;
    width: 80px;
    line-height: 32px;
    border-radius: 6px; 
    font-size: 13px;
    text-align: center;
    cursor: pointer; 
    color: ${props.active ? '#0F2B46;' : '#b1b1b1;'}  
    transition: color 0.25s ease-out; 
    font-weight: 500; 
    font-family: 'Inter', sans-serif;
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

  const values = ['Edit', 'Reword'];

  const handleChange = (val: string) => {
    setSelected(selected === 'Edit' ? 'Reword' : 'Edit');
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
