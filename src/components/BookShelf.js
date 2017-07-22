import React from 'react'
import Book from './Book'
import '../App.css'

const BookShelf = (props) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books && props.books.length > 0 && props.books
          .filter(book => book.shelf === props.shelf)
          .map(book =>
            <li key={book.id + book.title}>
              <Book bookID={book.id} image={book.imageLinks && book.imageLinks.thumbnail} title={book.title} authors={book.authors}
                shelf={book.shelf} onShelfChange={(bookID, shelf) => props.onShelfChange(bookID, shelf)}/>
            </li>
          )}
      </ol>
    </div>
  </div>
)

export default BookShelf
