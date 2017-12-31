import React from 'react';

const ListItem = (props) => (
  <div>
    <a href={props.book.url}>{props.book.title}</a>
    <span> by {props.book.author}</span>
  </div>
)

export default ListItem;