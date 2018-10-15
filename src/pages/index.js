import React, { Component } from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'

import db from '../db'

import _ from 'lodash'

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

import JobCard from '../components/JobCard'
import { list } from 'postcss'

const Hero = styled('div')`
  height: 600px;
  width: 100%;
  margin-bottom: 50px;

  background-color: #fff;
  background-image: url(${require('../images/hero@2x.png')});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;

  h1 {
    margin-bottom: 22px;
    color: #6324fe;
    font-family: Circular Std;
    line-height: 1.25;
    max-width: 600px;
    font-size: 48px;
  }

  h3 {
    font-family: Circular Std;
    color: #1c2557;
    font-weight: 500;
    font-size: 16px;
    display: flex;
    align-items: center;
  }

  @media (max-width: 700px) {
    background-position: top;

    h1 {
      font-size: 24px;
    }

    h3 {
    }
  }
`

const HeroContainer = styled('div')`
  max-width: 1100px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 30px;
  padding-right: 30px;

  @media (max-width: 700px) {
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 270px;
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

    this.renderListings = this.renderListings.bind(this)

    this.state = {
      listings: [],
      loadingZIndex: 11,
      loadingOpacity: 1
    }
  }

  componentDidMount() {
    // fetch listings..

  

    db.database()
      .ref('/listings')
      .once('value')
      .then(snapshot => {
        console.log('snapshot val', snapshot.val())
        this.setState({
          listings: snapshot.val(),
          loadingZIndex: -1,
          loadingOpacity: 0
        })
      })
  }

  renderListings() {
    const listings =
      this.state.listings &&
      Object.keys(this.state.listings).map(key => {
        console.log(key)
        return (
          <FormFieldRow key={this.state.listings[key].stripeRef}>
            <JobCard id={key} fields={this.state.listings[key]} />
          </FormFieldRow>
        )
      })

    return _.reverse(listings)
  }

  render() {
    return (
      <Layout>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            position: 'fixed',
            height: '100%',
            width: '100%',
            backgroundColor: '#ffffff',
            zIndex: this.state.loadingZIndex,
            opacity: this.state.loadingZIndex,
            transition: '.4s ease'
          }}
        >
          <img
            style={{ height: '45px' }}
            src={require('../images/Logo_1@2x.png')}
          />
          <div style={{fontFamily: "Circular Std", color: "#6324fe", fontSize: "15px"}}>dappgigs</div>
        </div>
        <Hero>
          <HeroContainer>
            <FlexContainer flexProps="justify-content: center; flex-direction: column; position: relative;">
              <h1>Join a team building for a decentralized future.</h1>
              <BodyCopy maxWidth="max-width: 500px">
                We help folks find great companies that are creating dapps on
                Ethereum's decentralized platform.
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
          </HeroContainer>
        </Hero>
        <PageContainer>{this.renderListings()}</PageContainer>
      </Layout>
    )
  }
}
