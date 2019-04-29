import React from 'react';
import { Redirect } from 'react-router-dom';

const SecretPage = ({ isLoggedIn }) => {

  if (isLoggedIn) {
    return (
        <div className="jumbotron text-center">
          <h3>This page is full of secrets!!!</h3>
        </div>
    );
  }

  return <Redirect to="/login" />;
  // return <p>You should not see this!!!!</p>;

};

export default SecretPage;