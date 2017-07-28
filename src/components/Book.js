import React from 'react'
import '../App.css'

const Book = props =>
  <div className='book'>
    <div className='book-top'>
      <div
        className='book-cover'
        style={{
          width: 128,
          height: 193,
          backgroundImage: `url("${props.image}")`
        }}
      />
      <div className='book-shelf-changer'>
        <select
          value={props.shelf}
          onChange={event =>
            props.onShelfChange(props.book, event.target.value)}
        >
          <option value='none' disabled>
            Move to...
          </option>
          <option value='currentlyReading'>Currently Reading</option>
          <option value='wantToRead'>Want to Read</option>
          <option value='read'>Read</option>
          <option value='none'>None</option>
        </select>
      </div>
    </div>
    <div className='book-title'>
      {props.title}
    </div>
    <div className='book-authors'>
      {props.authors &&
        props.authors.map(author =>
          <span key={author + props.bookID} style={{ display: 'block' }}>
            {author}
          </span>
        )}
    </div>
  </div>

export default Book
