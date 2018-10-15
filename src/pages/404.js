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

const Navigation = styled('div')`
  height: 80px;
  padding-left: 30px;
  padding-right: 30px;
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 5;
  background-color: #fff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);

  @media (max-width: 700px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`

const Logo = styled(Link)`
  font-family: Circular Std;
  display: flex;
  align-items: center;
  color: #6324fe;
  font-size: 24px;
  font-weight: 500;
  text-decoration: none;

  img {
    height: 45px;
    margin-bottom: 0px;
    margin-right: 12px;
  }
`

const Links = styled('div')`
  display: flex;
  align-items: center;
`

const ButtonContainer = styled('div')`
  width: 175px;
`

export default class PageNotFound extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout>
        <Navigation>
          <Logo to="/">
            <img
              style={{ height: '45px' }}
              src={require('../images/Logo_1@2x.png')}
            />
            dappgigs
          </Logo>
          <Links>
            <ButtonContainer />
            <Button
              handleClick={() => navigate('/listing')}
              label="Post a listing for $49"
              bg="#32E19F"
              color="#FFF"
              hoverBg="#2DCE91"
            />
          </Links>
        </Navigation>
        <Hero>
          <PageContainer>
            <FlexContainer flexProps="justify-content: center; flex-direction: column; position: relative;">
              <h1>Nothing found here :(</h1>
              <h3>Womp, womp.</h3>
              <FormFieldRow>
                <FormFieldWrap>
                  <Button
                    handleClick={() => navigate('/')}
                    label="Go to homepage"
                    bg="#1C2557"
                    color="#FFF"
                    hoverBg="#1C2557"
                  />
                </FormFieldWrap>
                <FormFieldWrap />
              </FormFieldRow>
            </FlexContainer>
          </PageContainer>
        </Hero>
      </Layout>
    )
  }
}
