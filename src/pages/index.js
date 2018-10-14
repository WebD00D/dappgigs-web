import React, { Component } from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'

import moment from 'moment'

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
  height: 500px;
  width: 100%;
  padding-top: 50px;
  margin-bottom: 50px;

  background-color: #fff;
  background-image: url(${require('../images/hero@2x.png')});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;

  h1 {
    margin-bottom: 22px;
    color: #1c2557;
    font-family: Circular Std;
    line-height: 1.25;
    max-width: 600px;
  }

  h3 {
    font-family: Circular Std;
    color: #1c2557;
    font-weight: 500;
    font-size: 16px;
    display: flex;
    align-items: center;
  }
`

const ArrowButton = styled('img')`
  margin-bottom: 0px;
  margin-left: 15px;
  height: 40px;
`

const CTA = styled('div')`
  font-family: Circular Std;
  color: #1c2557;
  font-weight: 500;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-top: 30px;
`

const BodyCopy = styled('div')`
  color: #1c2557;
  font-family: Circular Std;
  font-size: 16px;
  font-weight: 500;
 

  ${props => props.maxWidth};
`



export default class IndexPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // fetch listings..
  }

  render() {
    return (
      <Layout>
        <Hero>
          <PageContainer>
            <FlexContainer flexProps="justify-content: center; flex-direction: column; position: relative;">
              <h1>Join a team building for a decentralized future.</h1>
              <BodyCopy maxWidth="max-width: 500px" >
                We help folks find great companies that are creating dapps on Ethereum's decentralized platform.
              </BodyCopy>
              
              <CTA>
                <Link
                  style={{ color: '#FF6748', paddingRight: '6px' }}
                  to="/listing"
                >
                  {' '}
                  post a listing{' '}
                </Link>{' '}
                for $49{' '}
                <Link style={{ lineHeight: '1' }} to="/listing">
                  <ArrowButton src={require('../images/arrow@2x.png')} />
                </Link>
              </CTA>
            </FlexContainer>
          </PageContainer>
        </Hero>
      </Layout>
    )
  }
}
