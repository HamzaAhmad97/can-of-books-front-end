import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Card';
import './Login.css';
import LoginButton from './LoginButton';
class Login extends React.Component {
  render() {
    return (
      <div style={{position:'relative', margin: 'auto', minHeight: '85vh', backgroundImage: 'url(https://ak.picdn.net/shutterstock/videos/29758747/thumb/1.jpg)', backgroundSize: 'cover', display: 'flex' }}>
        <h2 style={{position: 'absolute', top: '0', left: '0', padding: '3rem', fontFamily: 'Palette Mosaic, cursive', fontSize: '3rem', color: 'white', textAlign: 'center', width: '100%', paddingTop: '9rem'}}>Unlock the mysteries of the universe</h2>
        <Col align='center'><LoginButton /></Col>

      </div>
    );
  }
}

export default Login;
