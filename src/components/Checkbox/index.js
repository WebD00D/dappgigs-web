import React, { Component } from 'react'
import styled from 'react-emotion'

const StyledCheckbox = styled('input')`
  position: absolute;
  opacity: 0;

  & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
    font-family: Circular Std;
    font-size: 14px;
    font-weight: 500;
    color: #1c2557;
  }

  & + label:before {
    content: '';
    margin-right: 10px;
    display: inline-block;
    vertical-align: text-top;
    width: 20px;
    height: 20px;
    background: white;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    transition: 0.2s ease;
  }

  &:hover + label:before {
    background: #f3edf9;
  }

  &:checked + label:before {
    background: #f3edf9;
  }

  &:checked + label:after {
    content: '';
    position: absolute;
    left: 5px;
    top: 9px;
    background: #1c2557;
    width: 2px;
    height: 2px;
    box-shadow: 2px 0 0 #1c2557, 4px 0 0 #1c2557, 4px -2px 0 #1c2557,
      4px -4px 0 #1c2557, 4px -6px 0 #1c2557, 4px -8px 0 #1c2557;
    transform: rotate(45deg);
  }
`
export default class Checkbox extends Component {
  render() {
    return (
      <div>
        <StyledCheckbox
          onChange={e => this.props.setValue(e.target.checked)}
          id={this.props.name}
          type="checkbox"
        />
        <label htmlFor={this.props.name}>{this.props.label}</label>
      </div>
    )
  }
}
