import React, {Component} from 'react';

import Spinner from '../spinner';
import ErrorButton from '../error-button/error-button';
import './item-details.css';

const Record = ({item, field, label}) => {
  return (
      <li className="list-group-item">
        <span className="term">{label}</span>
        <span>{item[field]}</span>
      </li>
  );
};

export {
  Record
};

export default class ItemDetails extends Component {

  state = {
    item: null,
    image: null,
    // item: {},
    loading: true
  };

  componentDidMount() {
    this.updateItem();
  }

  onItemLoaded = (item) => {
    const {getImageUrl} = this.props;

    this.setState({
      item,
      image: getImageUrl(item),
      loading: false
    });
  };

  onLoading() {
    this.setState({
      loading: true
    });
  };

  // срабатывает после того как компонент обновился и отрендерился (получил новые свойства или state (вызвал setState)).
  // Вызывается после
  // render(). В
  // нем хорошо запрашивать новые данные для обновленных свойств
  componentDidUpdate(prevProps) {
    // когда App получает id выбранного персонажа из компонента ItemList, он будет обновлять свойство persomId
    // компонента ItemDetails.
    // componentDidUpdate сработает когда persomId будет обновлен (изменится)
    // без проверки будет циклично обновляться (т.к. setState приводит к componentDidUpdate). Если будет затронут
    // setState, обязательно условие проверки какое свойство изменилось.
    if (this.props.itemId !== prevProps.itemId) {
      this.onLoading();
      this.updateItem();
    }
  }

  updateItem() {
    const {itemId, getData} = this.props;

    // если нет id (null) не обновлять (т.к. не чего обновлять)
    if (!itemId) {
      return;
    }

    getData(itemId)
        .then(this.onItemLoaded);
    // TODO catch error как в RandomPlanet

  }

  render() {
    // const {id, name, gender, birthYear, eyeColor} = this.state.item;
    const {item, image, loading} = this.state;
    const {children} = this.props;

    // if (!this.state.item) {
    //   return <span>Select a item from a list</span>;
    // }

    // if (!this.state.item) {
    //   return <Spinner/>
    // }

    // есть данные тогда, когда нет ни загрузи ни ошибки
    // (loading || error) вернет false когда оба false
    const hasData = !(loading);

    // null в jsx игнорируется
    const spinner = loading ? <Spinner/> : null;
    const content = hasData ? <ItemtView item={item} image={image} children={children}/> : null;


    return (
        <div className="item-details card">
          {spinner}
          {content}
        </div>
    );
  }
}

// компонент занимается отрисовкой
const ItemtView = ({item, image, children}) => {

  const {name} = item;

  return (
      <React.Fragment>
        <img className="item-image"
             src={image}
             alt="item"/>
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              // проходимся по всем child
              React.Children.map(children, (child) => {
                // заменяем chil на его копию (react элементы нельзя изменять, они immutable)
                // передаем копии элемента child свойство item
                return React.cloneElement(child, {item});
              })
            }
          </ul>
          <ErrorButton/>
        </div>
      </React.Fragment>
  );
};
