import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { Container } from 'react-bootstrap';
import FormBook from './FormBook';
import axios from 'axios';
import { Row, Col, Carousel } from 'react-bootstrap';
class MyFavoriteBooks extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
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

  render() {
    return (
      <div>
        <Jumbotron style={{ background: 'lightgray' }}>
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
          </p>
        </Jumbotron>
        <section style={{ margin: '1vh 0vw', minHeight: '60vh' }}>
          <Container fluid style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
            {this.state.shForm && !this.state.shShoWBooks ? <Row>
              <Col align="center">
                <FormBook sendBook={this.sendBook} />
              </Col>
            </Row>
              : undefined}
            <Carousel>

              {this.state.books.map( ( itm, i ) => (

                <Carousel.Item key={i}>
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

              ) )}
            </Carousel>
          </Container>
        </section>
      </div>
    );
  }
}

export default MyFavoriteBooks;
