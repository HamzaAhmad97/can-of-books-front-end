import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import './Login.css';
import LoginButton from './LoginButton';
class Login extends React.Component {
  render() {
    return (
      <div style={{margin: '1vh 0vw',minHeight: '60vh'}}>
        <h1 style={{width: '100%', textAlign: 'center', margin: '7rem 0'}}>You are a step away from unlocking the mysteries of the universe, and to become a better person.</h1>
        <Card style={{ width: '25vw', minHeight: '25vh', position: 'absolute', top: '35%', left: '37%', borderRadius: '15px' }}>
          <Card.Body style={{display: 'flex', flexDirection: 'column',padding: '30%' }}>
            <Card.Title>Start by logging in</Card.Title>
            <LoginButton />
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Login;
