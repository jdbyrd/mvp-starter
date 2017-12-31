import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      books: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/books', 
      success: (data) => {
        this.setState({
          books: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>/r/Books Reading List</h1>
      <List books={this.state.books}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));