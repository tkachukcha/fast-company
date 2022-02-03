import React from 'react';
import PropTypes from 'prop-types';
import Card from '../common/card';

const MeetingsCard = ({ meetingsNum }) => {
  return (
    <Card bodyClasses="d-flex flex-column justify-content-center text-center">
      <h5 className="card-title">
        <span>Completed meetings</span>
      </h5>
      <h1 className="display-1">{meetingsNum}</h1>
    </Card>
  );
};
MeetingsCard.propTypes = {
  meetingsNum: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default MeetingsCard;
