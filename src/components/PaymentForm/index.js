import React, { Component } from 'react'
import { Link } from 'gatsby'
import styled from 'react-emotion'

import Layout from '../../components/layout'

import TextInput from '../TextInput'
import Textarea from '../Textarea'
import Button from '../Button'
import Checkbox from '../Checkbox'
import Select from '../Select'

import { FormFieldRow, FormFieldWrap } from '../theme'

import {
  injectStripe,
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from 'react-stripe-elements'

const PoweredByStripe = styled('img')`
  position: absolute;
  height: 20px;
  right: 12px;
  margin-top: 0px;
`

const PaymentFormWrap = styled('div')`
  margin-bottom: 30px;
`

class PaymentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitting: false,
      error: false,
    }

    this.createStripeToken = this.createStripeToken.bind(this)
  }

  createStripeToken() {
    this.setState({
      submitting: true,
      error: false,
    })
    this.props.stripe.createToken().then(({ token }) => {
      if (!token) {
        this.setState({
          submitting: false,
          error: true,
        })
        return
      }

      const prodURL = 'https://embeddable-api.herokuapp.com/dappgigs-payment'
      const devURL = 'http://localhost:8081/dappgigs-payment'

      fetch(`${prodURL}?token=${token.id}`)
        .then(function(response) {
          return response.json()
        })
        .then(paymentDetails => {
          if (paymentDetails !== 'payment error') {
            this.props.createListing(paymentDetails.id)
            this.setState({
              submitting: false,
              error: false,
            })
          } else {
            this.setState({
              submitting: false,
              error: true,
            })
          }
        })
        .catch(
          function(e) {
            this.setState({
              submitting: false,
              error: true,
            })
          }.bind(this)
        )
    })
  }

  render() {
    return (
      <div>
        <PaymentFormWrap>
          <FormFieldRow>
            <FormFieldWrap>
              <CardElement className="dappgigs-input" />
            </FormFieldWrap>
          </FormFieldRow>
        </PaymentFormWrap>

        <FormFieldRow>
          <FormFieldWrap>
            <Button
              handleClick={() => this.createStripeToken()}
              label={
                this.state.submitting
                  ? 'Submitting...'
                  : 'Look good? Send it live!'
              }
              bg="#32E19F"
              color="#FFF"
              hoverBg="#2DCE91"
              disabled={this.props.buttonDisabled || this.state.submitting}
            />
          </FormFieldWrap>
          <FormFieldWrap>
            <PoweredByStripe
              src={require('../../images/powered_by_stripe_outline@2x.png')}
            />
          </FormFieldWrap>
        </FormFieldRow>
        {this.state.error ? (
          <FormFieldRow>
            <FormFieldWrap>
              <small style={{ color: '#FF6748', fontFamily: 'Circular Std' }}>
                There was an error processing your payment. Please make sure your card is valid, and all fields are completed.
              </small>
            </FormFieldWrap>
          </FormFieldRow>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default injectStripe(PaymentForm)
