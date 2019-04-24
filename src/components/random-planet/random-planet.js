import React, {Component} from 'react';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';

import './random-planet.css';

// компонент занимается логикой
export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true
    // id: null,
    // name: null,
    // population: null,
    // rotationPeriod: null,
    // diameter: null
  };

  // компонент "подключен" (DOM элементы уже на странице)
  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 5000);
  }

  // Для очистки ресурсов (таймеры, интервалы, запросы к серверу) перед удалением компонента. В момент вызова, DOM все еще содержит компонент
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false
    });
  };

  onError = (err) => {
    this.setState({
      loading: false,
      error: true
    })
  };

  updatePlanet = () => {
    // генерируем id от 2 до 19
    const id = Math.floor(Math.random() * 17) + 2;
    // const id = 12000;
    this.swapiService
        .getPlanet(id)
        .then(this.onPlanetLoaded)
        .catch(this.onError);
    // обновляем состояние компонента
    // .then((planet) => {
    // this.setState({
    //   id,
    //   name: planet.name,
    //   population: planet.population,
    //   rotationPeriod: planet.rotation_period,
    //   diameter: planet.diameter
    // });
    // })
    // .catch((err) => {
    //   console.error('Could not fetch', err);
    // });
  };


  render() {
    const {planet, loading, error} = this.state;
    // const {id, name, population, rotationPeriod, diameter} = this.state;


    // есть данные тогда, когда нет ни загрузи ни ошибки
    // (loading || error) вернет false когда оба false
    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator/> : null;

    // if (loading) {
    //   return <Spinner/>
    // }

    // null в jsx игнорируется
    const spinner = loading ? <Spinner/> : null;
    const content = hasData ? <PlanetView planet={planet}/> : null;

    return (
        <div className="random-planet jumbotron rounded">
          {errorMessage}
          {spinner}
          {content}
        </div>

    );
  }
}

// компонент занимается отрисовкой
const PlanetView = ({planet}) => {

  const {
    id, name, population,
    rotationPeriod, diameter
  } = planet;

  return (
      <React.Fragment>
        <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
             alt="planet"/>
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </React.Fragment>
  );
};