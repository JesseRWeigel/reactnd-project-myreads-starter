import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import '../App.css'

const BookSearch = props =>
  <div className='search-books'>
    <div className='search-books-bar'>
      <Link className='close-search' to='/'>
        Close
      </Link>
      <div className='search-books-input-wrapper'>
        <input
          type='text'
          placeholder='Search by title or author'
          onKeyUp={event => props.searchBooks(event.target.value)}
        />
      </div>
    </div>
    <div className='search-books-results'>
      <ol className='books-grid'>
        {props.books &&
          props.books.length > 0 &&
          props.books.map(book =>
            <li key={book.id + book.title}>
              <Book
                bookID={book.id}
                image={book.imageLinks && book.imageLinks.thumbnail}
                title={book.title}
                authors={book.authors}
                shelf={book.shelf}
                onShelfChange={(bookID, shelf) =>
                  props.onShelfChange(bookID, shelf)}
              />
            </li>
          )}
      </ol>
    </div>
  </div>

export default BookSearch
