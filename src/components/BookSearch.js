import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import '../App.css'

class BookSearch extends React.Component {
  componentDidMount = () => {
    this.props.clearState()
  }

  render () {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link className='close-search' to='/'>
            Close
          </Link>
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              placeholder='Search by title or author'
              onKeyUp={event => this.props.searchBooks(event.target.value)}
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {this.props.books &&
              this.props.books.length > 0 &&
              this.props.books.map((book, i) =>
                <li key={book.id + book.title + i}>
                  <Book
                    bookID={book.id}
                    image={book.imageLinks && book.imageLinks.thumbnail}
                    title={book.title}
                    authors={book.authors}
                    shelf={book.shelf}
                    onShelfChange={(bookID, shelf) =>
                      this.props.onShelfChange(bookID, shelf)}
                  />
                </li>
              )}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch
