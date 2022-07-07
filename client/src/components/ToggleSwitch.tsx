import styled from '@emotion/styled';
import React, { Component, useState } from 'react';
import { render } from 'react-dom';

const Switch = styled('div')(
  () => `
  position: relative;
  height: 32px;
  background-color: rgba(218, 225, 232, 0.2);
  border-radius: 6px;
  box-shadow: inset 0 0px 2px rgba(0, 0, 0, 0.2);
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  transition: background-color 0.25s ease;
`
);

const SwitchRadio = styled('input')(
  () => `
    display: none;
  `
);

const SwitchSelection = styled('span')(
  () => `
    display: block;
    position: absolute;
    z-index: 1;
    top: 0px;
    left: 0px;
    width: 76px;
    height: 28px;
    background-color: #fff; 
    margin-top: 2px;
    margin-left: 2px; 
    margin-right: 2px;  
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15), 0 0px 2px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    transition: left 0.25s ease-out;
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
    color: ${props.active ? '#0F2B46;' : '#7a7a7a;'}
    transition: color 0.25s ease-out; 
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
      {values.map((val) => {
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
      <SwitchSelection style={selectionStyle()} />
    </Switch>
  );
};

export default ToggleSwitch;
