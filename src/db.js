import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyBnInfpfZd6lGij65TtpOhMB-Mr2LS5MXc',
  authDomain: 'dappgigs.firebaseapp.com',
  databaseURL: 'https://dappgigs.firebaseio.com',
  projectId: 'dappgigs',
  storageBucket: 'dappgigs.appspot.com',
  messagingSenderId: '385809631816',
}

var fire = firebase.initializeApp(config)
export default fire
