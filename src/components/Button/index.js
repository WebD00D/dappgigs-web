import React, { Component } from 'react'
import styled from 'react-emotion'

const StyledButton = styled('button')`
  height: 48px;
  width: 100%;

  font-family: Circular Std;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 48px;
  color: ${props => props.color};
  background-color: ${props => props.bg};
  cursor: pointer;
  outline: none;
  transition: 0.2s ease;

  &:hover {
    background-color: ${props => props.hoverBg};
  }

  &:disabled {
    background-color: #ccc;
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export default class Button extends Component {
  render() {
    return (
      <StyledButton
        disabled={this.props.disabled}
        onClick={() => this.props.handleClick()}
        bg={this.props.bg}
        color={this.props.color}
        hoverBg={this.props.hoverBg}
      >
        {this.props.label}
      </StyledButton>
    )
  }
}





