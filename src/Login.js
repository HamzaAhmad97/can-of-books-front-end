import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Card';
import './Login.css';
import LoginButton from './LoginButton';
class Login extends React.Component {
  render() {
    return (
      <div style={{ margin: 'auto', minHeight: '60vh', backgroundImage: 'url(https://images.unsplash.com/photo-1585862705417-671ae64f0eb7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBib29rc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80)' }}>
        <h1 style={{ color: 'white', padding: '1rem',paddingTop: '5rem', width: '100%', textAlign: 'center', margin: '7rem 0',fontFamily: 'Playfair Display, serif' }}>You are a step away from unlocking the mysteries of the universe, and to become a better person.</h1>
        <Col align='center' style={{width: '10%'}}><LoginButton /></Col>

      </div>
    );
  }
}

export default Login;
