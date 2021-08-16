import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { Container } from 'react-bootstrap';
//import books from './books.json';
import FormBook from './FormBook';
import axios from 'axios';
import { Button, Row, Col, Carousel } from 'react-bootstrap';
class MyFavoriteBooks extends React.Component {
  constructor() {
    super();
    this.state = {
      books: {},
      shForm: true,
      shShoWBooks: true,
    };
  }
  getBooks = ( e ) => {
    e.preventDefault();
    this.setState( { shForm: false } );
    axios.get( 'https://can-of-books-fe.herokuapp.com/books' )
      .then( res => {
        return res.data;
      } )
      .then( val => {
        this.setState( { books: val } );
      } )
      .catch( err => console.log( 'erro fetching books data' ) );
  }
  showForm = ( e ) => {
    this.setState( { shForm: true, shShoWBooks: false } );
  }
  sendBook = ( obj ) => {
    console.log( obj );
    let {title, desc} = obj;
    axios.get( `https://can-of-books-fe.herokuapp.com/saveBook?title=${title}&description=${desc}&status=available&email=h.radiahmad@gmail.com` ).then( res => {
      alert( 'Book was added successfully!' );
    } ).catch( err => console.log( 'a problem occured, book can not be added' ) );
  }
  render() {
    return (
      <div>
        <Jumbotron style={{ background: 'lightgray' }}>
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
          </p>
        </Jumbotron>
        <Row className='mb-5 mt-5 pt-5'>
          <Col align="center">
            <Button onClick={this.getBooks} >Show Books</Button>
          </Col>
          <Col align='center'>
            <Button onClick={this.showForm} >Add a book</Button>
          </Col>
        </Row>

        <section style={{ margin: '1vh 0vw', minHeight: '60vh' }}>
          <Container fluid style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
            {this.state.shForm && !this.state.shShoWBooks ? <Row>
              <Col align="center">
                <FormBook sendBook={this.sendBook}/>
              </Col>
            </Row>
              : undefined}
            <Carousel>

              {Object.keys( this.state.books ).length && !this.state.shForm ? this.state.books.map( ( itm, i ) => (

                <Carousel.Item>
                  <img
                    className="d-block"
                    src={'https://cdn.theatlantic.com/thumbor/TC0sl8v8RLnQOcnRn6frkbAFR18=/1223x532:3164x1543/960x500/media/img/mt/2016/03/RTX283V4/original.jpg'}
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <h3>{itm.title}</h3>
                    <p>{itm.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>

              ) ) : undefined}
            </Carousel>
          </Container>
        </section>
      </div>
    );
  }
}

export default MyFavoriteBooks;
