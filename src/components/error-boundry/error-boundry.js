import React, {Component} from 'react';

import ErrorIndicator from '../error-indicator/error-indicator';

export default class ErrorBoundry extends Component {
  state = {
    error: false
  };

  // работает для ошибок рендеринга и для ошибок жизненного цикла компонента (или ниже по иерархии). Не отлавливают
  // ошибки в event listener'ах и в асинхронном коде (запросы к серверу и т.п.)
  // componentDidCatch(error, info) {
  componentDidCatch() {
    // debugger;
    this.setState({
      error: true
    });
  }

  render() {

    if (this.state.error) {
      return <ErrorIndicator/>
    }

    return this.props.children;
  }
}
