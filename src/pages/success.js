import React, { Component } from 'react'
import { Link, navigate } from 'gatsby'
import Layout from '../components/layout'
import styled from 'react-emotion'

import {
  PageContainer,
  FlexContainer,
  FormContainer,
  FormFieldRow,
  FormFieldWrap,
} from '../components/theme'

import TextInput from '../components/TextInput'
import Textarea from '../components/Textarea'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import Select from '../components/Select'

const Hero = styled('div')`
  height: 400px;
  width: 100%;
  padding-top: 50px;
  margin-bottom: 50px;

  background-color: #fff;
  background-image: url(${require('../images/newerbg@2x.png')});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right;

  h1 {
    margin-bottom: 12px;
    color: #1c2557;
    font-family: Circular Std;
  }

  h3 {
    font-family: Circular Std;
    color: #1c2557;
    font-weight: 500;
    font-size: 16px;
  }
`

const SectionTitle = styled('div')`
  margin-bottom: 12px;
  color: #1c2557;
  font-family: Circular Std;
  font-size: 16px;
  font-weight: 600;
`

const ConfirmationCode = styled('div')`
  font-weight: bold;
  line-height: normal;
  font-size: 35px;
  font-family: Circular Std;
  color: #32e19f;
  margin-bottom: 12px;
`

const BodyCopy = styled('div')`
  color: #1c2557;
  font-family: Circular Std;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
`

export default class Success extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout>
        <Hero>
          <PageContainer>
            <FlexContainer flexProps="justify-content: center; flex-direction: column; position: relative;">
              <h1>Your listing is posted!</h1>
              <h3>
                Whoop whoop! You’re one step closer to finding your next{' '}
                {this.props.location.state
                  ? this.props.location.state.fields.position
                  : 'candidate'}
              </h3>
            </FlexContainer>
          </PageContainer>
        </Hero>
        <PageContainer>
          <FormContainer>
            <FormFieldRow>
              <FormFieldWrap>
                <SectionTitle>Confirmation code</SectionTitle>
                <ConfirmationCode>
                  {this.props.location.state
                    ? this.props.location.state.paymentId
                    : 'ch_1DKzs24JB0H1ff1kmdlb7vDS'}
                </ConfirmationCode>
                <BodyCopy>
                  Copy this code somewhere safe! You’ll need this if you require
                  support for this listing.
                </BodyCopy>
              </FormFieldWrap>
            </FormFieldRow>
            <FormFieldRow>
              <FormFieldWrap>
                <SectionTitle>What's next?</SectionTitle>
                <BodyCopy>
                  We’ll start promoting your listing within the next 24 hours.
                  In the meantime, you can check it out here. We recommend
                  sharing the listing on your social channels, with email
                  contacts, friends, family, your dog, etc.
                </BodyCopy>
                <BodyCopy>Let us know if you have any questions!</BodyCopy>
              </FormFieldWrap>
            </FormFieldRow>

            <FormFieldRow>
              <FormFieldWrap>
                <Button
                  handleClick={() =>
                    navigate(
                      `${
                        this.props.location.state
                          ? `/gig?dg=${this.props.location.state.paymentId}`
                          : '/gig?dg=ch_1DL0Pw4JB0H1ff1kGIvP6g27'
                      }`
                    , { state: { fields: this.props.location.state ? this.props.location.state.fields : 'none' } })
                  }
                  label="View your listing"
                  bg="#1C2557"
                  color="#FFF"
                  hoverBg="#1C2557"
                />
              </FormFieldWrap>
              <FormFieldWrap />
            </FormFieldRow>
          </FormContainer>
        </PageContainer>
      </Layout>
    )
  }
}
