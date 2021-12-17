import React from "react";

const Qualities = (props) => {
  const {qualities} = props;
  const badgeClass = 'badge m-1 bg-'
  return qualities.map((quality, id) => (
    <span key={id} className={badgeClass + quality.color}>
      {quality.name}
    </span>
  ));
};

export default Qualities;
