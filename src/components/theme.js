import styled from 'react-emotion'

export const PageContainer = styled('div')`
  max-width: 800px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 30px;
  padding-right: 30px;

  @media (max-width: 700px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`

export const FormContainer = styled('div')`
  max-width: 600px
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 100px;

`

export const FormFieldRow = styled('div')`
  display: flex;
  margin-bottom: 30px;
`

export const FormFieldWrap = styled('div')`
  padding-left: 12px;
  padding-right: 12px;
  flex: 1;
  position: relative

  ${props => props.alignment};

 
`

export const FlexContainer = styled('div')`
  display: flex;
  height: 100%;

  ${props => props.flexProps};

  @media (max-width: 700px) {
    ${props => props.mobile};

  }
`

export const colors = {
  lightGrey: '#FBFCFD',
  green: '#32E19F',
  darkGreen: '#2DCE91',
  lightPurple: '#F1E9F4',
  darkBlue: '#1C2557',
  red: '#FF6748',
  white: '#FFFFFF',
}
