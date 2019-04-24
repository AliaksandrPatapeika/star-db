// код который работает с сетью лучше изолировать в отдельный класс-сервис. Компоненты не должны знать откуда
// беруться данные
export default class SwapiService {
  // соглашение что это приватное поле класса и его не следует использовать или изменять снаружи
  _apiBase = 'https://swapi.co/api';

  // async - асинхронная функция, принимает url того что мы хотим получить
  async getResource(url) {
    // await - ждем пока результат промиса не будет доступен.
    // fetch(url) и res.json() вернут Promise
    // передается тот кусок url который идет за _apiBase
    const res = await fetch(`${this._apiBase}${url}`);

    // если код ответа не 2хх
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    return await res.json();
  }

  // делаем функцию асинхронной
  async getAllPeople() {
    // ждем пока не будет готов результат от getResource
    const res = await this.getResource(`/people/`);
    // возвращаем массив персонажей
    return res.results.map(this._transformPerson);
  }

  async getPerson(id) {
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPerson(person);
  }

  async getAllPlanets() {
    // ждем пока не будет готов результат от getResource
    const res = await this.getResource(`/planets/`);
    // возвращаем массив персонажей
    // return res.results;
    return res.results.map(this._transformPlanet);
  }

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  }

  async getAllStarships() {
    // ждем пока не будет готов результат от getResource
    const res = await this.getResource(`/starships/`);
    // возвращаем массив персонажей
    return res.results.map(this._transformStarship);
  }

  async getStarship(id) {
    const starship = await this.getResource(`/starships/${id}/`);
    return this._transformStarship(starship);
  }

  _extractId(item) {
    const idRegExp = /\/([0-9]*)\/$/;
    // 0 группа - весь regexp, 1 - то что выделили в скобки
    return item.url.match(idRegExp)[1];
  }

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    };
  };

  _transformStarship = (starship) => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity
    };
  };

  _transformPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor
    };
  };

}

// const swapi = new SwapiService();

// swapi.getPerson(3).then((p) => {
//     console.log(p.name);
// });

// getResourse('https://swapi.co/api/people/1/')
//     .then((body) => {
//       console.log(body);
//     })
//     .catch((err) => {
//       console.error('Could not fetch', err);
//     });

// эквивалентный код:
// fetch('https://swapi.co/api/people/1/')
//     .then((res) => {
//       return res.json();
//     })
//     .then((body) => {
//       console.log(body);
//     });
