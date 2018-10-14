import React, { Component } from 'react'
import styled from 'react-emotion'

const InputContainer = styled('div')`
  label {
    font-family: Circular Std;
    font-size: 14px;
    color: #1c2557;
    font-weight: 500;
  }
`

const StyledTextarea = styled('textarea')`
  width: 100%;
  height: 200px;
  padding: 12px;

  background: #ffffff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);
  border: 2px solid #fff;
  border-radius: 4px;
  outline: none;

  font-family: Circular Std;
  font-size: 16px;
  font-weight: 500;
  color: #1c2557;
  transition: .2s ease;

  &:active, :focus {
    border: 2px solid #F1E9F4;
  }


`

export default class Textarea extends Component {
  render() {
    return (
      <InputContainer>
        <label>{this.props.label}</label>
        <StyledTextarea onChange={e => this.props.setValue(e.target.value)} />
      </InputContainer>
    )
  }
}
