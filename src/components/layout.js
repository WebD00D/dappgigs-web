import React, {Component} from 'react'
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
