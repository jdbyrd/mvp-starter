import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> This Week </h4>
    There are { props.books.length } books.
    { props.books.map(book => <ListItem book={book}/>)}
  </div>
)

export default List;