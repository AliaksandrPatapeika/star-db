import React, {Component} from 'react';

import Spinner from "../spinner";
import ErrorIndicator from '../error-indicator';

// Часть отвечает за логику работы с сетью
const withData = (View, getData) => {
  // анонимный компонент
  return class extends Component {

    // swapiService = new SwapiService();

    state = {
      data: null
    };

    // хорошее место получать данные
    componentDidMount() {
      // вынесли получение данных наружу из компонента (компонент стал независимым от источника данных), т.к. это то что
      // отличало бы компоненты personList,
      // planetList
      // и т.д. и сделали компонент общим. Ф-я getData возвращает промис

      // this.swapiService
      //     .getAllPeople()
      getData()
          .then((data) => {
            this.setState({
              data
            });
            // TODO catch error как в RandomPlanet
          });
    }

    render() {
      const {data} = this.state;

      // TODO Spinner как в random planet или в person detail
      if (!data) {
        return <Spinner/>
      }

      return <View {...this.props} data={data}/>;
    }
  };
};

export default withData;