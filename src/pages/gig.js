import React, { Component } from 'react'
import { Link, navigate } from 'gatsby'

import Layout from '../components/layout'
import styled from 'react-emotion'

import db from '../db'

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
  padding-top: 100px;
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
    margin-bottom: 12px;

    a {
      color: #1c2557 !important;
    }
  }

  h4 {
    font-family: Circular Std;
    color: #8c8c8c;
    font-weight: 500;
    font-size: 12px;
    margin-bottom: 0px;
  }

  @media (max-width: 700px) {
    min-height: 500px;
  }

  
`

const LogoCard = styled('div')`
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;

  background: #ffffff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);
  border-radius: 4px;

  img {
    height: auto;
    width: auto;
    margin-bottom: 0px;
    max-height: 100px;
    max-width: 100px;
  }

  @media (max-width: 700px) {
    margin-right: 0px;
  }
`

const SectionTitle = styled('div')`
  margin-bottom: 6px;
  color: #1c2557;
  font-family: Circular Std;
  font-size: 18px;
  font-weight: 600;
`

const BodyCopy = styled('div')`
  color: #1c2557;
  font-family: Circular Std;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
`

export default class Gig extends Component {
  constructor(props) {
    super(props)

    this.getGigIDParam = this.getGigIDParam.bind(this)
    this.gatherDataFromProps = this.gatherDataFromProps.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.handleNavigation = this.handleNavigation.bind(this)

    this.state = {
      fields: {},
    }
  }

  componentDidMount() {
    const gigId = this.getGigIDParam()['dg']

    // Before we fetch data, let's check if we we're passed data via props..
    this.props.location.state &&
    this.props.location.state.fields &&
    this.props.location.state.fields !== 'none'
      ? this.gatherDataFromProps()
      : this.fetchData(gigId)
  }

  fetchData(gigId) {
    db.database()
      .ref(`/listings/${gigId}`)
      .once('value')
      .then(snapshot => {

        snapshot.val()
          ? this.setState({
              fields: snapshot.val().fields,
            })
          : navigate('/404')
      })
  }

  gatherDataFromProps() {
    this.setState({
      fields: this.props.location.state.fields,
    })
  }

  // Should move this to a utility file..
  getGigIDParam() {
    const vars = {}
    const parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function(m, key, value) {
        vars[key] = value
      }
    )
    return vars
  }

  handleNavigation() {
    let { applyURL } = this.state.fields

    let hrefPrefix = applyURL.indexOf('@') > -1 ? 'mailto:' : ''

    if (hrefPrefix.trim() === '') {
      applyURL =
        applyURL.indexOf('http') === -1 ? `http://${applyURL}` : applyURL
    }

    window.open(`${hrefPrefix}${applyURL}`, '_blank')
  }

  render() {
    const {
      company,
      position,
      location,
      remote,
      about,
      description,
      category,
      salary,
      engagement,
      website,
      applyURL,
      logoURL,
    } = this.state.fields

    return (
      <Layout>
        <Hero>
          <PageContainer >
            <FlexContainer mobile="flex-direction: column; align-items: center;" >
              <FlexContainer flexProps="align-items: center">
                <LogoCard>
                  <img src={logoURL} />
                </LogoCard>
              </FlexContainer>
              <FlexContainer flexProps="justify-content: center; flex-direction: column; position: relative;" mobile=" align-items: center; text-align: center;">
                <h1>{position}</h1>
                <h3>
                  <a target="_blank" href={website}>
                    {company}
                  </a>{' '}
                  in {location}
                </h3>
                <h4>
                  {category} | {engagement} {remote ? '| Remote OK' : ''}{' '}
                </h4>
              </FlexContainer>
            </FlexContainer>
          </PageContainer>
        </Hero>
        <PageContainer>
          <FormFieldRow>
            <FormFieldWrap>
              <SectionTitle>About {company}</SectionTitle>
              <BodyCopy>{about}</BodyCopy>
            </FormFieldWrap>
          </FormFieldRow>
          <FormFieldRow>
            <FormFieldWrap>
              <SectionTitle>Job description</SectionTitle>
              <BodyCopy>{description}</BodyCopy>
            </FormFieldWrap>
          </FormFieldRow>
          <FormFieldRow>
            <FormFieldWrap>
              <SectionTitle>Salary</SectionTitle>
              <BodyCopy>{salary}</BodyCopy>
            </FormFieldWrap>
          </FormFieldRow>
          <FormFieldRow>
            <FormFieldWrap>
              <Button
                handleClick={() => this.handleNavigation()}
                label="Apply to this position"
                bg="#32E19F"
                color="#FFF"
                hoverBg="#2DCE91"
              />
            </FormFieldWrap>
            <FormFieldWrap />
          </FormFieldRow>
        </PageContainer>
      </Layout>
    )
  }
}


