// код который работает с сетью лучше изолировать в отдельный класс-сервис. Компоненты не должны знать откуда
// беруться данные
export default class SwapiService {
  // соглашение что это приватное поле класса и его не следует использовать или изменять снаружи
  _apiBase = 'https://swapi.co/api';
  _imageBase = 'https://starwars-visualguide.com/assets/img';

  // async - асинхронная функция, принимает url того что мы хотим получить
  getResource = async (url) => {
    // await - ждем пока результат промиса не будет доступен.
    // fetch(url) и res.json() вернут Promise
    // передается тот кусок url который идет за _apiBase
    const res = await fetch(`${this._apiBase}${url}`);

    // если код ответа не 2хх
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    return await res.json();
  };

  // делаем функцию асинхронной и стрелочнрой (чтобы функция помнила свой this и не теряла)
  getAllPeople = async () => {
    // ждем пока не будет готов результат от getResource
    const res = await this.getResource(`/people/`);
    // возвращаем массив персонажей
    return res.results.map(this._transformPerson);
  };

  getPerson = async (id) => {
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPerson(person);
  };

  getAllPlanets = async () => {
    // ждем пока не будет готов результат от getResource
    const res = await this.getResource(`/planets/`);
    // возвращаем массив персонажей
    // return res.results;
    return res.results.map(this._transformPlanet);
  };

  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  };

  getAllStarships = async () => {
    // ждем пока не будет готов результат от getResource
    const res = await this.getResource(`/starships/`);
    // возвращаем массив персонажей
    return res.results.map(this._transformStarship);
  };

  getStarship = async (id) => {
    const starship = await this.getResource(`/starships/${id}/`);
    return this._transformStarship(starship);
  };

  getPersonImage = ({id}) => {
    return `${this._imageBase}/characters/${id}.jpg`;
  };

  getStarshipImage = ({id}) => {
    return `${this._imageBase}/starships/${id}.jpg`;
  };

  getPlanetImage = ({id}) => {
    return `${this._imageBase}/planets/${id}.jpg`;
  };

  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)\/$/;
    // 0 группа - весь regexp, 1 - то что выделили в скобки
    return item.url.match(idRegExp)[1];
  };

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
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity
    };
  };

  _transformPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
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
