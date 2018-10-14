import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, navigate, Link } from 'gatsby'

import './layout.css'

import styled from 'react-emotion'

import TextInput from '../components/TextInput'
import Textarea from '../components/Textarea'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import Select from '../components/Select'

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

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content: 'Join a team building for a decentralized future.',
            },
            { name: 'keywords', content: 'dapp, crypto, ' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <div>
          <Navigation>
            <Logo to="/">
              <img src={require('../images/Logo_1@2x.png')} />
              dappgigs
            </Logo>
            <Links>
            <ButtonContainer>

            </ButtonContainer>
              <Button
                handleClick={() => navigate("/listing")}
                label="Post a listing for $49"
                bg="#32E19F"
                color="#FFF"
                hoverBg="#2DCE91"
              />
            </Links>
          </Navigation>
          {children}
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
