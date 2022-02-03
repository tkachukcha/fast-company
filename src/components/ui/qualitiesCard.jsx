import React from 'react';
import PropTypes from 'prop-types';
import Card from '../common/card';
import Qualities from './qualities';

const QualitiesCard = ({ qualities }) => {
  return (
    <Card bodyClasses="d-flex flex-column justify-content-center text-center">
      <h5 className="card-title">
        <span>Qualities</span>
      </h5>
      <p className="card-text">
        <Qualities qualities={qualities} />
      </p>
    </Card>
  );
};
QualitiesCard.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualitiesCard;
