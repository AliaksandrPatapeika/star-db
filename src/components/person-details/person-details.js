import React, {Component} from 'react';

import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import './person-details.css';

export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    person: {},
    loading: true
  };

  componentDidMount() {
    this.updatePerson();
  }

  onPersonLoaded = (person) => {
    this.setState({
      person,
      loading: false
    });
  };

  onLoading() {
    this.setState({
      loading: true
    });
  };

  // срабатывает после того как компонент обновился и отрендерился (получил новые свойства или state). Вызывается после
  // render(). В
  // нем хорошо запрашивать новые данные для обновленных свойств
  componentDidUpdate(prevProps) {
    // когда App получает id выбранного персонажа из компонента ItemList, он будет обновлять свойство persomId
    // компонента PersonDetails.
    // componentDidUpdate сработает когда persomId будет обновлен (изменится)
    // без проверки будет циклично обновляться (т.к. setState приводит к componentDidUpdate). Если будет затронут
    // setState, обязательно условие проверки какое свойство изменилось.
    if (this.props.personId !== prevProps.personId) {
      this.onLoading();
      this.updatePerson();
    }
  }

  updatePerson() {
    const {personId} = this.props;

    // если нет id (null) не обновлять (т.к. не чего обновлять)
    if (!personId) {
      return;
    }

    this.swapiService
        .getPerson(personId)
        .then(this.onPersonLoaded);
    // TODO catch error как в RandomPlanet

  }

  render() {

    // const {id, name, gender, birthYear, eyeColor} = this.state.person;
    const {person, loading} = this.state;

    // if (!this.state.person) {
    //   return <span>Select a person from a list</span>;
    // }

    // if (!this.state.person) {
    //   return <Spinner/>
    // }

    // есть данные тогда, когда нет ни загрузи ни ошибки
    // (loading || error) вернет false когда оба false
    const hasData = !(loading);

    // null в jsx игнорируется
    const spinner = loading ? <Spinner/> : null;
    const content = hasData ? <PersontView person={person}/> : null;


    return (
        <div className="person-details card">
          {spinner}
          {content}
        </div>
    );
  }
}

// компонент занимается отрисовкой
const PersontView = ({person}) => {

  const {id, name, gender, birthYear, eyeColor} = person;

  return (
      <React.Fragment>
        <img className="person-image"
             src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt="person"/>
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </React.Fragment>
  );
};
