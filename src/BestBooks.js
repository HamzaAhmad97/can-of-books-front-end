import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import {Card, Container} from 'react-bootstrap';
import books from './books.json';
class MyFavoriteBooks extends React.Component {
  render() {
    return(
      <div>
        <Jumbotron style={{ background: 'lightgray'}}>
          <h1>My Favorite Books</h1>
          <p>
          This is a collection of my favorite books
          </p>
        </Jumbotron>
        <section style={{margin: '1vh 0vw',minHeight: '60vh'}}>
          <Container fluid style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap:'2rem', justifyContent: 'center'}}>
            {books.map( ( itm, i ) => (

              <Card style={{ width: '18rem' }} className="col-lg-2 border reounded pt-3 pb-1">
                <Card.Img variant="top" src={itm.src} />
                <Card.Body>
                  <Card.Title style={{fontWeight: 'bold'}}>{itm.title}</Card.Title>
                  <Card.Text>
                    {itm.Author}
                  </Card.Text>
                </Card.Body>
              </Card>

            ) )}
          </Container>
        </section>
      </div>
    );
  }
}

export default MyFavoriteBooks;
