import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import PeoplePage from "../people-page";
import ErrorIndicator from '../error-indicator';
import ItemList from "../item-list";
import ItemDetails, {Record} from "../item-details/item-details";
import Row from "../row";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";

import './app.css';
import {
  PersonList,
  PlanetList,
  StarshipList,
  PersonDetails,
  PlanetDetails,
  StarshipDetails
} from "../sw-components";

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };


  render() {

    const planet = this.state.showRandomPlanet ?
        <RandomPlanet/> :
        null;

    const {
      getPerson,
      getStarship,
      getPersonImage,
      getStarshipImage,
      getAllPeople,
      getAllPlanets
    } = this.swapiService;

    const personDetails = (
        <ItemDetails
            itemId={1}
            getData={getPerson}
            getImageUrl={getPersonImage}>

          <Record field="gender" label="Gender"/>
          <Record field="birthYear" label="Birth Year"/>
          <Record field="eyeColor" label="Eye Color"/>

        </ItemDetails>
    );

    const starshipDetails = (
        <ItemDetails
            itemId={5}
            getData={getStarship}
            getImageUrl={getStarshipImage}>

          <Record field="model" label="Model"/>
          <Record field="manufacturer" label="Manufacturer"/>
          <Record field="costInCredits" label="Cost"/>
          <Record field="length" label="length"/>
          <Record field="crew" label="Crew"/>
          <Record field="passengers" label="Passengers"/>
          <Record field="cargoCapacity" label="Capacity"/>

        </ItemDetails>
    );


    return (
        <ErrorBoundry>
          <div className="stardb-app">
            <Header/>
            {/*{planet}*/}
            {/*<RandomPlanet/>*/}

            {/*<div className="row mb2 button-row">*/}
            {/*  <button className="toggle-planet btn btn-warning btn-lg"*/}
            {/*          onClick={this.toggleRandomPlanet}>*/}
            {/*    Toggle Random Planet*/}
            {/*  </button>*/}
            {/*  <ErrorButton/>*/}
            {/*</div>*/}

            {/*<PeoplePage/>*/}
            {/*<PeoplePage/>*/}
            {/*<PeoplePage/>*/}

            {/*========================*/}

            <PersonDetails itemId={1}/>

            <PlanetDetails itemId={2}/>

            <StarshipDetails itemId={5}/>


            <PersonList>
              {({name}) => <span>{name}</span>}
            </PersonList>

            <StarshipList>
              {({name}) => <span>{name}</span>}
            </StarshipList>

            <PlanetList>
              {({name}) => <span>{name}</span>}
            </PlanetList>
            {/*<ItemList*/}
            {/*    getData={getAllPlanets}*/}
            {/*    onItemSelected={() => {}}>*/}

            {/*  { ({name}) => <span>{name}</span> }*/}
            {/*</ItemList>*/}
            {/*========================*/}
            {/*<div className="row mb2">*/}
            {/*  <div className="col-md-6">*/}
            {/*    <ItemList*/}
            {/*        onItemSelected={this.onPersonSelected}*/}
            {/*        getData={this.swapiService.getAllPlanets}*/}
            {/*        // renderItem={(item) => item.name}/>*/}
            {/*        // можно передавать строки и реакт элементы*/}
            {/*        renderItem={(item) => (*/}
            {/*            <span>{item.name} <button>!</button></span>*/}
            {/*        )}/>*/}
            {/*  </div>*/}
            {/*  <div className="col-md-6">*/}
            {/*    <PersonDetails personId={this.state.selectedPerson}/>*/}
            {/*  </div>*/}
            {/*</div>*/}

            {/*<div className="row mb2">*/}
            {/*  <div className="col-md-6">*/}
            {/*    <ItemList*/}
            {/*        onItemSelected={this.onPersonSelected}*/}
            {/*        getData={this.swapiService.getAllStarships}*/}
            {/*        renderItem={(item) => item.name}/>*/}
            {/*  </div>*/}
            {/*  <div className="col-md-6">*/}
            {/*    <PersonDetails personId={this.state.selectedPerson}/>*/}
            {/*  </div>*/}
            {/*</div>*/}

            {/*<Row*/}
            {/*    left={personDetails}*/}
            {/*    right={starshipDetails}/>*/}

          </div>
        </ErrorBoundry>
    );
  }
}

