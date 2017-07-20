import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: []
  }

  componentDidMount = () => {
    this.getBooks()
  }

  getBooks = () => {
    BooksAPI.getAll()
    .then(books => {
      this.setState({ books })
    })
  }

  moveBook = (bookID, shelf) => {
    this.setState((state) => ({
      books: state.books.map((b) => {
        if (b.id === bookID) {
          b.shelf = shelf
        }
        return b
      })
    }))

    BooksAPI.update({id: bookID}, shelf )
  }

  searchBooks = (value) => {
    BooksAPI.search(value)
    .then(books => {
      this.setState({ searchBooks: books })
    })
  }

  render() {
    return (
      <div className="app">
      <Route exact path='/search' render={() => (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to='/'>Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" onKeyUp={(event) => this.searchBooks(event.target.value)}/>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.searchBooks
              .map(book =>
                <Book bookID={book.id} image={book.imageLinks.thumbnail} title={book.title} authors={book.authors}
                shelf={book.shelf} onShelfChange={(bookID, shelf) => {
                  this.moveBook(bookID, shelf)
                }} />
              )}
            </ol>
          </div>
        </div>
      )}/>

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books
                      .filter(book => book.shelf === 'currentlyReading')
                      .map(book =>
                        <Book bookID={book.id} image={book.imageLinks.thumbnail} title={book.title} authors={book.authors}
                        shelf={book.shelf} onShelfChange={(bookID, shelf) => {
                          this.moveBook(bookID, shelf)
                        }} />
                      )}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books
                      .filter(book => book.shelf === 'wantToRead')
                      .map(book =>
                        <Book bookID={book.id} image={book.imageLinks.thumbnail} title={book.title} authors={book.authors}
                        shelf={book.shelf} onShelfChange={(bookID, shelf) => {
                          this.moveBook(bookID, shelf)
                        }} />
                      )}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books
                      .filter(book => book.shelf === 'read')
                      .map(book =>
                        <Book bookID={book.id} image={book.imageLinks.thumbnail} title={book.title} authors={book.authors}
                        shelf={book.shelf} onShelfChange={(bookID, shelf) => {
                          this.moveBook(bookID, shelf)
                        }} />
                      )}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>

      </div>
    )
  }
}

export default BooksApp
