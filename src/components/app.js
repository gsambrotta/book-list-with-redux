import React, { Component } from 'react'
import BooksList from '../containers/BooksList'
import './app.css';

export default class App extends Component {
  render () {
    return (
      <div className='main'>
        <BooksList />
      </div>
    )
  }
}
