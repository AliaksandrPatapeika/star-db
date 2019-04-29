import React, {Component} from 'react';

import Spinner from "../spinner";
import ErrorIndicator from '../error-indicator';

// Часть отвечает за логику работы с сетью
// компонент оборачивает основной компонент,
// View любой компонент, getData - функция которая получает данные
const withData = (View) => {
  // анонимный компонент
  return class extends Component {

    // swapiService = new SwapiService();

    state = {
      data: null,
      loading: true,
      error: false
    };

    componentDidUpdate(prevProps) {
      if (this.props.getData !== prevProps.getData) {
        this.update();
      }
    }

    // хорошее место получать данные
    componentDidMount() {
      this.update();
    }

    update() {
      this.setState({
        loading: true,
        error: false
      });
      // вынесли получение данных наружу из компонента (компонент стал независимым от источника данных), т.к. это то что
      // отличало бы компоненты personList,
      // planetList
      // и т.д. и сделали компонент общим. Ф-я getData возвращает промис

      // this.swapiService
      //     .getAllPeople()
      this.props.getData()
          .then((data) => {
            this.setState({
              data,
              loading: false
            });
          })
          .catch(() => {
            this.setState({
              error: true,
              loading: false
            });
          });
    }

    render() {
      const {data, loading, error} = this.state;

      // TODO Spinner как в random planet или в person detail
      if (loading) {
        return <Spinner/>
      }

      if (error) {
        return <ErrorIndicator/>;
      }

      // object spread operator, работает как Object.assign, получаем новый объект со всеми свойствами из this.props
      return <View {...this.props} data={data}/>;
    }
  };
};

export default withData;