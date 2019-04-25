import React, {Component} from 'react';

import ItemList from "../item-list";
import ItemDetails from "../item-details";
import ErrorBoundry from "../error-boundry";
import Row from '../row';
import SwapiService from "../../services/swapi-service";

import './people-page.css';

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    // selectedPerson: null
    // по умолчанию выбран персонаж с id = 1
    selectedPerson: 1
  };

  // сокращенно сделал onPersonSelected = (id) => selectedPerson: id
  onPersonSelected = (selectedPerson) => {
    this.setState({selectedPerson});
  };

  render() {

    const itemList = (
        <ItemList
            onItemSelected={this.onPersonSelected}
            // функция не вызывается а просто передается компоненту, чтоб компонент сам решал когда ее вызвать
            getData={this.swapiService.getAllPeople}>

          {/* перенес свойство renderItem в тело элемента'*/}
          {/* это функция которая описывает как будет выглядеть тело компонента достумна в ItemList через
           props.children. Можно передавать в тело любые типы данных*/}

          {(i) => (
              `${i.name} (${i.birthYear})`
          )}

        </ItemList>
    );

    const personDetails = (
        <ErrorBoundry>
          <ItemDetails itemId={this.state.selectedPerson}/>
        </ErrorBoundry>
    );

    return (
        <Row left={itemList}
             right={personDetails}/>
    );

    // <Row left='Foo'
    //      right='Bar'/>

    // <Row left={<p>Hello</p>}
    //      right={<span>World</span>}/>


    // <div className="row mb2">
    //   <div className="col-md-6">
    //     {itemList}
    //   </div>
    //   <div className="col-md-6">
    //     {personDetails}
    //   </div>
    // </div>
  }
}