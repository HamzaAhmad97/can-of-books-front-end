import React from 'react';
import { FaGithub, FaTwitter } from 'react-icons/fa';
//import { Auth0Provider } from '@auth0/auth0-react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';


class Profile extends React.Component {

  componentDidMount() {
    if ( this.props.auth0.isAuthenticated ) {
      this.props.auth0.getIdTokenClaims()
        .then( res => {
          const jwt = res.__raw;
          const config = {
            headers: { 'Authorization': `Bearer ${jwt}` },
            method: 'get',
            baseURL: 'http://localhost:3001',
            url: '/authorize'
          };
          axios( config )
            .then( axiosResults => console.log( axiosResults.data ) ) //getting user information
            .catch( err => console.error( err ) );
        } )
        .catch( err => console.error( err ) );
    }
  }


  render() {
    return (
      <>
        {this.props.auth0.isAuthenticated ?
          <div style={{ margin: '1vh 0vw', minHeight: '83vh', display: 'flex', flexDirection: 'column', gap: '5rem', alignItems: 'center', paddingTop: '5rem' }}>
            <img src={this.props.auth0.user.picture} alt={this.props.auth0.user.name} style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h2 className='text-center'>{this.props.auth0.user.name}</h2>
              <p className='text-center'>{this.props.auth0.user.email}</p>
            </div>
            <div style={{ width: '15%', minHeight: '4rem', display: 'flex', justifyContent: 'space-evenly' }}>
              <FaGithub size={40} />
              <FaTwitter size={40} />
            </div>
          </div> : undefined}
      </>
    );
  };
}
export default withAuth0( Profile );
