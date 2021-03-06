import React, { Component } from 'react'
import { Link, navigate } from 'gatsby'
import styled from 'react-emotion'
import { StripeProvider } from 'react-stripe-elements'

import db from '../db'

import { Elements } from 'react-stripe-elements'

import Layout from '../components/layout'
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

import PaymentForm from '../components/PaymentForm'

import '../components/layout.css'
import { list } from 'postcss'

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
  }

  @media (max-width: 700px) {
    height: 300px;
  }
`

const HeroJobCard = styled('img')`
  position: absolute;
  height: 400px;
  right: -150px;
  margin-bottom: 0px;

  @media (max-width: 700px) {
    display: none;
  }
`

const Divider = styled('div')`
  height: 2px;
  background-color: #f1e9f4;
  width: 100%;
  margin-top: 60px;
  margin-bottom: 60px;
`

const SectionTitle = styled('div')`
  margin-bottom: 30px;
  color: #1c2557;
  font-family: Circular Std;
  font-size: 22px;
  font-weight: 600;
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

export default class Listing extends Component {
  constructor(props) {
    super(props)

    this.createListing = this.createListing.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.setFormFieldValue = this.setFormFieldValue.bind(this)

    this.state = {
      enablePayment: false,
      stripe: null,

      fields: {
        company: null,
        position: 'frontend engineer',
        location: null,
        remote: false,
        about: null,
        description: null,
        category: null,
        salary: null,
        engagement: null,
        website: null,
        applyURL: null,
        logoURL: null,
      },
    }
  }

  componentDidMount() {
    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe('pk_live_4MuZBQJz1AkWqEQ7bR0pfjmI'),
      })
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({
          stripe: window.Stripe('pk_live_4MuZBQJz1AkWqEQ7bR0pfjmI'),
        })
      })
    }
  }

  createListing(paymentId) {

    if ( !paymentId) {
      paymentId = Date.now()
    }

    const listingData = {
      stripeRef: paymentId,
      fields: this.state.fields,
      postedOn: Date.now()
    }

    const listing = {}
    listing[`/listings/${paymentId}`] = listingData

    db.database()
      .ref()
      .update(listing)
      .then(() => console.log('listing added'))

    navigate('/success', {
      state: { paymentId: paymentId, fields: this.state.fields },
    })
  }

  validateForm() {
    const fields = this.state.fields

    let isValid = true

    Object.keys(fields).map(key => {
      if (fields[key] == null || fields[key] === '') {
        isValid = false
      }
    })
    this.setState({
      enablePayment: isValid,
    })
  }

  setFormFieldValue(key, value) {
    const fields = { ...this.state.fields }
    fields[key] = value
    this.setState({ fields }, () => {
      this.validateForm()
    })
  }

  render() {

    
    return (
      <StripeProvider stripe={this.state.stripe}>

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
              label="Post a listing"
              bg="#32E19F"
              color="#FFF"
              hoverBg="#2DCE91"
            />
          </Links>
        </Navigation>
          <Hero>
            <PageContainer>
              <FlexContainer flexProps="justify-content: center; flex-direction: column; position: relative;">
                <h1>Create a new listing</h1>
                <h3>
                  Fill out the form below with the details of the position
                </h3>
                <HeroJobCard src={require('../images/card@2x.png')} />
              </FlexContainer>
            </PageContainer>
          </Hero>
          <PageContainer>
            <FormContainer>
              <SectionTitle>Listing details</SectionTitle>

              <FormFieldRow>
                <FormFieldWrap>
                  <TextInput
                    label="Company name"
                    setValue={val => this.setFormFieldValue('company', val)}
                  />
                </FormFieldWrap>
                <FormFieldWrap>
                  <TextInput
                    label="Position title"
                    setValue={val => this.setFormFieldValue('position', val)}
                  />
                </FormFieldWrap>
              </FormFieldRow>

              <FormFieldRow>
                <FormFieldWrap>
                  <TextInput
                    label="Location"
                    setValue={val => this.setFormFieldValue('location', val)}
                  />
                </FormFieldWrap>
                <FormFieldWrap alignment="display: flex; align-items: center;display: flex;">
                  <Checkbox
                    setValue={val => this.setFormFieldValue('remote', val)}
                    label="Remote OK"
                    name="remote-ok"
                  />
                </FormFieldWrap>
              </FormFieldRow>

              <FormFieldRow>
                <FormFieldWrap>
                  <Textarea
                    setValue={val => this.setFormFieldValue('about', val)}
                    label="About your company"
                  />
                </FormFieldWrap>
              </FormFieldRow>

              <FormFieldRow>
                <FormFieldWrap>
                  <Textarea
                    setValue={val => this.setFormFieldValue('description', val)}
                    label="Job description"
                  />
                </FormFieldWrap>
              </FormFieldRow>

              <FormFieldRow>
                <FormFieldWrap>
                  <Select
                    setValue={val => this.setFormFieldValue('category', val)}
                    options={[
                      '--',
                      'Design',
                      'Engineering',
                      'Support',
                      'Copywriting',
                      'DevOps',
                      'Sales & Marketing',
                      'Finance',
                      'Legal',
                      'Product',
                      'Other',
                    ]}
                    label="Category"
                  />
                </FormFieldWrap>
              </FormFieldRow>

              <FormFieldRow>
                <FormFieldWrap>
                  <TextInput
                    setValue={val => this.setFormFieldValue('salary', val)}
                    label="Salary"
                    placeholder="$75-$85k, negotiable, etc."
                  />
                </FormFieldWrap>
                <FormFieldWrap>
                  <Select
                    setValue={val => this.setFormFieldValue('engagement', val)}
                    options={[
                      '--',
                      'Full time',
                      'Part time',
                      'Contract',
                      'Internship',
                    ]}
                    label="Engagement Type"
                  />
                </FormFieldWrap>
              </FormFieldRow>

              <FormFieldRow>
                <FormFieldWrap>
                  <TextInput
                    setValue={val => this.setFormFieldValue('website', val)}
                    label="Company website"
                  />
                </FormFieldWrap>
                <FormFieldWrap>
                  <TextInput
                    setValue={val => this.setFormFieldValue('applyURL', val)}
                    label="Send applicants to"
                    placeholder="Email address or website"
                  />
                </FormFieldWrap>
              </FormFieldRow>

              <FormFieldRow>
                <FormFieldWrap>
                  <TextInput
                    setValue={val => this.setFormFieldValue('logoURL', val)}
                    label="Company Logo"
                    placeholder="Public URL of image"
                  />
                </FormFieldWrap>
              </FormFieldRow>

              <Divider />
              <SectionTitle>Purchase your listing</SectionTitle>

              <FormFieldRow>
                <FormFieldWrap>
                  <BodyCopy>
                    Your job listing is <b>$49 USD</b> and and will be posted to
                    our homepage for <b>30 days</b> after you've successfully
                    placed your order.{' '}
                    <span style={{ color: '#FF6748' }}>
                      Please review your listing thoroughly. Listings can't be
                      updated after posting.
                    </span>{' '}
                    If you do find that you need to update after you've
                    submitted a job, please reach out to our support team via
                    the chat widget.
                  </BodyCopy>
                </FormFieldWrap>
              </FormFieldRow>
           
              <Elements>
                <PaymentForm
                  buttonDisabled={!this.state.enablePayment}
                  createListing={paymentId => this.createListing(paymentId)}
                />
              </Elements>
            </FormContainer>
          </PageContainer>
        </Layout>
      </StripeProvider>
    )
  }
}
