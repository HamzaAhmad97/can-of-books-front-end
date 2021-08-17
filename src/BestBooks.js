import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { Container } from 'react-bootstrap';
import FormBook from './FormBook';
import axios from 'axios';
import { Row, Col, Carousel, Button } from 'react-bootstrap';
import BookFormModal from './BookFormModal';
class MyFavoriteBooks extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
      showForm: false,
      getAfterMounting: false,
    };
  }

  componentDidMount() {
    axios.get( 'http://localhost:3001/books' )
      .then( res => {
        return res.data;
      } )
      .then( val => {
        this.setState( { books: val } );
      } )
      .catch( err => console.log( 'erro fetching books data' ) );
  }
showForm = () => {
  this.setState( {showForm: true} );
}
hideForm = () => {
  this.setState( {showForm: false} );
}
deleteBook = ( e ) => {
  axios.delete( `http://localhost:3001/books/${e.target.id}` ).then( res => {
    let newBooks = this.state.books.filter( itm => itm._id !== res.data );
    this.setState( {books: newBooks} );
  } ).catch( err => console.error( err ) );
}
addBook = ( arr ) => {
  this.setState( {books: arr} );
}

render() {
  return (
    <>
      <BookFormModal hideForm={this.hideForm} show={this.state.showForm} addBook={this.addBook}/>
      <div>
        <Row>
          <Col >
            <Jumbotron style={{ background: 'lightgray' }}>
              <h1>My Favorite Books</h1>
              <p>
            This is a collection of my favorite books
              </p>
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

              {this.state.books.map( ( itm, i ) => (

                <Carousel.Item key={i}>
                  <img style={{borderRadius: '10px'}}
                    className="d-block"
                    src={'https://picsum.photos/1150/700'}
                    alt="Third slide"
                  />
                  <Carousel.Caption >
                    <div style={{backgroundColor: 'white', borderRadius: '10px', marginBottom: '3rem', padding: '1rem 1rem', color: 'black'}}>
                      <h3>{itm.title}</h3>
                      <p>{itm.desc}</p>
                    </div>
                    <Col align='end'>
                      <Button className='btn-danger' id={itm._id} onClick={this.deleteBook}>Delete book</Button>
                    </Col>
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

export default MyFavoriteBooks;
