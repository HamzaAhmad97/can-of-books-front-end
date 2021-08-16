import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
export default class FormBook extends Component {
  constructor(){
    super();
    this.state = {
      title: '',
      desc: '',
    };
  }
  changeTitle = ( e ) => {
    this.setState( {title: e.target.value} );
    console.log( e.target.value );
  }
  changeDesc = ( e ) => {
    this.setState( {desc: e.target.value} );
  }
  submit = ( e ) => {
    e.preventDefault();
    console.log( e.target.value );
    this.props.sendBook( this.state );
  }
  render() {
    return (
      <form onSubmit={this.submit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
        <p>Please enter the book information</p>
        <fieldset style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <input type='text' placeholder='Title' onChange={this.changeTitle}></input>
          <input type='text' placeholder='Description' onChange={this.changeDesc}></input>
        </fieldset>
        <button type='submit'>Submit</button>
      </form>
    );
  }
}

