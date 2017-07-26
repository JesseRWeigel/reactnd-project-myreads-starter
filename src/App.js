import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookSearch from './components/BookSearch'
import BookList from './components/BookList'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount = () => {
    this.getBooks()
  }

  getBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  moveBook = (bookID, shelf) => {
    this.setState(state => ({
      books: state.books.map(b => {
        if (b.id === bookID) {
          b.shelf = shelf
        }
        return b
      })
    }))

    BooksAPI.update({ id: bookID }, shelf)
  }

  render () {
    return (
      <div className='app'>
        <Route
          exact
          path='/search'
          render={() =>
            <BookSearch
              onShelfChange={(bookID, shelf) => {
                this.moveBook(bookID, shelf)
              }}
              books={this.state.books}
            />}
        />

        <Route
          exact
          path='/'
          render={() =>
            <BookList
              books={this.state.books}
              getBooks={this.getBooks}
              onShelfChange={(bookID, shelf) => {
                this.moveBook(bookID, shelf)
              }}
            />}
        />
      </div>
    )
  }
}

export default BooksApp
