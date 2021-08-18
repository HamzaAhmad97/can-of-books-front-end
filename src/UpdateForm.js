// import React, { Component } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import axios from 'axios';
// import { withAuth0 } from '@auth0/auth0-react';
// export class UpdateForm extends Component {
//   constructor( props ) {
//     super( props );
//     this.state = {
//       title: '',
//       desc: '',
//       email: '',
//       show: this.props.show,
//       trusted: false,
//       bookAdded: false,
//       books: [],
//       empty: false,
//       bookTitle: this.props.bookTitle,
//       bookDesc: this.props.bookDesc,
//     };
//   }
//   componentDidMount() {

//   }

//   render() {
//     return (

//       <Modal show={this.state.show} onHide={() => this.setState( { show: false } )} centered>
//         <Modal.Header closeButton >
//           <Modal.Title>Update book information</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={this.props.hideForm}>
//               Close
//           </Button>
//           <Button variant="primary">
//               Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>

//     );
//   }
// }

// export default withAuth0( UpdateForm );
