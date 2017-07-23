import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
import '../App.css'

class BookSearch extends React.Component {
  state = {
    books: []
  }

  searchBooks = value => {
    BooksAPI.search(value).then(books => {
      this.setState({ books })
    })
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
              onKeyUp={event => this.searchBooks(event.target.value)}
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {this.state.books &&
              this.state.books.length > 0 &&
              this.state.books.map(book =>
                <li key={book.id + book.title}>
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
