import React from 'react';

// функция компонент высшего порядка
// она берет любой реакт компонент и устанавливает ему в качестве children заданную функцию
// const withChildFunction = (Wrapped, fn) => {
const withChildFunction = (fn) => (Wrapped) => {
  return (props) => {
    return (
        <Wrapped {...props}>
          {fn}
        </Wrapped>
    );
  };
};

export default withChildFunction;