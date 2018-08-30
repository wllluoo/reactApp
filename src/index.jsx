import React from 'react';
import ReactDOM from'react-dom'
import { postAuthProvostPaikeChoiceExamSubChoiceNum } from '../swaggerGen/choice-exam-controller';
// 使用 Mock

 
import './index.less';

class HelloMessage extends React.Component {
    componentDidMount() {
      postAuthProvostPaikeChoiceExamSubChoiceNum({
        body: {
            taskId: 5,
        },
        mock: true,
      })

    }
    render() {
      return <div className="app">Hello 1111</div>;
    }
  }
  
ReactDOM.render(
    <HelloMessage name="Taylor" />,
    document.getElementById('app')
);