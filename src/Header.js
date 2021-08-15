import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './Header.css';
import { withAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import { BsBookHalf } from 'react-icons/bs';
class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ padding: '0.5% 8vw', display: 'flex', justifyContent: 'space-between' }}>

        <Navbar.Brand>Booklify <BsBookHalf /> </Navbar.Brand>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', gap: '1rem' }}>

          {this.props.auth0.isAuthenticated ? <Link to="/">Home</Link> : undefined}
          {this.props.auth0.isAuthenticated ? <Link to="/profile">Profile</Link> : undefined}
          {this.props.auth0.isAuthenticated ? <LogoutButton /> : <LoginButton />}

        </div>
      </Navbar>
    );
  }
}

export default withAuth0( Header );
