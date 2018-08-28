import React from 'react';
import ReactDOM from'react-dom'
import './index.less';

class HelloMessage extends React.Component {
    render() {
      return <div className="app">Hello 1111</div>;
    }
  }
  
ReactDOM.render(
    <HelloMessage name="Taylor" />,
    document.getElementById('app')
);