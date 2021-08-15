import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {FaGithub, FaTwitter} from 'react-icons/fa';
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if ( isLoading ) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div style={{margin: '1vh 0vw',minHeight: '83vh', display: 'flex',flexDirection:'column', gap: '5rem', alignItems: 'center', paddingTop: '5rem'}}>
        <img src={user.picture} alt={user.name} style={{width: '200px', height: '200px', borderRadius: '50%'}} />
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <h2 className='text-center'>{user.name}</h2>
          <p className='text-center'>{user.email}</p>
        </div>
        <div style={{ width: '15%', minHeight: '4rem', display: 'flex', justifyContent: 'space-evenly'}}>
          <FaGithub size={40}/>
          <FaTwitter size={40} />
        </div>
      </div>
    )
  );
};

export default Profile;
