import React from 'react';

import './item-list.css';

// Часть отвечает за отрисовку
const ItemList = (props) => {

  const {data, onItemSelected, children: renderLabel} = props;

  const items = data.map((item) => {
    const {id} = item;
    // this.props.children - обращение к тому что передали в теле
    // const label = this.props.renderItem(item);
    const label = renderLabel(item);

    return (
        <li className="list-group-item"
            key={id}
            onClick={() => onItemSelected(id)}>
          {label}
        </li>
    );
  });

  return (
      <ul className="item-list list-group">
        {items}
      </ul>
  );

};

export default ItemList;
