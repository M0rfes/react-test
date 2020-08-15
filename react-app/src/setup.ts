import * as firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyBT_YYgC-KatF_OlzabgAKCRpDWRuxEfM8',
  authDomain: 'react-test-b9bd9.firebaseapp.com',
  databaseURL: 'https://react-test-b9bd9.firebaseio.com',
  projectId: 'react-test-b9bd9',
  storageBucket: 'react-test-b9bd9.appspot.com',
  messagingSenderId: '102643494592',
  appId: '1:102643494592:web:6a6bae282935c08aab4725',
  measurementId: 'G-6V10MHG5W7',
};

export const connection = firebase.initializeApp(firebaseConfig);
