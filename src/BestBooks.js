import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { Container , Modal, Form} from 'react-bootstrap';
import FormBook from './FormBook';
import axios from 'axios';
import { Row, Col, Carousel, Button } from 'react-bootstrap';
import BookFormModal from './BookFormModal';
import { withAuth0 } from '@auth0/auth0-react';
class MyFavoriteBooks extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
      showForm: false,
      getAfterMounting: false,
      shUpdate: false,
      bookTitle:'',
      bookDesc: '',
      bookStatus: '',
      currId: ''
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
            .then( tar => {
              axios.get( 'https://can-of-books-fe.herokuapp.com/books' )
                .then( res => {
                  return res.data;
                } )
                .then( val => {
                  console.log( val );
                  this.setState( { books: val } );
                } )
                .catch( err => console.log( 'erro fetching books data' ) );
            } )
            .catch( err => console.error( err ) );
        } )
        .catch( err => console.error( err ) );
    }

  }
showForm = () => {
  this.setState( {showForm: true} );
}
hideForm = () => {
  this.setState( {showForm: false, shUpdate: false} );
}
deleteBook = ( e ) => {
  axios.delete( `https://can-of-books-fe.herokuapp.com/books/${e.target.id}` ).then( res => {
    let newBooks = this.state.books.filter( itm => itm._id !== res.data );
    this.setState( {books: newBooks} );
  } ).catch( err => console.error( err ) );
}
addBook = ( arr ) => {
  this.setState( {books: arr} );
}
showUpdateForm = ( e ) => {
  let {title, desc, status} = this.state.books.filter( itm => itm._id === e.target.dataset.x )[0] ;
  this.setState( {shUpdate: true, bookDesc: desc, bookTitle: title, currId:e.target.dataset.x, bookStatus: status } );
}
statusUpdate = ( e ) => {
  this.setState( {bookStatus: e.target.value} );
}
titleUpdate = ( e ) => {
  this.setState( {bookTitle: e.target.value} );
}

descUpdate = ( e ) => {
  this.setState( {bookDesc : e.target.value} );
}
sendUpdate = ( e ) => {

  axios.put( `https://can-of-books-fe.herokuapp.com/books/${this.state.currId}`, {title: this.state.bookTitle, desc: this.state.bookDesc, status: this.state.bookStatus} ).then( res => {
    console.log( res.data );
    this.setState( {books: res.data} );
  } );
}
render() {
  return (
    <>
      <BookFormModal hideForm={this.hideForm} show={this.state.showForm} addBook={this.addBook}/>

      <Modal show={this.state.shUpdate} onHide={( ) => this.setState( {shUpdate: false} )} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update book information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={this.state.bookTitle} onChange={this.titleUpdate} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Describtion</Form.Label>
              <Form.Control as="textarea" rows={3} value={this.state.bookDesc} onChange={this.descUpdate}/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" value={this.state.bookStatus} onChange={this.statusUpdate} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" onClick={( ) => this.setState( {shUpdate: false} )}>
            Close
          </Button>
          <Button variant="primary" onClick={this.sendUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <Row>
          <Col className='pl-0'>
            <Jumbotron style={{ background: 'lightgray' }}>
              <h1 style={{fontFamily: 'Palette Mosaic, cursive'}}>My Favorite Books</h1>
            </Jumbotron>
          </Col>
          <Col align='center' style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
            <Button onClick={this.showForm}>New Book</Button>
          </Col>
        </Row>
        <section style={{ margin: '1vh 0vw', minHeight: '60vh' }}>
          <Container fluid style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
            {this.state.shForm && !this.state.shShoWBooks ? <Row>
              <Col align="center">
                <FormBook sendBook={this.sendBook} />
              </Col>
            </Row>
              : undefined}
            <Carousel style={{marginBottom: '5rem', borderRadius: '15px'}}>
              {this.state.books.length === 0 ?
                <h1 style={{paddingTop: '10rem'}}>No books are available, try adding a book by clicking <strong>New Book</strong></h1> : undefined}
              {this.state.books.map( ( itm, i ) => (

                <Carousel.Item key={i}>
                  <img style={{borderRadius: '10px'}}
                    className="d-block"
                    src={'https://picsum.photos/1400/700'}
                    alt="Third slide"
                  />
                  <Carousel.Caption >
                    <div style={{backgroundColor: 'white', borderRadius: '10px', marginBottom: '3rem', padding: '1rem 1rem', color: 'black'}}>
                      <h3>{itm.title}</h3>
                      <p style={{paddingBottom: '1rem'}}>{itm.desc}</p>
                      <p><strong>{itm.status}</strong></p>
                    </div>
                    <Row>
                      <Col align='start'>
                        <Button className='btn-danger' id={itm._id} onClick={this.deleteBook}>Delete</Button>
                      </Col>
                      <Col align='end'>
                        <Button className='btn-primary' data-x={itm._id} onClick={this.showUpdateForm}>Update book</Button>
                      </Col>
                    </Row>
                  </Carousel.Caption>

                </Carousel.Item>

              ) )}
            </Carousel>
          </Container>
        </section>
      </div>
    </>
  );
}
}

export default withAuth0( MyFavoriteBooks );
