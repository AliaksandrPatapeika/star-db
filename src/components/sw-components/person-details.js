import React from 'react';
import ItemDetails, {Record} from "../item-details/item-details";
import {withSwapiService} from '../hoc-helpers';

const PersonDetails = (props) => {
  return (
      <ItemDetails {...props}>
        <Record field="gender" label="Gender"/>
        <Record field="birthYear" label="Birth Year"/>
        <Record field="eyeColor" label="Eye Color"/>
      </ItemDetails>
  );

};

// функция берет swapiService и назначает его методы свойствам компонента
const mapMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getPerson,
    getImageUrl: swapiService.getPersonImage
  };
};

// перед экспортом обернули в доп компонент высшего порядка, для предоставления в props swapiService
export default withSwapiService(mapMethodsToProps)(PersonDetails);