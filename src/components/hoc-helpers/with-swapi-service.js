import React from 'react';
import {SwapiServiceConsumer} from '../swapi-service-context';

// содаем компонент высшего порядка
// const withSwapiService = (Wrapped, mapMethodsToProps) => {
  const withSwapiService = (mapMethodsToProps) => (Wrapped) => {
// возвращает компонент-функцию
  return (props) => {
    return (
        <SwapiServiceConsumer>
          {
            (swapiService) => {
              const serviceProps = mapMethodsToProps(swapiService);
              return (
                  <Wrapped
                      {...props}
                      {...serviceProps}/>
              );
            }
          }
        </SwapiServiceConsumer>
    );
  };

};

export default withSwapiService;