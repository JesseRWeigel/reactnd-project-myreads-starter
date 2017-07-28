import React from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import '../App.css'

class BookList extends React.Component {
  state = {
    shelves: [
      {
        title: 'Currently Reading',
        shelf: 'currentlyReading'
      },
      {
        title: 'Want to Read',
        shelf: 'wantToRead'
      },
      {
        title: 'Read',
        shelf: 'read'
      }
    ]
  }

  render () {
    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            {this.state.shelves.map(shelf =>
              <BookShelf
                key={shelf.shelf}
                title={shelf.title}
                books={this.props.books}
                shelf={shelf.shelf}
                onShelfChange={(bookID, shelf) =>
                  this.props.onShelfChange(bookID, shelf)}
              />
            )}
          </div>
        </div>
        <div className='open-search'>
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookList
