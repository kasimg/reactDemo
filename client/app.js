import ReactDom from 'react-dom';
// <App>标签实际上是调用了React.createElement方法，所以这里要引入React
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import App from './App.jsx';

// 标签的本质是把里面的内容作为参数传给React.createElement方法
// ReactDom.render(<App/>, document.getElementById('root'));

const root = document.getElementById('root');
const render = (Component) => {
  ReactDom.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    root,
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./App.jsx').default;  //  eslint-disable-line
    // ReactDom.render(<NextApp/>, document.getElementById('root'));
    render(NextApp);
  });
}
