import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
export class BookFormModal extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      title: '',
      desc: '',
      email: '',
      status: '',
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
            baseURL: 'https://can-of-books-fe.herokuapp.com',
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
  updateStatus = ( e ) => {
    this.setState( { status: e.target.value } );
  }
  updateDesc = ( e ) => {
    this.setState( { desc: e.target.value } );
  }
  saveBook = ( e ) => {
    this.setState( {empty: false} );
    e.preventDefault();
    let { title, desc, email , status} = this.state;
    if ( title === '' || email === '' ) {
      this.setState( {empty: true} );
      return;
    };
    axios.post( 'https://can-of-books-fe.herokuapp.com/books', { title, desc, email, status } ).then( res => {
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
            <Modal.Title>Add a new book</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder='Elequent JavaScript' onChange={this.updateTitle} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Describtion</Form.Label>
                <Form.Control as="textarea" placeholder='Describe the book briefly ...' rows={3} onChange={this.updateDesc}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Status</Form.Label>
                <Form.Control type="text" placeholder='read' onChange={this.updateStatus} />
              </Form.Group>
            </Form>
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
