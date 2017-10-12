import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchBooks } from '../actions/books'
import Book from '../components/Book'
import throttle from 'lodash.throttle'
// import './books-list-style.scss'

export class BooksList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      total: props.total,
      books: props.books
    }

    this.listHeight = 0
    this.windowHeight = 0
    this.onScroll = throttle(this.onScroll.bind(this), 33)
    this.fetchMoreItems = this.fetchMoreItems.bind(this)
  }

  componentDidMount() {
    this.props.fetchBooks('search+a')
    this.setHeight()
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.books.length !== this.state.books.length) {
      this.setHeight()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      total: nextProps.total,
      books: [ ...this.state.books, ...nextProps.books ]
    })
  }

  setHeight() {
    this.listHeight = this.list ? this.list.getBoundingClientRect().height : 0
    this.windowHeight = window.innerHeight
  }

  onScroll() {
    const scrollTop = 'scrollY' in window ? window.scrollY : document.documentElement.scrollTop

    if (this.listHeight < scrollTop + this.windowHeight + 400) {
      this.fetchMoreItems()
    }
  }

  fetchMoreItems() {
    if (this.props.isLoading || this.state.books.length === this.state.total) return
    this.props.fetchBooks('search+a')
  }

  render() {
    const { isLoading } = this.props
    const { books } = this.state

    return (
      <div>
        <h1 className='bookList__title'> Find your next adventure </h1>
        <ul className='bookList__list' ref={el => this.listHeight = el}>
          {books.length !== 0 && books.map((book, i) =>
            <Book
              key={i}
              id={book.id}
              title={book.volumeInfo.title}
              authors={book.volumeInfo.authors}
              pubDate={book.volumeInfo.publishedDate}
              imgs={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks}
              categories={book.volumeInfo.categories && book.volumeInfo.categories}
            />
          )}
        </ul>

        {isLoading && <p>More books for you coming..</p>}
      </div>
    )
  }
}

BooksList.propsType = {
  books: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchBooks: PropTypes.func
}

function mapStateToProps({ booksList }) {
  return {
    isLoading: booksList.isLoading,
    books: booksList.books,
    total: booksList.total
  }
}

export default connect(mapStateToProps, { fetchBooks })(BooksList)
