import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
export class BookFormModal extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      title: '',
      desc: '',
      email: '',
      show: this.props.show,
      trusted: false,
      bookAdded: false,
      books: [],
      empty: false,
    };
  }
  componentDidMount() {
    if ( this.props.auth0.isAuthenticated ) {
      this.props.auth0.getIdTokenClaims()
        .then( res => {
          const jwt = res.__raw;
          const config = {
            headers: { 'Authorization': `Bearer ${jwt}` },
            method: 'get',
            baseURL: 'https://can-of-books-fe.herokuapp.com/',
            url: '/authorize'
          };
          axios( config )
            .then( axiosResults => {
              this.setState( { email: axiosResults.data.email, trusted: true } );
            } )
            .catch( err => console.error( err ) );
        } )
        .catch( err => console.error( err ) );
    }
  }
  hideForm = () => {
    this.props.hideForm();
  }
  updateTitle = ( e ) => {
    this.setState( { title: e.target.value } );
  }

  updateDesc = ( e ) => {
    this.setState( { desc: e.target.value } );
  }
  saveBook = ( e ) => {
    this.setState( {empty: false} );
    e.preventDefault();
    let { title, desc, email } = this.state;
    if ( title === '' || email === '' ) {
      this.setState( {empty: true} );
      return;
    };
    axios.post( 'https://can-of-books-fe.herokuapp.com/books', { title, desc, email } ).then( res => {
      this.setState( { bookAdded: true } );
      axios.get( 'https://can-of-books-fe.herokuapp.com/books' )
        .then( res => {
          return res.data;
        } )
        .then( val => {
          this.setState( { books: val } );
          this.props.addBook( this.state.books );
        } )
        .catch( err => console.log( 'erro fetching books data' ) );
    } ).catch( err => console.error( err ) );
  }
  render() {
    return (
      <>
        <Modal show={this.state.show || this.props.show} onHide={() => this.setState( { show: false, bookAdded: false } )} centered rounded >
          <Modal.Header >
            <h2 style={{ textAlign: 'center', width: '100%' }}>Add a new book</h2>
          </Modal.Header>

          <Modal.Body>
            <form style={{ padding: '0', fontSize: '2rem', gap: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <label style={{ alignSelf: 'start', color: 'blue' }} htmlFor='title'>Book title</label>
                <input style={{ padding: '0 0.5rem', width: '100%', fontSize: '1rem' }} id='title' type='text' placeholder='Elequent JavaScript' onChange={this.updateTitle}></input>
              </div>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <label style={{ alignSelf: 'start', color: 'blue' }} htmlFor='desc'>Description</label>
                <textarea cols='45' rows='5' style={{ padding: '0 0.5rem', resize: 'none', width: '100%', fontSize: '1rem' }} id='desc' placeholder='Describe the book briefly ...' onChange={this.updateDesc}></textarea>
              </div>
            </form>
          </Modal.Body>
          <p style={{ textAlign: 'center' }}>Client is {this.state.trusted ? 'trusted' : 'not trusted'}</p>
          <p style={{ color: 'green', fontWeight: 'bold', textAlign: 'center', opacity: `${this.state.bookAdded ? '1' : '0'}` }}>{this.state.empty ? 'Come on man, get real!' : 'Success'}</p>
          <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center', display: `${this.state.empty ? 'block' : 'none'}` }}>Come on man!</p>
          <Modal.Footer>
            <Button onClick={this.props.hideForm} variant="primary">Close</Button>
            <Button onClick={this.saveBook} variant="secondary">Done</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withAuth0( BookFormModal );
