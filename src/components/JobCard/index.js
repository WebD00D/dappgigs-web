import React from 'react'
import styled from 'react-emotion'
import { Link } from 'gatsby'
import moment from 'moment'


const JobCardWrap = styled('div')`
  display: flex;
  align-items: center;
  padding: 18px;
  width: 100%;
  position: relative;

  background: #ffffff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  background-color: #fff;
  transition: 0.2s ease;

  &:hover {
    opacity: 0.7;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.05);
  }
`

const CompanyLogo = styled('div')`
  min-width: 150px;
  min-height: 150px;
  max-width: 150px;
  max-height: 150px;
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
`

const CompanyDeets = styled('div')`
  display: flex;
  flex-direction: column;
  padding-right: 30px;

  h2 {
    color: #1c2557;
    font-family: Circular Std;
    font-weight: 500;
    margin-bottom: 12px;
  }

  h3 {
    color: #cbcbcb;
    font-family: Circular Std;
    font-weight: 500;
    margin-bottom: 12px;
    font-size: 16px;
  }

  h4 {
    color: #cbcbcb;
    font-family: Circular Std;
    font-weight: 500;
    margin-bottom: 12px;
    font-size: 14px;
  }
`

const Posted = styled('div')`
  position: absolute;
  right: 18px;
  top: 18px;

  color: #cbcbcb;
  font-family: Circular Std;
  font-weight: 500;
  margin-bottom: 0px;
  font-size: 14px;
`

const makeTime = (time) => {
    const postDate = moment(time);
    const now = moment(Date.now());
    return postDate.from(now);
}

const JobCard = (props) => (
  <Link style={{textDecoration: "none", width: "100%"}} to={`/gig?dg=${props.id}`}>
    <JobCardWrap>
      <CompanyLogo>
        <img
          src={props.fields.fields.logoURL}
        />
      </CompanyLogo>
      <CompanyDeets>
        <Posted>{makeTime(props.fields.postedOn)}</Posted>
        <h2>{props.fields.fields.position}</h2>
        <h3>{props.fields.fields.company}</h3>
        <h4>{props.fields.fields.location} {props.fields.fields.remote ? 'or Remote' : '' }</h4>
      </CompanyDeets>
    </JobCardWrap>
  </Link>
)

export default JobCard
