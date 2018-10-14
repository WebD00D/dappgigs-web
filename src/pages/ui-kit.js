import React, { Component } from 'react'
import { Link } from 'gatsby'
import styled from 'react-emotion'

import Layout from '../components/layout'

import { PageContainer } from '../components/theme'

import TextInput from '../components/TextInput'
import Textarea from '../components/Textarea'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import Select from '../components/Select'

const Spacer = styled('div')`
  margin-top: 30px;
  margin-bottom: 30px;
`

export default class UIKit extends Component {
  constructor(props) {
    super(props)

    this.handleTextInput = this.handleTextInput.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleTextarea = this.handleTextarea.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)

    this.state = {
      textInputValue: '',
      selectValue: '',
      textareaValue: '',
      checkboxValue: false,
      buttonClickedVal: '',
    }
  }

  handleTextInput(textInputValue) {
    this.setState({
      textInputValue,
    })
  }

  handleSelect(selectValue) {
    this.setState({
      selectValue,
    })
  }

  handleTextarea(textareaValue) {
    this.setState({
      textareaValue,
    })
  }

  handleCheckbox(checkboxValue) {
    this.setState({
      checkboxValue,
    })
  }

  handleButtonClick() {

    this.setState({
      buttonClickedVal: Date.now()
    })
  
  }

  render() {
    return (
      <Layout>
        <PageContainer>
          <h1>UI Kit</h1>
          <TextInput
            setValue={value => this.handleTextInput(value)}
            label="Text input"
          />
          <Spacer />
          <Select
            setValue={value => this.handleSelect(value)}
            options={['--', 'Full time', 'Part time', 'Contract', 'Internship']}
            label="Select"
          />
          <Spacer />
          <Textarea
            setValue={value => this.handleTextarea(value)}
            label="Textarea"
          />
          <Spacer />
          <Checkbox
            setValue={value => this.handleCheckbox(value)}
            name="ui-kit"
            label="Checkbox"
          />

          <Spacer />
          <Button
            handleClick={() => this.handleButtonClick()}
            label="Button"
            bg="#32E19F"
            color="#FFF"
            hoverBg="#2DCE91"
          />

          <Spacer />
          <div>==== Component Values ====</div>
          <div>
            <div>Text Input: {this.state.textInputValue}</div>
            <div>Select: {this.state.selectValue}</div>
            <div>Text area: {this.state.textareaValue}</div>
            <div>Checkbox: {this.state.checkboxValue ? 'true' : 'false'}</div>
            <div>Button Clicks: {this.state.buttonClickedVal}</div>
          </div>
        </PageContainer>
      </Layout>
    )
  }
}
