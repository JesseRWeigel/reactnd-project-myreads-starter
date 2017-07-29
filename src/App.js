import React from 'react'
import { Route } from 'react-router-dom'
import debounce from 'lodash.debounce'
import * as BooksAPI from './BooksAPI'
import BookSearch from './components/BookSearch'
import BookList from './components/BookList'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: []
  }

  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  moveBook = (book, shelf) => {
    book.shelf = shelf
    this.setState(state => ({
      books: state.books.filter(b => b.id !== book.id).concat([book])
    }))
    BooksAPI.update(book, shelf)
  }

  debouncedSearch = value => {
    BooksAPI.search(value).then(books => {
      if (!books || books.error) return

      const adjustedSearchResults = books.map(book => {
        const existingBook = this.state.books.find(b => b.id === book.id)
        book.shelf = existingBook ? existingBook.shelf : 'none'
        return book
      })

      this.setState({ searchResults: adjustedSearchResults })
    })
  }

  debouncer = debounce(this.debouncedSearch, 200)

  searchBooks = value => {
    this.debouncer(value)
  }

  render () {
    return (
      <div className='app'>
        <Route
          exact
          path='/search'
          render={() =>
            <BookSearch
              onShelfChange={(book, shelf) => {
                this.moveBook(book, shelf)
              }}
              books={this.state.searchResults}
              clearState={this.clearState}
              searchBooks={value => this.searchBooks(value)}
            />}
        />

        <Route
          exact
          path='/'
          render={() =>
            <BookList
              books={this.state.books}
              getBooks={this.getBooks}
              onShelfChange={(book, shelf) => {
                this.moveBook(book, shelf)
              }}
            />}
        />
      </div>
    )
  }
}

export default BooksApp
