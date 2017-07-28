import React from 'react'
import { Route } from 'react-router-dom'
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

  clearState = () => {
    this.setState({ books: [] })
  }

  // searchBooks = value => {
  //   BooksAPI.search(value).then(books => {
  //     this.setState({searchResults: books})
  //   })
  // }

  searchBooks = value => {
    BooksAPI.search(value).then(books => {
      if (books.error || !books) return

      const adjustedSearchResults = books.map(book => {
        const existingBook = this.state.books.find(b => b.id === book.id)
        book.shelf = existingBook ? existingBook.shelf : 'none'
        return book
      })

      this.setState({ searchResults: adjustedSearchResults })
    })
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
