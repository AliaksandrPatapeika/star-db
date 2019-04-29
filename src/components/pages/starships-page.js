import React from 'react';
import {StarshipList} from "../sw-components";
import {withRouter} from 'react-router-dom';

const StarshipsPage = ({history}) => {
  return (
      // пересылаем пользователя на страницу /starships/${itemId} (абсолютный путь), history.push(id) -
      // относительный путь
      <StarshipList onItemSelected={(id) => history.push(id)}/>
  );
};

// withRouter - компонент высшего порядка, для того чтоб StarshipsPage получил свойства match, location и history
export default withRouter(StarshipsPage);